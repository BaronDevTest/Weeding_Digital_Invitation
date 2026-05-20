# Deploy pe cPanel via Setup Node.js App (Innovahosting)

Ghid pas cu pas pentru a urca aplicatia Express pe cPanel.

## 1. Creeaza aplicatia Node.js in cPanel

Login pe https://web8.innovahosting.net:2083 -> sectiunea **Software** -> **Setup Node.js App** -> **CREATE APPLICATION**.

Completeaza:

| Camp | Valoare |
|---|---|
| Node.js version | cea mai noua disponibila (18+ minim) |
| Application mode | **Production** |
| Application root | `wedding-hub` |
| Application URL | domeniul/subdomeniul (ex: `invitatie.exemplu.ro`) |
| Application startup file | `server.js` |
| Passenger log file | (lasa default sau `wedding-hub.log`) |

Click **CREATE**. cPanel iti creeaza un virtualenv Node izolat si afiseaza la final un panou cu comenzi gen:
```
source /home/USER_TAU/nodevenv/wedding-hub/18/bin/activate && cd /home/USER_TAU/wedding-hub
```
**Salveaza linia asta** — o folosesti la pasul 4.

## 2. Urca fisierele

In **File Manager** (sau prin FTP), intra in `/home/USER_TAU/wedding-hub/` si urca:

```
server.js
package.json
templates/
static/
```

**NU urca**:
- `.venv/`, `.git/`, `.claude/`, `.github/`
- `app.py`, `requirements.txt` (Python — nu mai sunt necesare)
- `Dockerfile`, `.dockerignore`, `deploy/`
- `node_modules/` (se instaleaza pe server cu npm install)

## 3. Instaleaza dependentele

In **Setup Node.js App**, click pe iconita de creion (Edit) la aplicatia ta. Vei vedea un buton **"Run NPM Install"** — apasa-l.

Sau, daca preferi din SSH:
```bash
source /home/USER_TAU/nodevenv/wedding-hub/18/bin/activate && cd /home/USER_TAU/wedding-hub
npm install
```

Dureaza ~30 secunde. Va aparea un folder `node_modules/`.

## 4. Restart si test

In **Setup Node.js App** -> click **RESTART** la aplicatia ta.

Deschide in browser:
- `https://domeniul-tau/healthz` -> trebuie sa vezi `{"status":"ok"}`
- `https://domeniul-tau/` -> trebuie sa vezi pagina de invitatie cu video

## 5. Update-uri ulterioare

Cand modifici codul local:
1. Urci doar fisierele modificate (FTP / File Manager / git)
2. Daca s-a schimbat `package.json` -> click din nou **Run NPM Install**
3. Click **Restart** in Setup Node.js App

## Probleme frecvente

**"Application failed to start"**
- Verifica ca `Application startup file` = `server.js` exact
- Verifica logs in `~/wedding-hub/stderr.log` (din File Manager sau SSH)

**"Cannot GET /"**
- Verifica ca folderul `templates/` cu `index.html` exista in `~/wedding-hub/`

**Video-ul nu se incarca / nu poti da seek**
- Express trimite deja `Accept-Ranges: bytes`, ar trebui sa mearga
- Verifica ca fisierul `static/videos/intro.mp4` exista pe server
- Pe shared hosting, fisierele >50MB pot avea limita la upload via File Manager — foloseste FTP pentru video-uri mari

**"502 Bad Gateway" intermitent**
- Restart aplicatia
- Verifica daca ai depasit limita de memorie a planului tau de hosting
