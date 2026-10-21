import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, PREVIEW_COOKIE, verifyAdminCookie } from "@/lib/admin/auth";
import { parseModelList } from "@/lib/muse/models";
import { canWriteEdgeConfig, readLiveModels } from "@/lib/muse/store";
import { daysSinceVerified, isStale, programStatus } from "@/lib/programs/status";
import { canWritePrograms, readPrograms } from "@/lib/programs/store";
import { AdminChrome } from "./AdminChrome";
import { LoginForm } from "./LoginForm";
import { ModelsForm } from "./ModelsForm";
import { NotConfigured } from "./NotConfigured";
import { ProgramsPanel, type ProgramRow } from "./ProgramsPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Open Call ops",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return (
      <AdminChrome>
        <NotConfigured />
      </AdminChrome>
    );
  }

  const jar = cookies();
  const signedIn = await verifyAdminCookie(jar.get(ADMIN_COOKIE)?.value, secret);
  if (!signedIn) {
    return (
      <AdminChrome>
        <LoginForm error={searchParams.error === "1"} />
      </AdminChrome>
    );
  }

  const live = await readLiveModels();
  const preview = parseModelList(jar.get(PREVIEW_COOKIE)?.value);
  const { programs, source } = await readPrograms();
  const now = new Date();
  const rows: ProgramRow[] = programs.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind,
    url: p.url,
    status: programStatus(p, now),
    lastVerified: p.last_verified,
    daysAgo: daysSinceVerified(p, now),
    verifiedBy: p.verified_by,
    stale: isStale(p, now),
  }));

  return (
    <AdminChrome signedIn>
      <ModelsForm
        live={live}
        preview={preview}
        writable={canWriteEdgeConfig()}
      />
      <ProgramsPanel rows={rows} source={source} writable={canWritePrograms()} />
    </AdminChrome>
  );
}
