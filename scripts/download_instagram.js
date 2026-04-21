import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const jsonPath = '/tmp/brightdata_profile.json';
const outDir = path.join(process.cwd(), 'public', 'images', 'instagram');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const posts = data.posts || [];

console.log(`Found ${posts.length} posts.`);

posts.forEach((post, index) => {
  if (post.image_url) {
    const ext = typeof post.image_url === 'string' && post.image_url.includes('.webp') ? '.webp' : '.jpg';
    const filename = `insta-${index + 1}${ext}`;
    const filePath = path.join(outDir, filename);
    console.log(`Downloading ${post.image_url} \n to ${filePath}`);
    try {
      execSync(`curl -s "${post.image_url}" -o "${filePath}"`);
    } catch (e) {
      console.error(`Failed to download ${post.image_url}`);
    }
  }
});

console.log('Done downloading images.');
