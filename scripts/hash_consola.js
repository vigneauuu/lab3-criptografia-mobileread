/* Laboratorio 3: ejecutar en la consola de www.mobileread.com/forums/.
 * Calcula localmente los dos campos del login usando la función del sitio.
 * No realiza solicitudes de red ni modifica los formularios de la página.
 * Utilizar únicamente la contraseña exclusiva de la cuenta de laboratorio.
 */
(() => {
  if (typeof md5hash !== "function" || typeof hex_md5 !== "function") {
    throw new Error("La página no tiene cargadas md5hash y hex_md5.");
  }
  const clave = prompt("Contraseña exclusiva de la cuenta de laboratorio:");
  if (clave === null) return;
  const entrada = { value: clave };
  const normal = { value: "" };
  const utf = { value: "" };
  md5hash(entrada, normal, utf, 0);
  if (!normal.value || !utf.value) {
    throw new Error("md5hash no produjo una salida en este navegador.");
  }
  // Devolver los resultados permite verlos aunque el sitio sustituya console.
  return [
    { campo: "vb_login_md5password", hash: normal.value, caracteres: normal.value.length },
    { campo: "vb_login_md5password_utf", hash: utf.value, caracteres: utf.value.length }
  ];
})();
