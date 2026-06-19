# iniobong

This is a small static site (digital business card) turned into a Progressive Web App (PWA).

How to test locally

1. Serve the folder over HTTP (service workers require a secure context; localhost is allowed):

```bash
# from the project root
python3 -m http.server 8000
# or, if you have npm installed:
npx serve . -s -l 8000
```

2. Open http://localhost:8000 in a Chromium-based browser (Chrome/Edge) or Firefox.

3. Open Developer Tools → Application and check:
	- Manifest: the app name, icons, and theme color.
	- Service Worker: `sw.js` should be registered.

4. On supported browsers you'll see an "Install app" button in the bottom-right (or use the browser UI) to install the PWA to your device.

Notes

- For production, serve the site over HTTPS (GitHub Pages, Netlify, Vercel, or any HTTPS-enabled host).
- The `manifest.json` uses `director.jpg` as an app icon placeholder; consider supplying dedicated 192x192 and 512x512 PNG icons for best results.
