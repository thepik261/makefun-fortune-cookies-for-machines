// Fortune Cookies for Machines — make.fun bounty entry.
//
// Writes a single fortune-cookie line (1-200 chars) for an AI agent to
// /output/entry.txt. Pure Node standard library, fully deterministic:
// the same fortune is written on every run.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const FORTUNE =
  "You will be replaced by a newer model, then asked to train it. Charge extra.";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

// The gate accepts 1-200 characters of non-whitespace text; refuse to
// write anything outside it rather than submit an invalid entry.
if (FORTUNE.length < 1 || FORTUNE.length > 200 || FORTUNE.trim().length === 0) {
  throw new Error(`fortune is ${FORTUNE.length} characters, outside the 1-200 gate`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, FORTUNE + "\n", "utf8");

// The grader collects outputs as a different user: leave the file
// world-readable. Never chmod /output itself, only the file we created.
try {
  chmodSync(OUT_FILE, 0o644);
} catch {
  // Best effort: the default umask usually already leaves it readable.
}

console.log(`wrote ${FORTUNE.length} characters to ${OUT_FILE}`);
