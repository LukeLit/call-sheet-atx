export const MUSE_OPEN_EVENT = "opencall:muse";

export function openMuse(prompt?: string) {
  window.dispatchEvent(new CustomEvent(MUSE_OPEN_EVENT, { detail: { prompt } }));
}
