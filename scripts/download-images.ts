import fs from 'fs';
import path from 'path';

const urls = {
    'seq-1.jpg': 'https://image.pollinations.ai/prompt/abandoned_rusty_old_vintage_car_in_dark_garage_cinematic_hyperrealistic_photography?width=1600&height=900&nologo=true&seed=150',
    'seq-2.jpg': 'https://image.pollinations.ai/prompt/dynamic_splash_of_bright_orange_paint_thrown_onto_an_old_car_high_speed_photography_cinematic?width=1600&height=900&nologo=true&seed=150',
    'seq-3.jpg': 'https://image.pollinations.ai/prompt/car_half_covered_in_wet_glossy_orange_paint_during_restoration_process_in_high_tech_garage_hyperrealistic?width=1600&height=900&nologo=true&seed=150',
    'seq-4.jpg': 'https://image.pollinations.ai/prompt/perfect_flawless_glossy_orange_sports_car_mirror_shine_ceramic_coating_studio_lighting_hyperrealistic?width=1600&height=900&nologo=true&seed=150',
    'before.jpg': 'https://image.pollinations.ai/prompt/dirty_faded_red_ferrari_sports_car_with_scratches_and_grime_cinematic_hyperrealistic?width=1200&height=800&nologo=true&seed=99',
    'after.jpg': 'https://image.pollinations.ai/prompt/perfect_flawless_red_ferrari_sports_car_mirror_shine_ceramic_coating_studio_lighting_hyperrealistic?width=1200&height=800&nologo=true&seed=99'
};

async function main() {
    const dir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    for (const [filename, url] of Object.entries(urls)) {
        console.log(`Downloading ${filename}...`);
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const arrayBuffer = await res.arrayBuffer();
            fs.writeFileSync(path.join(dir, filename), Buffer.from(arrayBuffer));
            console.log(`Successfully saved ${filename}`);
        } catch (error) {
            console.error(`Failed to download ${filename}:`, error);
        }
    }
}

main();
