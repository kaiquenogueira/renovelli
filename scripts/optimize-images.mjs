import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "public", "images");

const TARGETS = [
  "before-after",
  "instagram-hd",
  "bg-video",
];

const WEBP_QUALITY = 82;
const AVIF_QUALITY = 55;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function convert(file) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const webp = `${base}.webp`;
  const avif = `${base}.avif`;

  const tasks = [];
  if (!existsSync(webp)) {
    tasks.push(
      sharp(file).webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(webp).then(() => webp)
    );
  }
  if (!existsSync(avif)) {
    tasks.push(
      sharp(file).avif({ quality: AVIF_QUALITY, effort: 5 }).toFile(avif).then(() => avif)
    );
  }
  if (tasks.length === 0) return null;
  return Promise.all(tasks);
}

async function bytes(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

async function run() {
  let totalIn = 0;
  let totalOut = 0;
  let count = 0;

  for (const sub of TARGETS) {
    const dir = path.join(ROOT, sub);
    if (!existsSync(dir)) continue;
    for await (const file of walk(dir)) {
      const inSize = await bytes(file);
      const written = await convert(file);
      if (!written) continue;

      let outSum = 0;
      for (const w of written) outSum += await bytes(w);

      totalIn += inSize;
      totalOut += outSum;
      count += 1;
      const rel = path.relative(ROOT, file);
      const saving = (1 - outSum / 2 / inSize) * 100;
      console.log(
        `  ${rel}  ${(inSize / 1024).toFixed(1)} KB  →  webp+avif  (avg saving ${saving.toFixed(0)}%)`
      );
    }
  }

  console.log("");
  console.log(`Done. ${count} images converted.`);
  console.log(`Original total: ${(totalIn / 1024).toFixed(1)} KB`);
  console.log(`WebP+AVIF total: ${(totalOut / 1024).toFixed(1)} KB`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
