"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/cn";

const SUGGESTIONS = [
  "What is HAAM?",
  "What does TWC help with?",
  "How will the grants workbench work?",
];

function messageText(message: { parts?: Array<{ type: string; text?: string }> }) {
  if (!message.parts) return "";
  return message.parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("");
}

export function MuseDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/muse" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  };

  const ask = (text: string) => {
    if (busy) return;
    sendMessage({ text });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed z-50 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-sheet transition hover:bg-night-50",
          open && "pointer-events-none opacity-0",
        )}
        style={{
          right: "max(1.25rem, env(safe-area-inset-right))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        Muse
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-ink/20 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="muse-title"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-ink/10 bg-paper shadow-sheet transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
              Assistant
            </p>
            <h2 id="muse-title" className="font-display text-2xl font-medium text-ink">
              Muse
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-ink/15 p-2 text-ink/70 transition hover:border-ink/40 hover:text-ink"
            aria-label="Close Muse"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.length === 0 ? (
            <div className="max-w-sm">
              <p className="font-display text-xl font-medium text-ink">
                Ask. I&apos;ll tell you what I know.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Grants, HAAM, TWC, or the other help that already exists. I
                won&apos;t invent a match. We do not write checks.
              </p>
              <div className="mt-6 flex flex-col items-start gap-2">
                {SUGGESTIONS.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => ask(text)}
                    className="rounded-full border border-ink/15 px-3 py-1.5 text-left text-sm text-ink/75 transition hover:border-ink/40 hover:text-ink"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => {
            const text = messageText(message);
            if (!text && message.role === "user") return null;
            const muse = message.role === "assistant";
            return (
              <div key={message.id} className={cn("max-w-[90%]", muse ? "mr-auto" : "ml-auto")}>
                <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
                  {muse ? "Muse" : "You"}
                </p>
                <p
                  className={cn(
                    "mt-1.5 whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed",
                    muse ? "bg-ink text-paper" : "bg-paper-100 text-ink",
                  )}
                >
                  {text || (busy && muse ? "…" : "")}
                </p>
              </div>
            );
          })}

          {busy && messages[messages.length - 1]?.role === "user" ? (
            <div className="max-w-[90%]">
              <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
                Muse
              </p>
              <p className="mt-1.5 bg-ink px-3.5 py-2.5 text-sm text-paper">…</p>
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-clay">
              Muse could not reach a model. Try again in a minute.
            </p>
          ) : null}

          <div ref={endRef} />
        </div>

        <form onSubmit={submit} className="border-t border-ink/10 px-4 py-4">
          <label htmlFor="muse-input" className="sr-only">
            Ask Muse
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="muse-input"
              rows={2}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Ask about grants, HAAM, TWC…"
              disabled={busy}
              className="min-h-[3rem] flex-1 resize-none bg-paper-50 px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-ink/10 placeholder:text-ink/40 focus:ring-ink/30 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-full bg-ink p-2.5 text-paper transition hover:bg-night-50 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
