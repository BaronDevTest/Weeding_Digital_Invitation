# Invitație digitală de nuntă — Daniela & Cristian

Site single-page cu hero video, countdown, povestea cuplului, detalii eveniment, hartă, program, dress code, galerie și RSVP.

Construit cu **Express.js** și deployat pe **cPanel** (Innovahosting) via *Setup Node.js App*.

## Structura proiectului

```
.
├── server.js                 # Express server (rute /, /healthz, /static/*)
├── package.json              # express ^4.19.2, npm start
├── templates/index.html      # singura pagină (responsive, clamp() pentru fluid typography)
├── static/videos/intro.mp4   # video-ul din hero
├── DEPLOY_CPANEL.md          # ghid pas-cu-pas pentru deploy pe cPanel
└── .gitignore
```

## Rulare locală

```powershell
npm install
npm start
```
→ http://localhost:3000

Pentru alt port:
```powershell
$env:PORT=4000; npm start
```

## Deploy

Vezi [DEPLOY_CPANEL.md](DEPLOY_CPANEL.md) pentru pașii detaliați.

Pe scurt, după push pe `main`:
1. cPanel → **Git Version Control** → **Update from Remote** → **Deploy HEAD Commit**
2. cPanel → **Setup Node.js App** → **Restart**

Site-ul live: `https://cristian-and-daniela-weeding.eu`

## Personalizare conținut

Zonele editabile din [templates/index.html](templates/index.html) sunt marcate cu comentarii `<!-- ✏️ EDITEAZĂ AICI -->`. Culorile, fonturile și dimensiunile sunt expuse ca variabile CSS în `:root`, iar tipografia folosește `clamp()` pentru a scala fluid între mobile și desktop.

Data nunții se editează în secțiunea `<script>` la finalul fișierului:
```javascript
var weddingDate = new Date(2027, 6, 23, 14, 0, 0).getTime();
```
