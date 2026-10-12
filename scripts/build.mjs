import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const [, source] of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) {
  new Script(source);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
  assert(ids.includes(anchor), `Missing anchor: ${anchor}`);
}
assert(!html.includes('id="edit"'), 'Public portfolio must remain read-only');
assert(!html.includes('id="image-input"'), 'Public portfolio must not expose upload controls');
assert(html.includes('id="aws-certificate-image"'), 'Certificate missing');
await mkdir(new URL('../site/', import.meta.url), { recursive: true });
await writeFile(new URL('../site/index.html', import.meta.url), html);
console.log('Validated and built standalone portfolio → site/index.html');
