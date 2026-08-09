# WEB — Gonzalo Spivak Real Estate

Landing page para la inmobiliaria de **Gonzalo Spivak** (Real Estate · CABA).

Sitio estático (HTML + CSS + JavaScript, sin build) con:

- Hero con retrato y llamada a la acción
- Barra de confianza y marquee de barrios
- Grilla de propiedades con filtros
- Sección "Cómo trabajo" (4 pasos)
- Formulario de tasación que arma el mensaje de WhatsApp
- Muro de Instagram (reels)
- FAQ desplegable
- Botón flotante de WhatsApp

## Estructura

```
index.html        Página principal
css/styles.css    Estilos
js/script.js      Interactividad (filtros, FAQ, formulario)
assets/           Imágenes
```

## Desarrollo local

Al ser un sitio estático, basta con abrir `index.html` o levantar un servidor simple:

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Pendientes

- Reemplazar el número de WhatsApp de ejemplo (`WA_NUMBER` en `js/script.js`).
- Confirmar la matrícula CUCICBA real (hoy N.º 9482 de ejemplo, en `index.html`).
