## 📗 `playground-frontend/README.md`

# 🎨 Playground Frontend

This is the **frontend** of the Playground project.  
Built with **Angular 21** and **Angular Material**, including a simple light/dark theme toggle and multi-language support via **ngx-translate**.

The app is built as a static **Single Page Application (SPA)** served by **NGINX**,  
deployed at:  
👉 [https://app.andreas-dahm.eu](https://app.andreas-dahm.eu)

---

## 🧩 Tech Stack
| Component | Purpose |
|------------|----------|
| Angular 21 | Frontend framework |
| Angular Material | UI components & theming |
| ngx-translate | i18n / instant translation |
| NGINX | Serves the compiled SPA |
| Docker + GitHub Actions | Automated build & image publishing |

---

## 📁 Project Structure
playground-frontend/
├─ src/
│ ├─ app/
│ │ ├─ app.component.ts
│ │ ├─ theme.service.ts
│ │ └─ ...
│ ├─ assets/i18n/
│ │ ├─ en.json
│ │ └─ de.json
│ └─ index.html
├─ Dockerfile
├─ nginx.conf
└─ .github/workflows/docker.yml

---

## 🚀 Local Development

# 1. Install dependencies
```bash
npm install
```

# 2. Start development server
```bash
ng serve --open
```

App runs at http://localhost:4200


# 3. 🐳 Docker Build (local)
```bash
docker build -t playground-frontend:local .
docker run -p 8080:80 playground-frontend:local
```

Then open http://localhost:8080

## ⚙️ GitHub Actions (CI/CD)

On every push to main, GitHub Actions will:

Build the Angular project

1. Create a Docker image
2. Push it to Docker Hub (docker.io/andreasdahm/playground-frontend:main)
3. Workflow file: .github/workflows/docker.yml

Required repository secrets:

Name	Description
DOCKERHUB_USERNAME	Your Docker Hub username
DOCKERHUB_TOKEN	Personal access token for Docker Hub

## 🌐 Deployment

The built image is deployed via
https://github.com/lobothedark/playground-deploy

on the Hostinger KVM server using Traefik.

docker compose pull
docker compose up -d

✅ Live site at https://app.andreas-dahm.eu

## 🪄 Maintainer

Andreas Dahm
📧 andreas.dahm@gmail.com
🌐 https://andreas-dahm.eu
