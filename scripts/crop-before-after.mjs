#!/usr/bin/env node
/**
 * Crop composite Instagram before/after images into separate halves.
 *
 * - pacote-completo.jpg  → left half (before) / right half (after)
 * - polimento-vitri-showcase.jpg → top half (before) / bottom half (after)
 *
 * Output is saved to public/images/before-after/ as optimized JPEGs.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const INPUT = resolve(ROOT, "public/images/instagram-hd");
const OUTPUT = resolve(ROOT, "public/images/before-after");

await mkdir(OUTPUT, { recursive: true });

// ── Helper ──────────────────────────────────────────────────────────
async function cropAndSave(inputFile, region, outputFile) {
  const input = resolve(INPUT, inputFile);
  const output = resolve(OUTPUT, outputFile);

  const meta = await sharp(input).metadata();
  console.log(`  ${inputFile}: ${meta.width}x${meta.height}`);

  const { left, top, width, height } = region(meta.width, meta.height);
  console.log(`  → crop(${left}, ${top}, ${width}, ${height}) → ${outputFile}`);

  await sharp(input)
    .extract({ left, top, width, height })
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output);

  console.log(`  ✓ ${outputFile} saved\n`);
}

// ── 1. pacote-completo.jpg — left/right split ───────────────────────
// The "ANTES" label and opaque paint section is on the LEFT
// The "DEPOIS" label and glossy paint section is on the RIGHT
// But there's text overlay — we'll crop the middle photo area
console.log("=== Pair 1: Polimento & Vitrificação (left/right split) ===");

const pacoteMeta = await sharp(resolve(INPUT, "pacote-completo.jpg")).metadata();
const pW = pacoteMeta.width;
const pH = pacoteMeta.height;

// The useful photo area is roughly the middle 55% vertically (skip title & bottom text)
// And split horizontally at ~50%
const photoTop = Math.round(pH * 0.22);     // skip the "POLIMENTO & VITRIFICAÇÃO" title
const photoBottom = Math.round(pH * 0.75);   // above the "RESULTADO PERFEITO" text
const photoHeight = photoBottom - photoTop;

await cropAndSave("pacote-completo.jpg",
  () => ({ left: 0, top: photoTop, width: Math.round(pW * 0.48), height: photoHeight }),
  "polimento-before.jpg"
);

await cropAndSave("pacote-completo.jpg",
  () => ({ left: Math.round(pW * 0.48), top: photoTop, width: pW - Math.round(pW * 0.48), height: photoHeight }),
  "polimento-after.jpg"
);

// ── 2. polimento-vitri-showcase.jpg (Audi A4) — top/bottom split ───
// The "ANTES" state is on BOTTOM (damaged paint, outdoors), "DEPOIS" on TOP (showroom)
// Note: labels say "PROTEÇÃO DE PINTURA" on top, "ANTES/DEPOIS" on right
// TOP = after (showroom with protection), BOTTOM = before (outdoor, stains)
console.log("=== Pair 2: Audi A4 Proteção de Pintura (top/bottom split) ===");

const audiMeta = await sharp(resolve(INPUT, "polimento-vitri-showcase.jpg")).metadata();
const aW = audiMeta.width;
const aH = audiMeta.height;

await cropAndSave("polimento-vitri-showcase.jpg",
  () => ({ left: 0, top: Math.round(aH * 0.52), width: aW, height: Math.round(aH * 0.48) }),
  "audi-before.jpg"
);

await cropAndSave("polimento-vitri-showcase.jpg",
  () => ({ left: 0, top: 0, width: aW, height: Math.round(aH * 0.50) }),
  "audi-after.jpg"
);

// ── 3. Use antes-depois-carousel.jpg (HR-V) as a "before" and 
//    cliente-satisfeito-2.jpg (Cruze polished) as "after" ─────────
// These are individual photos, not composites — just copy/optimize them
console.log("=== Pair 3: Real workshop photos (individual shots) ===");

await sharp(resolve(INPUT, "antes-depois-carousel.jpg"))
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(resolve(OUTPUT, "oficina-before.jpg"));
console.log("  ✓ oficina-before.jpg saved");

await sharp(resolve(INPUT, "cliente-satisfeito-2.jpg"))
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(resolve(OUTPUT, "oficina-after.jpg"));
console.log("  ✓ oficina-after.jpg saved");

console.log("\n✅ All pairs cropped and saved to public/images/before-after/");
