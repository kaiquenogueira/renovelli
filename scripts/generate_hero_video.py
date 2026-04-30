"""
Veo 3 hero video generator for Renovelli.

Gera 7 vídeos sequenciais (~56s total) que acompanham o scroll completo da
landing page redesenhada em 4 capítulos (Chegada · Ofício · Resultado · Sua Vez).

Conceito: "Túnel de Luz"
A assinatura visual brasileira da detalhadora premium é o teto de LED
hexagonal que reflete na pintura recém-vitrificada. O vídeo é uma única
travessia contínua: entramos do escuro, atravessamos o túnel hexagonal
de luz dançando no verniz, passamos por reflexos macro de polidor /
gota / aro, e saímos para o reveal silencioso do veículo entregue.

- Clip 1 (Chegada):     escuridão → primeiro hexágono LED se acende
- Clip 2 (Aproximação): túnel hex se forma, reflete em pintura escura
- Clip 3 (Ofício):      polidor gira, padrão hex distorce no verniz molhado
- Clip 4 (Detalhe):     gota d'água refrata o hex em hidrofobia perfeita
- Clip 5 (Roda):        aro espelhado, hex orbitando ao redor
- Clip 6 (Mão):         pano de microfibra revela superfície + hex dança
- Clip 7 (Entrega):     pull-back lento revelando carro inteiro no túnel

Output: public/images/bg-video/hero.mp4

Usage:
    python scripts/generate_hero_video.py              # gera os 7 clips e mescla
    python scripts/generate_hero_video.py --clip 3     # regenera 1 clip
    python scripts/generate_hero_video.py --no-chain   # sem chaining de primeiro frame
    python scripts/generate_hero_video.py --concat     # só roda post-process ffmpeg
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types

REPO_ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = REPO_ROOT / ".env"
OUTPUT_DIR = REPO_ROOT / "public" / "images" / "bg-video"
WORK_DIR = Path(__file__).resolve().parent / "work"

# Load env BEFORE module-level os.environ reads below.
load_dotenv(ENV_FILE)

# Usa o que estiver no .env, se não houver cai para defaults
MODEL = os.environ.get("VEO_MODEL", "veo-3.1-generate-001")
PROJECT = os.environ.get("VEO_PROJECT", "plata-494423")
LOCATION = os.environ.get("VEO_LOCATION", "us-central1")

# Backend selection:
#   - "vertex" (default): uses gcloud Application Default Credentials + PROJECT/LOCATION.
#   - "api_key": uses GOOGLE_GENERATIVE_AI_API_KEY (AI Studio). Some Veo models are
#     not available on AI Studio — if so, switch back to vertex and run gcloud auth.
BACKEND = os.environ.get("VEO_BACKEND", "vertex").lower()
API_KEY = os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY") or os.environ.get("GOOGLE_API_KEY")

NEGATIVE_PROMPT = (
    "blurry, low quality, jump cuts, fast motion, zoom-ins, shaky camera, handheld, "
    "text overlays, captions, watermarks, subtitles, brand logos, automaker emblems, "
    "license plates readable, mechanic faces, real people faces, crowds, "
    "sudden cuts, sudden lighting changes, completely flat lighting, totally black frame, "
    "underexposed, oversaturated, neon pink, neon green, "
    "warm orange light, golden hour, sunset, magic hour, sunrise, daylight, sunlight, "
    "outdoor scene, street, parking lot, garish colors, candy colors, "
    "anime, cartoon, illustrated, painted look, 3D render look, CGI plastic, "
    "low detail textures, pixelated, motion blur trails, lens flares, anamorphic flares"
)


@dataclass
class Clip:
    name: str
    seconds: int
    prompt: str


# Estética compartilhada — todas as cenas vivem dentro de um detailing studio
# brasileiro premium, usando o "túnel de luz" hexagonal de LED como motivo central.
# Paleta fria: branco-azulado dos LEDs, sombras profundas em preto-azulado #0A0E12,
# pontuações pequenas de latão envelhecido (#C9A36A) — NUNCA dourado intenso.

STYLE = (
    "Shot on ARRI Alexa with Hawk anamorphic lenses, 35mm equivalent. Photorealistic, "
    "ungraded film negative look with subtle film grain. Strict cool color palette: "
    "deep blue-black shadows around #0A0E12, bright cool-white LED highlights around #E8F4FF, "
    "very subtle warm brass accents only on small tools and switches around #C9A36A — never dominant. "
    "Premium automotive detailing studio interior with charcoal walls and polished concrete floor. "
    "Smooth continuous dolly motion at constant slow velocity, no cuts, no zooms. "
    "Shallow depth of field, f/2.8 feel. Quiet, contemplative, reverent atmosphere. "
    "16:9 anamorphic framing. Negative space dominant on the right side of the frame for "
    "compositional balance."
)

# ── Clip 1: "Chegada" — entrada no atelier, túnel hex se acende ─────────
CLIP1 = Clip(
    name="clip1",
    seconds=8,
    prompt=(
        "Opening shot: slow forward dolly through a dim, cavernous premium automotive detailing "
        "studio. The frame is dominated by deep blue-black shadows. Overhead, dormant hexagonal "
        "LED panels begin to ignite in sequence from far to near — first one cool-white hex outline, "
        "then a second, then a third, forming a narrow corridor of cool light leading the camera "
        "deeper into the space. The polished concrete floor catches reflections of the awakening hex "
        "ceiling. The room itself reveals only as silhouettes: dark metallic walls, hints of brass "
        "tool racks at the edges. No subject yet — just the awakening of the room. " + STYLE
    ),
)

# ── Clip 2: "Aproximação" — primeiro contato com o carro sob o túnel ────
CLIP2 = Clip(
    name="clip2",
    seconds=8,
    prompt=(
        "Slow lateral dolly along the side of a dark metallic European sedan parked beneath a "
        "complete overhead hexagonal LED light tunnel inside a premium automotive detailing studio. "
        "The honeycomb pattern of cool-white LEDs (around #E8F4FF) reflects perfectly across the "
        "freshly-waxed dark hood and roof — crisp geometric light deforming gently over the curved "
        "body panels as the camera glides. Shadows are deep, highlights are razor-sharp. "
        "The car is whole, anonymous, dignified — no badges, no plates, just black mirror-like form "
        "framed by the hex tunnel above. Floor reflections double the light pattern. " + STYLE
    ),
)

# ── Clip 3: "Ofício" — polidor gira, hex distorce no verniz molhado ─────
CLIP3 = Clip(
    name="clip3",
    seconds=8,
    prompt=(
        "Extreme macro slow-motion shot of a black foam polishing pad rotating very slowly against "
        "a wet, dark metallic automotive panel inside the detailing studio. Tiny micro-droplets of "
        "polishing compound spray outward in slow elegant arcs and catch the cool-white LED light. "
        "Above, the hexagonal LED tunnel reflects across the freshly-polished section, the honeycomb "
        "pattern stretching and warping fluidly as the surface curves and the pad sweeps. "
        "Razor-sharp focus on the leading edge of the pad against the panel. Quiet, hypnotic, "
        "almost meditative. " + STYLE
    ),
)

# ── Clip 4: "Hidrofobia" — gota d'água refrata o hex ────────────────────
CLIP4 = Clip(
    name="clip4",
    seconds=8,
    prompt=(
        "Ultra-close macro shot of a single perfect spherical bead of water resting on a freshly "
        "ceramic-coated dark automotive panel inside the detailing studio. The hexagonal LED tunnel "
        "above reflects through and around the droplet, refracting the honeycomb pattern into a "
        "miniature lensed image of hex shapes inside the bead — a tiny universe of cool-white "
        "geometry suspended in a single drop. Smaller satellite droplets surround it, each one a "
        "tiny mirror of the hex ceiling. The camera dollies slowly to one side; the refraction "
        "inside the bead shifts as the angle changes. Jewel-like, technical, dreamlike. " + STYLE
    ),
)

# ── Clip 5: "Roda" — aro espelhado, hex orbitando ───────────────────────
CLIP5 = Clip(
    name="clip5",
    seconds=8,
    prompt=(
        "Slow cinematic orbital shot at low angle around a polished multi-spoke alloy wheel of a "
        "dark European sedan inside the detailing studio. As the camera arcs, the cool-white "
        "hexagonal LED tunnel reflections sweep dynamically across the chrome-finish spokes, the "
        "matte black caliper, and the brake disc behind. The mirror-finish of the wheel stretches "
        "the honeycomb light into elongated ribbons that elongate, contract, rotate. Tire is matte, "
        "wet-look, freshly dressed. No badges, no logos. " + STYLE
    ),
)

# ── Clip 6: "Revelação" — pano de microfibra revela superfície espelhada ─
CLIP6 = Clip(
    name="clip6",
    seconds=8,
    prompt=(
        "Medium close-up of a single craftsman's hand wearing a tight black nitrile glove, slowly "
        "drawing a folded premium pale-gold microfiber cloth across the dark, freshly-vitrified hood "
        "of a sedan inside the detailing studio. As the cloth glides over the surface, the panel "
        "behind it transforms into a perfect mirror that reflects the overhead hexagonal LED tunnel "
        "with crisp clarity — the cool-white honeycomb pattern blooms behind the cloth in real time. "
        "The unrevealed area ahead of the cloth is matte and quiet. Shallow depth of field, focus "
        "on the leading edge of the cloth. No face, no body — only the hand and cloth in frame. " + STYLE
    ),
)

# ── Clip 7: "Entrega" — pull-back revela carro inteiro no túnel ─────────
CLIP7 = Clip(
    name="clip7",
    seconds=8,
    prompt=(
        "Slow cinematic pull-back wide shot inside the premium automotive detailing studio, "
        "revealing the full silhouette of a dark metallic European sedan sitting beneath the iconic "
        "hexagonal LED light tunnel. The honeycomb LED pattern stretches into the distance, "
        "reflecting symmetrically across the entire mirror-like body of the car — hood, roof, doors. "
        "The vehicle is immaculate, ceramic-coated, finished. The studio is silent and reverent. "
        "Floor reflections double the symmetry of the hex tunnel. Subtle warm brass accent light "
        "from a distant tool rack at frame edge. The camera retreats steadily, framing the car "
        "centrally and leaving negative space above. " + STYLE
    ),
)

CLIPS = [CLIP1, CLIP2, CLIP3, CLIP4, CLIP5, CLIP6, CLIP7]


def extract_last_frame(video_path: Path, out_image: Path, seconds_offset: float) -> None:
    """Pull the last frame of a clip as JPEG for use as next clip's first frame."""
    out_image.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg", "-y", "-ss", f"{seconds_offset:.2f}", "-i", str(video_path),
        "-vframes", "1", "-q:v", "2", str(out_image),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def generate_clip(client: genai.Client, clip: Clip, first_frame: Path | None) -> Path:
    """Submit Veo job, poll until done, download MP4. Returns output path."""
    out_path = WORK_DIR / f"{clip.name}.mp4"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"[{clip.name}] submitting (model={MODEL}, duration={clip.seconds}s, "
          f"first_frame={'yes' if first_frame else 'no'})")

    # AI Studio (Gemini API) doesn't accept generate_audio / resolution / person_generation
    # the same way Vertex does. Build config conditionally.
    config_kwargs: dict = {
        "aspect_ratio": "16:9",
        "negative_prompt": NEGATIVE_PROMPT,
        "number_of_videos": 1,
        "duration_seconds": clip.seconds,
    }
    if BACKEND == "vertex":
        config_kwargs["resolution"] = "1080p"
        config_kwargs["person_generation"] = "allow_all"
        config_kwargs["generate_audio"] = False
    config = types.GenerateVideosConfig(**config_kwargs)

    kwargs = {"model": MODEL, "prompt": clip.prompt, "config": config}
    if first_frame is not None:
        kwargs["image"] = types.Image.from_file(location=str(first_frame))

    operation = client.models.generate_videos(**kwargs)

    poll_interval = 20
    elapsed = 0
    while not operation.done:
        time.sleep(poll_interval)
        elapsed += poll_interval
        operation = client.operations.get(operation)
        print(f"[{clip.name}] polling... elapsed={elapsed}s done={operation.done}")
        if elapsed > 600:
            raise RuntimeError(f"{clip.name} timed out after {elapsed}s")

    if operation.error:
        raise RuntimeError(f"{clip.name} failed: {operation.error}")

    response = operation.response
    videos = getattr(response, "generated_videos", None) or response.generatedVideos
    video_obj = videos[0].video
    video_obj.save(str(out_path))
    print(f"[{clip.name}] saved {out_path} ({out_path.stat().st_size / 1_000_000:.1f}MB)")
    return out_path


def post_process(clips: list[Path]) -> Path:
    """Concat + recode with -g 1 + poster, write into OUTPUT_DIR."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    concat_file = WORK_DIR / "concat.txt"
    concat_file.write_text("".join(f"file '{p}'\n" for p in clips))

    merged = WORK_DIR / "hero-merged.mp4"
    print("[post] concat (1080p source, low CRF)")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_file),
        "-c:v", "libx264", "-crf", "18", "-preset", "slow",
        "-pix_fmt", "yuv420p", "-an", str(merged),
    ], check=True)

    hero_mp4 = OUTPUT_DIR / "hero.mp4"
    hero_raw = OUTPUT_DIR / "hero-raw.mp4"
    print(f"[post] copy raw merged -> {hero_raw}")
    subprocess.run(["cp", str(merged), str(hero_raw)], check=True)

    # The site overlays the video heavily and doesn't need 1080p.
    # 720p + every-frame-keyframe + crf 26 cuts file size ~3x with no perceptible loss.
    print(f"[post] recode for scrub: 720p + -g 1 + crf 26 -> {hero_mp4}")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(merged),
        "-vf", "scale=1280:-2",
        "-c:v", "libx264", "-g", "1", "-keyint_min", "1", "-crf", "26", "-preset", "slow",
        "-movflags", "+faststart", "-pix_fmt", "yuv420p", "-an", str(hero_mp4),
    ], check=True)

    poster = OUTPUT_DIR / "poster.jpg"
    print(f"[post] poster -> {poster}")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(hero_mp4), "-vframes", "1", "-q:v", "3", str(poster),
    ], check=True)

    size_mb = hero_mp4.stat().st_size / 1_000_000
    duration_s = float(subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(hero_mp4)],
        capture_output=True, text=True,
    ).stdout.strip() or "0")
    print(f"[post] hero.mp4 = {size_mb:.1f}MB, {duration_s:.1f}s")
    return hero_mp4


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--clip", type=int, choices=list(range(1, len(CLIPS) + 1)),
                        help="Generate single clip (1-7)")
    parser.add_argument("--no-chain", action="store_true",
                        help="Don't pass last frame as next clip's first frame")
    parser.add_argument("--concat", action="store_true",
                        help="Skip generation, only run ffmpeg post-processing")
    args = parser.parse_args()

    WORK_DIR.mkdir(parents=True, exist_ok=True)

    if args.concat:
        paths = [WORK_DIR / f"{c.name}.mp4" for c in CLIPS]
        missing = [p for p in paths if not p.exists()]
        if missing:
            print(f"missing clips: {missing}", file=sys.stderr)
            return 1
        post_process(paths)
        return 0

    if BACKEND == "api_key":
        if not API_KEY:
            print("VEO_BACKEND=api_key but no GOOGLE_GENERATIVE_AI_API_KEY / GOOGLE_API_KEY in env",
                  file=sys.stderr)
            return 1
        print(f"AI Studio (API key): model={MODEL}")
        client = genai.Client(api_key=API_KEY)
    else:
        print(f"Vertex AI: project={PROJECT} location={LOCATION} model={MODEL}")
        client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)
    generated: list[Path] = []
    last_frame: Path | None = None

    targets = [CLIPS[args.clip - 1]] if args.clip else CLIPS

    for clip in targets:
        first_frame = None if args.no_chain else last_frame
        out = generate_clip(client, clip, first_frame)
        generated.append(out)
        if not args.no_chain:
            last_frame = WORK_DIR / f"{clip.name}_last.jpg"
            offset = max(clip.seconds - 0.1, 0.0)
            extract_last_frame(out, last_frame, offset)
            print(f"[{clip.name}] last frame -> {last_frame}")

    if not args.clip:
        post_process(generated)

    return 0


if __name__ == "__main__":
    sys.exit(main())
