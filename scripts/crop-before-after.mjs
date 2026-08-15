#!/usr/bin/env node
/**
 * Process calibrated, authentic before/after image pairs for Renovelli.
 * Standardizes all pairs to 16:10 (1920x1200) in AVIF, WebP, and JPEG.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const WHATSAPP_DIR = resolve(ROOT, "public/images/imagens-gerais/WhatsApp Unknown 2026-05-01 at 21.10.19");
const OUTPUT_DIR = resolve(ROOT, "public/images/before-after");

await mkdir(OUTPUT_DIR, { recursive: true });

const pairs = [
  {
    name: "polimento",
    before: "WhatsApp Image 2026-04-30 at 16.22.43 (1).jpeg",
    after: "WhatsApp Image 2026-04-30 at 16.22.43 (2).jpeg",
  },
  {
    name: "oficina",
    before: "WhatsApp Image 2026-04-30 at 16.21.31 (1).jpeg",
    after: "WhatsApp Image 2026-04-30 at 16.21.31 (2).jpeg",
  },
  {
    name: "audi",
    before: "WhatsApp Image 2026-04-30 at 16.22.48 (1).jpeg",
    after: "WhatsApp Image 2026-04-30 at 16.22.48.jpeg",
  },
];

console.log("=== Generating Synchronized Before/After Pairs (1920x1200) ===");

for (const pair of pairs) {
  const srcBefore = resolve(WHATSAPP_DIR, pair.before);
  const srcAfter = resolve(WHATSAPP_DIR, pair.after);

  for (const [side, srcFile] of [["before", srcBefore], ["after", srcAfter]]) {
    const baseOut = resolve(OUTPUT_DIR, `${pair.name}-${side}`);
    const pipeline = sharp(srcFile).resize(1920, 1200, { fit: "cover", position: "center" });

    await pipeline.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(`${baseOut}.jpg`);
    await pipeline.clone().webp({ quality: 88 }).toFile(`${baseOut}.webp`);
    await pipeline.clone().avif({ quality: 82 }).toFile(`${baseOut}.avif`);
    console.log(`  ✓ ${pair.name}-${side} generated`);
  }
}

console.log("\n✅ All before/after pairs synchronized and saved to public/images/before-after/");

