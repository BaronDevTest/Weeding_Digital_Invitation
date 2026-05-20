# Invitație digitală de nuntă — Daniela & Cristian

Aplicație web Flask single-page: hero cu videoclip + secțiune invitație în stil *Pink & Pearl Romance*.
La finalul videoclipului face scroll smooth automat la detalii.

Deploy-ul se face **exclusiv prin GitHub Actions** (`.github/workflows/deploy.yml`): la fiecare push pe `main` se construiește imaginea, se urcă pe GitHub Container Registry și se aplică pe cluster via Helm.

## Structura proiectului

```
.
├── .github/workflows/deploy.yml    # pipeline CI/CD (build + push + deploy)
├── app.py                          # Flask app
├── requirements.txt                # Flask + gunicorn
├── Dockerfile                      # imagine production-ready (UID 1000, non-root)
├── .dockerignore
├── templates/index.html            # singura pagină (hero video + invitație)
├── static/videos/intro.mp4
└── deploy/
    ├── chart/                      # Helm chart generic
    └── values.yaml                 # config specific aplicației (image, hostname)
```

---

## Rulare locală (dezvoltare)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```
→ http://localhost:8080

## Rulare cu Docker (test local)

```powershell
docker build -t wedding-invitation:dev .
docker run --rm -p 8080:8080 wedding-invitation:dev
```

---

## Pipeline GitHub Actions

| Setting           | Valoare                                                    |
|-------------------|------------------------------------------------------------|
| Trigger           | `push` pe `main`                                           |
| Registry          | `ghcr.io/barondevtest/wedding-invitation`                  |
| Image tag         | `sha-<git-sha>` + `latest`                                 |
| Deploy            | Helm `upgrade --install` în namespace `wedding`            |
| Hostname ingress  | `cristian-and-daniela-weeding.eu`                          |

Pipeline-ul are 2 job-uri secvențiale:

1. **build-and-push** — Docker Buildx + push în GHCR (folosește `GITHUB_TOKEN`, fără setup)
2. **deploy** — citește kubeconfig din secret, rulează `helm upgrade --install`, verifică rollout-ul, face smoke test pe `/healthz`

### Setup one-time

#### 1. Cluster Kubernetes accesibil de pe internet
Pipeline-ul NU poate ajunge la Docker Desktop (e doar pe PC-ul tău). Ai nevoie de un cluster cloud — opțiuni economice:

- **Hetzner Cloud** — k3s pe un VM ~3.5€/lună
- **DigitalOcean Kubernetes** — managed, de la ~12$/lună  
- **Linode Kubernetes Engine** — managed, ~12$/lună
- **Civo / Vultr / Scaleway** — alternative similare

Clusterul trebuie să aibă:
- **nginx ingress controller** instalat
- IP public expus pe portul 80 (și 443 dacă vrei TLS)

#### 2. Adaugă secret `KUBE_CONFIG` în GitHub

Pe mașina ta cu acces la cluster:

```powershell
# Windows / PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$HOME\.kube\config")) | Set-Clipboard
```
```bash
# Linux / macOS / WSL
cat ~/.kube/config | base64 -w0 | xclip -selection clipboard
```

GitHub → repo Settings → Secrets and variables → Actions → New repository secret:
- **Name:** `KUBE_CONFIG`
- **Value:** (paste din clipboard)

> **Notă:** kubeconfig-ul trebuie să folosească un **service account token** sau **client cert**, NU `exec` plugins (acelea cer binare locale care nu există pe runner-ul GitHub). Pentru cluster managed, descarcă kubeconfig-ul "native" de la providerul cloud.

#### 3. Setup DNS pentru `cristian-and-daniela-weeding.eu`

Pointează un A record la IP-ul public al ingress-ului:

```bash
kubectl -n ingress-nginx get svc ingress-nginx-controller
# Copiază EXTERNAL-IP
```

În panoul DNS al registrar-ului tău:
```
A    cristian-and-daniela-weeding.eu    →    <EXTERNAL-IP>
A    www                                 →    <EXTERNAL-IP>
```

#### 4. (Opțional) Fă pachetul ghcr.io public

La primul push în pipeline, pachetul de pe ghcr.io e **privat by default**. Cluster-ul nu va putea trage imaginea fără un imagePullSecret.

**Opțiunea simplă — fă-l public** (după primul rulaj reușit al pipeline-ului):
1. Mergi la https://github.com/users/BaronDevTest/packages/container/wedding-invitation/settings
2. *Danger Zone* → *Change visibility* → *Public*

**Opțiunea privată — imagePullSecret manual**:
```powershell
# o singură dată, cu acces la cluster
kubectl create namespace wedding
kubectl -n wedding create secret docker-registry ghcr-pull `
  --docker-server=ghcr.io `
  --docker-username=BaronDevTest `
  --docker-password=<PAT-cu-read:packages>
```
Apoi în `deploy/values.yaml` decomentează:
```yaml
imagePullSecrets:
  - name: ghcr-pull
```

### Deploy

```powershell
git add .
git commit -m "..."
git push origin main
```
→ Pipeline-ul pornește automat. Vezi progresul la `https://github.com/BaronDevTest/Weeding_Digital_Invitation/actions`.

### Verificare după deploy

```bash
kubectl -n wedding get all
kubectl -n wedding logs -l app.kubernetes.io/component=web --tail=50
helm history wedding -n wedding
```

### Rollback

```bash
helm rollback wedding -n wedding         # la versiunea precedentă
helm rollback wedding 3 -n wedding       # la o revizie anume
```

---

## Personalizare conținut

Toate zonele editabile din `templates/index.html` sunt marcate cu comentarii
`<!-- ✏️ EDITEAZĂ AICI -->`. Culorile, fonturile și dimensiunile sunt expuse
ca variabile CSS în `:root`.

Pentru a modifica configurația de deploy (replici, resurse, hostname), editează
`deploy/values.yaml` și fă push.
