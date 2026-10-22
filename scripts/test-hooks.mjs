import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Lets `node --test` load this repo's TypeScript: `@/` and extensionless relative imports.
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    return nextResolve(new URL(`../src/${specifier.slice(2)}`, import.meta.url).href, context);
  }
  if (specifier.startsWith(".") && !specifier.endsWith(".ts") && !specifier.endsWith(".json") && !specifier.endsWith(".mjs")) {
    try {
      const resolved = await nextResolve(specifier, context);
      return resolved;
    } catch {
      const base = new URL(specifier, context.parentURL);
      const asTs = new URL(`${base.href}.ts`);
      if (existsSync(fileURLToPath(asTs))) return nextResolve(asTs.href, context);
      throw new Error(`Cannot resolve ${specifier} from ${context.parentURL}`);
    }
  }
  return nextResolve(specifier, context);
}
