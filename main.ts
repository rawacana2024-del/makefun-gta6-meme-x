// makefun-gta6-meme-x — entry program for make.fun's gta6-meme-x-01 bounty.
// Runs on Node 22 with the standard library only: no installs, no network.
//
// The entry itself is the post on X (the GTA 6 "WASTED" meme in meme.png,
// posted from @rawacana2024). This program's only job is to hand the house
// the post's address: it copies POST.json from the repository root into the
// output directory, where the gate reads it. Nothing this program writes
// about the post is judged — the house reads the post itself from X.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';

const source = join(BOT_DIR, POST_FILE);

// Fail loudly instead of copying a broken address: the gate refuses a
// POST.json it cannot read, so a bad file must never reach /output.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('POST.json must be a JSON object with a string "url" field.');
  process.exit(1);
}
const postUrl = (parsed as { url: string }).url;
// The gate only accepts an X post address, so catch a wrong-shaped url
// here instead of shipping it: x.com or twitter.com, /status/<digits>.
// The starter's placeholder (https://x.com/<handle>/status/<id>) is also
// accepted so the program still runs before the real post exists.
if (!/^https?:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/.*\/status\/(\d+|<id>)/.test(postUrl)) {
  console.error('POST.json "url" must be an X post address like https://x.com/<handle>/status/<id>.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, join(OUTPUT_DIR, POST_FILE));
} catch (err) {
  console.error(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
