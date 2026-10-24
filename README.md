# Laboratorio 3: hash de contraseñas del cliente

Experiencia realizada el 23 de octubre de 2026 en MobileRead Forums, con la cuenta propia de laboratorio `MatiasLab2326`.

Se identificó MD5 en registro y acceso, se reprodujeron los campos del login en DevTools y se capturaron solicitudes reales con Burp. El control con contraseña incorrecta fue rechazado. En una nueva solicitud se sustituyeron únicamente los dos hashes por los correctos, y se comprobó acceso al panel privado. Al terminar se cambió la contraseña temporal y se verificó el rechazo de la anterior.

## Contenido

- `scripts/hash_consola.js`: código ejecutado en la consola del navegador para calcular los dos campos mediante las funciones públicas del sitio. No envía solicitudes ni modifica el formulario.
- `scripts/verificar_md5.mjs`: verificación local adicional de la biblioteca del sitio contra `node:crypto`, con cuatro casos de caracteres y espacios. No reemplaza la evidencia de DevTools.
- `figuras/`: Las 17 figuras del informe: 15 composiciones de evidencias específicas y 2 capturas generales del entorno.
- `figuras/manifiesto.json`: coordenadas de cada recorte y SHA-256 del archivo original del que procede.
- `resultados/verificacion_resultados.json`: comparación de los campos de solicitudes y el contenido de las respuestas; sin cabeceras, cookies ni tokens.

## Cálculo en consola

El script requiere una página de MobileRead que tenga cargadas `md5hash` y `hex_md5`. Se debe revisar su contenido antes de ejecutarlo. Solicita la contraseña exclusiva de pruebas y devuelve un arreglo con los dos nombres de campo, sus hashes y sus longitudes. Los resultados se expanden en DevTools.

La contraseña usada en la experiencia ya fue cambiada. No deben utilizarse credenciales personales en estas pruebas.

## Verificación adicional local

Con Node.js y una copia de la biblioteca pública del sitio:

```bash
node scripts/verificar_md5.mjs /ruta/a/vbulletin_md5.js
```

La fuente consultada fue [vbulletin_md5.js?v=385](https://www2.mobileread.com/c/vbulletin_md5.js?v=385). La verificación local valida el vector MD5 conocido de `abc`, una entrada ASCII, espacios ASCII extremos y un carácter cuyo código supera 255.

## Alcance de los resultados

La autenticación se comprobó por el contenido de la respuesta y el panel privado. El control positivo, el negativo y la sustitución respondieron HTTP 200, por lo que ese estado por sí solo no determina éxito.

La experiencia observó el cliente y el comportamiento de una cuenta propia. No inspeccionó el almacenamiento del servidor ni demuestra ausencia de sal o de derivaciones adicionales. La sustitución reutilizó una credencial conocida; no explotó colisiones ni invirtió MD5.

Los originales y el tráfico completo se conservan de forma privada. Este repositorio no contiene cookies, tokens, la nueva contraseña ni capturas de cuentas ajenas. El informe académico se entrega por separado.
