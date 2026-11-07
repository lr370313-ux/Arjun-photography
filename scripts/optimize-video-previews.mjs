import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Run with: node scripts/optimize-video-previews.mjs /path/to/ffmpeg
// Original files remain available to the full-screen player and hero.
const encoder = process.argv[2] || process.env.FFMPEG_PATH || 'ffmpeg';
const source = resolve('public/videos');
const output = join(source, 'previews');
mkdirSync(output, { recursive: true });
for (const name of readdirSync(source).filter(name => name.endsWith('.mp4'))) {
  const destination = join(output, name);
  execFileSync(encoder, [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', join(source, name),
    '-t', '12', '-an', '-vf',
    'scale=360:540:force_original_aspect_ratio=increase,crop=360:540,setsar=1,fps=24',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '26', '-maxrate', '700k',
    '-bufsize', '1400k', '-pix_fmt', 'yuv420p', '-g', '48',
    '-movflags', '+faststart', '-threads', '2', destination,
  ], { stdio: 'inherit' });
  console.log(`${name}: ${Math.round(statSync(join(source, name)).size / 1024)} KB → ${Math.round(statSync(destination).size / 1024)} KB`);
}

// The original hero is 1080p at 50 fps. A 720p/24 fps background avoids
// decoding that full frame rate while the hero's scroll transform is active.
execFileSync(encoder, [
  '-hide_banner', '-loglevel', 'error', '-y', '-i', join(source, 'premium-indian-wedding.mp4'),
  '-an', '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,setsar=1,fps=24',
  '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p',
  '-g', '48', '-movflags', '+faststart', '-threads', '2', join(output, 'hero-background.mp4'),
], { stdio: 'inherit' });

execFileSync(encoder, [
  '-hide_banner', '-loglevel', 'error', '-y', '-i', join(source, 'premium-indian-wedding.mp4'),
  '-an', '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,setsar=1,fps=24',
  '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p',
  '-g', '48', '-movflags', '+faststart', '-threads', '2', join(output, 'hero-background-large.mp4'),
], { stdio: 'inherit' });
