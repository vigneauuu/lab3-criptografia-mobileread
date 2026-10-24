/** Verifica localmente la biblioteca pública del sitio contra node:crypto.
 * Uso: node verificar_md5.mjs /ruta/al/vbulletin_md5.js
 * No envía solicitudes ni utiliza cuentas. No reemplaza la prueba en DevTools.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const file = process.argv[2];
if (!file) throw new Error('Indica la ruta de la biblioteca pública descargada del sitio.');
const site = { navigator: { userAgent: 'Mozilla/5.0', appVersion: '5.0' } };
runInNewContext(readFileSync(file, 'utf8'), site, { timeout: 1000 });
const md5 = text => createHash('md5').update(text, 'latin1').digest('hex');
const cases = [
  { name: 'Vector MD5 conocido', input: 'abc', legacy: '900150983cd24fb0d6963f7d28e17f72', utf: md5('abc') },
  { name: 'Contraseña ASCII', input: 'LabCripto2026', legacy: md5('LabCripto2026'), utf: md5('LabCripto2026') },
  { name: 'Espacios ASCII en extremos', input: '  LabCripto2026  ', legacy: md5('LabCripto2026'), utf: md5('LabCripto2026') },
  { name: 'Carácter de código mayor que 255', input: '\u0100', legacy: md5('&#256;'), utf: md5('\u0100') }
];
for (const test of cases) {
  const input = { value: test.input }, legacy = { value: '' }, utf = { value: '' };
  site.md5hash(input, legacy, utf, 0);
  assert.equal(legacy.value, test.legacy, `${test.name}: campo principal`);
  assert.equal(utf.value, test.utf, `${test.name}: campo alternativo`);
  assert.equal(input.value, '', `${test.name}: vaciado del campo original`);
  assert.match(legacy.value, /^[a-f0-9]{32}$/);
  console.log(`OK: ${test.name}`);
}
console.log('Verificación local: 4 casos correctos; sin tráfico de autenticación.');
