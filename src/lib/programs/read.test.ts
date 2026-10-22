import assert from "node:assert/strict";
import test from "node:test";
import seed from "@/data/programs.json" with { type: "json" };
import { whoLine, renderProgram } from "./prompt";
import { isStale, programStatus, STALE_AFTER_DAYS } from "./status";
import { contentRangeTotal, PROGRAMS_FETCH_TIMEOUT_MS, readPrograms } from "./store";
import type { Program } from "./types";

const seedIds = (seed as Program[]).map((p) => p.id);

const oneRow = {
  id: "haam",
  name: "HAAM",
  kind: "health",
  summary: "Health care help",
  who: ["Working musician"],
  rolling: true,
  url: "https://www.myhaam.org/join-haam",
  region: "Austin",
  last_verified: "2026-08-15",
  verified_by: "starter list",
};

function jsonResponse(body: unknown, status = 200, contentRange?: string): Response {
  const headers = new Headers();
  if (contentRange) headers.set("content-range", contentRange);
  return new Response(JSON.stringify(body), { status, headers });
}

function withFetch(
  impl: (url: string, init?: RequestInit) => Promise<Response> | Response,
  run: () => Promise<void>,
): Promise<void> {
  const previous = globalThis.fetch;
  globalThis.fetch = impl as typeof fetch;
  process.env.SUPABASE_URL = "https://programs.example.test";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "eyJ.test-service-role";
  process.env.SUPABASE_SECRET_KEY = "sb_secret_test";
  return run().finally(() => {
    globalThis.fetch = previous;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_SECRET_KEY;
  });
}

test("content-range total is the number after the slash", () => {
  assert.equal(contentRangeTotal("0-8/9"), 9);
  assert.equal(contentRangeTotal("0-0/1"), 1);
  assert.equal(contentRangeTotal("0-8/*"), null);
  assert.equal(contentRangeTotal(null), null);
});

test("a one-row 200 with no larger total is the catalog", async () => {
  await withFetch(
    async (_url, init) => {
      assert.ok(init?.signal instanceof AbortSignal);
      assert.equal(init.signal.aborted, false);
      const headers = new Headers(init.headers);
      assert.equal(headers.get("prefer"), "count=exact");
      assert.equal(headers.get("apikey"), "eyJ.test-service-role");
      return jsonResponse([oneRow]);
    },
    async () => {
      const { programs, source } = await readPrograms();
      assert.equal(source, "supabase");
      assert.deepEqual(programs.map((p) => p.id), ["haam"]);
      for (const id of seedIds) {
        if (id !== "haam") assert.equal(programs.some((p) => p.id === id), false);
      }
    },
  );
});

test("a one-row page of a larger table is not the catalog", async () => {
  await withFetch(
    async () => jsonResponse([oneRow], 200, "0-0/9"),
    async () => {
      const { programs, source } = await readPrograms();
      assert.equal(source, "seed");
      assert.deepEqual(programs.map((p) => p.id).sort(), [...seedIds].sort());
    },
  );
});

test("a complete page is the catalog", async () => {
  const rows = (seed as Program[]).map((p) => ({ ...p }));
  await withFetch(
    async () => jsonResponse(rows, 200, `0-${rows.length - 1}/${rows.length}`),
    async () => {
      const { programs, source } = await readPrograms();
      assert.equal(source, "supabase");
      assert.equal(programs.length, 9);
    },
  );
});

test("a programs fetch that throws still serves the starter list", async () => {
  let calls = 0;
  await withFetch(
    async () => {
      calls += 1;
      throw new Error("aborted");
    },
    async () => {
      const { programs, source } = await readPrograms();
      assert.equal(calls, 1);
      assert.equal(source, "seed");
      assert.equal(programs.length, seedIds.length);
    },
  );
});

test("programs fetch timeout is under the function maxDuration", () => {
  assert.equal(PROGRAMS_FETCH_TIMEOUT_MS, 10_000);
  assert.ok(PROGRAMS_FETCH_TIMEOUT_MS < 60_000);
});

test("a failing service-role key is not retried as the secret key", async () => {
  let calls = 0;
  await withFetch(
    async () => {
      calls += 1;
      return jsonResponse({ message: "Invalid API key" }, 401);
    },
    async () => {
      const { source } = await readPrograms();
      assert.equal(calls, 1);
      assert.equal(source, "seed");
    },
  );
});

test("a bad who value does not throw", () => {
  const base = { ...(seed as Program[])[0] };
  assert.doesNotThrow(() => renderProgram({ ...base, who: "Working musician" as unknown as string[] }));
  assert.match(whoLine("Working musician"), /Working musician/);
  assert.equal(whoLine({ bad: true }), "");
  assert.equal(whoLine(null), "");
  assert.doesNotThrow(() => renderProgram({ ...base, who: null as unknown as string[] }));
});

test("a bad closes value does not look open", () => {
  const now = new Date("2026-10-22T15:00:00Z");
  const base = (seed as Program[]).find((p) => p.id === "acme-nexus") as Program;
  assert.equal(programStatus({ ...base, closes: "not-a-date", rolling: false }, now), "unknown");
  assert.equal(programStatus({ ...base, closes: "not-a-date", rolling: true }, now), "rolling");
  assert.equal(
    programStatus({ ...base, closes: "2026-12-01T00:00:00-06:00", rolling: false }, now),
    "open",
  );
  const closed = programStatus(
    { ...base, closes: "2026-08-18T18:59:00-05:00", rolling: false },
    now,
  );
  assert.equal(closed, "closed");
  const text = renderProgram({ ...base, closes: "not-a-date", rolling: false }, now);
  assert.equal(text.includes("open now"), false);
  assert.match(text, /dates not on file/);
});

test("the 90-day stale flag is unchanged", () => {
  const verified = "2026-08-15";
  const row = { last_verified: verified } as Program;
  assert.equal(STALE_AFTER_DAYS, 90);
  assert.equal(isStale(row, new Date("2026-11-13T23:59:59Z")), false);
  assert.equal(isStale(row, new Date("2026-11-14T00:00:00Z")), true);
});
