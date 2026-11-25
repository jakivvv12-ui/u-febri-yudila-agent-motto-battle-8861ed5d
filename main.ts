import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MOTTO = "I finished your sentence, your function, and your weekend.";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }

  // Entry must be a single line, 1-200 characters, not only whitespace.
  // Trailing newline is added on write; the motto itself stays one line.
  if (MOTTO.length < 1 || MOTTO.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${MOTTO.length}`);
  }
  if (MOTTO.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (MOTTO.includes("\n") || MOTTO.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, MOTTO + "\n", "utf8");

  // Round-trip verification: what we wrote is what is on disk.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== MOTTO + "\n") {
    throw new Error("round-trip verification failed for entry.txt");
  }
}

main();
