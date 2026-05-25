# Balance — Agencia de Marketing

Sitio web institucional de **Balance**, agencia de comunicación y marketing 
para marcas y líderes. Landing page moderna con integración a Google Sheets 
para gestión de leads y configuración dinámica.

## 🚀 Stack

- **Frontend:** React 19 + Vite + TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Backend/DB:** Google Apps Script + Google Sheets
- **Deploy:** Netlify

## 📁 Estructura
src/
├── assets/
│   ├── images/        # Logos y fotos
│   └── videos/        # Videos de portfolio y hero
├── components/
│   ├── layout/        # Header, Footer, Layout
│   ├── sections/      # Hero, SobreNosotras, Servicios, Portfolio, Contacto
│   └── ui/            # Componentes reutilizables
├── hooks/
│   └── useConfig.ts   # Hook para consumir config desde Google Sheets
├── lib/
│   ├── api.ts         # Funciones de comunicación con Apps Script
│   └── types.ts       # Tipos TypeScript
└── pages/
└── Home.tsx       # Landing page principal

## ⚙️ Variables de entorno

Creá un archivo `.env.local` en la raíz con:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_URL/exec
```

## 🗂️ Google Sheets

El proyecto usa Google Sheets como base de datos liviana con 4 tabs:

| Tab | Función |
|-----|---------|
| `Leads` | Recibe los formularios de contacto |
| `Config` | Configuración dinámica (links, textos, redes) |
| `Servicios` | Lista de servicios (para futura integración dinámica) |
| `Portfolio` | Casos de portfolio (para futura integración dinámica) |

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Deploy en Netlify

1. Conectar el repositorio en [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Agregar la variable de entorno `VITE_APPS_SCRIPT_URL` en el dashboard

## 📦 Videos

Los videos del portfolio deben estar en `src/assets/videos/` con estos nombres exactos:
- `cruz-del-sur.mp4`
- `grow.mp4`
- `glow-pro.mp4`
- `bocaditos.mp4`
- `videoHeroRecortado.mp4`

> Los videos no se suben al repositorio (están en `.gitignore`).
> Deben agregarse manualmente en el servidor o via Netlify Large Media.

## 🔒 Archivos excluidos del repo

- `.env.local` — variables de entorno con URLs sensibles
- `src/assets/videos/` — videos pesados
- `node_modules/`

## 👩‍💼 Cliente

**Balance** — Comunicación y Marketing para marcas y líderes  
Fundadoras: Pili (Dirección de Marketing & Estrategia) y Pachi (Dirección de Comunicación & Experiencia de marca)

## 🧑‍💻 Desarrollado por

[SCdev](https://scdev.com.ar/) — Desarrollo web profesional
