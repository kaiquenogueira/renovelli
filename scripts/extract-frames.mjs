import { spawnSync } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Extracts a JPG frame sequence from the cinematic background video.
 *
 * iOS Safari can't smooth-seek an inline <video> by `currentTime`, so the
 * mobile background scrubs a pre-decoded frame sequence on a <canvas>
 * instead. These frames are *generated* assets committed under
 * `public/images/` — allowed by AGENTS.md §Security because the landing
 * page's mobile path requires them. Regenerate only when `hero.mp4`
 * changes:  `npm run extract:frames -- --force`
 *
 * Math: hero.mp4 is 56.000s. Sampling at 30/7 fps gives exactly
 * 56 * 30/7 = 240 frames. `-frames:v` clamps any rounding to 240.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "public", "images", "bg-video", "hero.mp4");
const FRAMES_DIR = path.join(ROOT, "public", "images", "bg-video", "frames");

const FRAME_COUNT = 240;
const FPS = "30/7"; // 56s * 30/7 = 240 frames
const LAST_FRAME = path.join(FRAMES_DIR, "frame-0240.jpg");

function resolveFfmpeg() {
  const homebrew = "/opt/homebrew/bin/ffmpeg";
  return existsSync(homebrew) ? homebrew : "ffmpeg";
}

async function dirBytes(dir) {
  let total = 0;
  for (const name of await readdir(dir)) {
    if (!name.endsWith(".jpg")) continue;
    total += (await stat(path.join(dir, name))).size;
  }
  return total;
}

async function run() {
  const force = process.argv.includes("--force");

  if (!existsSync(SOURCE)) {
    console.error(`Source video not found: ${SOURCE}`);
    process.exit(1);
  }

  if (existsSync(LAST_FRAME) && !force) {
    console.log("Frames already extracted — skipping (pass --force to regenerate).");
    return;
  }

  await mkdir(FRAMES_DIR, { recursive: true });

  const ffmpeg = resolveFfmpeg();
  const args = [
    "-y",
    "-i", SOURCE,
    "-vf", `fps=${FPS}`,
    "-q:v", "3",
    "-pix_fmt", "yuvj420p",
    "-frames:v", String(FRAME_COUNT),
    path.join(FRAMES_DIR, "frame-%04d.jpg"),
  ];

  console.log(`Extracting ${FRAME_COUNT} frames with ${ffmpeg}...`);
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });

  if (result.error || result.status !== 0) {
    console.error("ffmpeg failed.", result.error ?? `exit ${result.status}`);
    process.exit(1);
  }

  const written = (await readdir(FRAMES_DIR)).filter((n) => n.endsWith(".jpg")).length;
  const total = await dirBytes(FRAMES_DIR);
  console.log("");
  console.log(`Done. ${written} frames written.`);
  console.log(`Total size: ${(total / 1024 / 1024).toFixed(1)} MB`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
