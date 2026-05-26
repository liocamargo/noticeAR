# NoticeAR 📰

Un app tipo Tinder para noticias argentinas. **Swipea** noticias de medios reales (Infobea, La Nación, La Voz, Clarín, Ámbito), **guarda** las que te gustan para hoy o como **favoritas permanentes**, y filtra por categorías.

**Demo:** [noticeAR.vercel.app](https://noticeAR.vercel.app)

---

## Features ✨

- 🔐 **Autenticación** — Registro y login con Supabase Auth
- 💳 **Swipe Stack** — Cards apiladas con gestos (drag horizontal)
- 📰 **RSS en Vivo** — Noticias de 5 medios argentinos actualizadas cada 5 min
- ⭐ **Favoritos** — Guardá noticias para siempre
- 📅 **Hoy** — Guardá noticias que leés hoy (se resetean mañana)
- 🏷️ **Filtros** — Política, Economía, Deportes, Cultura, Tecnología
- 📱 **Mobile-First** — Optimizado para celular (pero funciona en desktop)
- 🎨 **Smooth Animations** — Framer Motion para transiciones fluidas

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Next.js 15 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS |
| **Animaciones** | Framer Motion |
| **Datos** | Supabase (PostgreSQL + Auth + RLS) |
| **State** | Zustand, TanStack Query |
| **RSS** | fast-xml-parser |

---

## Empezar en Local

### Requisitos
- Node.js 18+
- npm o yarn

### 1. Clonar y instalar
```bash
git clone https://github.com/liocamargo/noticeAR.git
cd noticeAR
npm install
```

### 2. Configurar Supabase

**Opción A: Local (requiere Docker)**
```bash
npm install -g supabase
supabase start
# Copia las credenciales a .env.local
```

**Opción B: En la nube (recomendado)**
1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
2. Copia `Project URL` y `anon public key`
3. Crea `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Ejecutar migraciones

En el **SQL Editor** de tu proyecto Supabase, ejecutá el contenido de `supabase/migrations/001_initial.sql`

### 4. Dev server
```bash
npm run dev
```

Abre [localhost:3000](http://localhost:3000) 🚀

---

## Estructura de Carpetas

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Login, Register
│   ├── (app)/             # Feed protegido
│   │   ├── feed/          # Swipe principal
│   │   ├── today/         # Guardadas hoy
│   │   └── favorites/     # Favoritas forever
│   ├── api/               # Endpoints
│   │   └── news/          # GET /api/news (RSS parsing)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Redirect auth
├── components/            # React components
│   ├── SwipeStack.tsx     # Cards apiladas
│   ├── NewsCard.tsx       # Card individual
│   ├── SwipeButtons.tsx   # Botones ✗ ★ ✓
│   ├── CategoryFilter.tsx # Chips de categoría
│   ├── BottomNav.tsx      # Navegación inferior
│   └── ...
├── hooks/                 # Custom hooks
│   ├── useNews.ts         # Fetch + filtrado
│   ├── useSwipe.ts        # Gestos drag
│   └── useInteractions.ts # Like/favorito
├── services/              # Lógica reutilizable
│   ├── news/              # RSS parsing
│   └── supabase/          # Auth + DB
├── stores/                # Zustand state
│   └── feedStore.ts       # Categorías activas
├── types/                 # TypeScript types
└── lib/                   # Utils
```

---

## Flujo de Usuario

### 1. **Registro / Login**
```
/register → crea usuario Supabase
/login → inicia sesión
→ /feed
```

### 2. **Feed (Swipe)**
```
- Lee noticias de RSS feeds reales
- Swipea derecha o ★ → guarda como favorita
- Swipea izquierda → descarta
- Filtra por categoría
- Botones para interactuar rápido
```

### 3. **Hoy**
```
- Noticias que guardaste HOY
- Se resetean a medianoche
- Botón para mover a Favoritas
```

### 4. **Favoritas**
```
- Guardadas forever
- Permanecen entre días
- Podés sacar de favoritas
```

---

## API y Bases de Datos

### GET `/api/news`

Retorna noticias parseadas de todos los RSS feeds:

```json
[
  {
    "id": "base64-encoded-url",
    "title": "Título de la noticia",
    "description": "Resumen...",
    "url": "https://...",
    "image": "https://...",
    "source": "Infobae",
    "category": "Política",
    "publishedAt": "2025-05-26T10:30:00Z"
  }
]
```

**Headers de caché:**
```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```
(5 min de caché, reasegura cada 10 min en background)

### Tablas Supabase

**`news_interactions`** — Noticias que el usuario guardó
```sql
id (UUID), user_id (FK), article_id (TEXT), article_data (JSONB),
is_favorite (BOOLEAN), liked_at (DATE), created_at (TIMESTAMPTZ)
```

**`news_seen`** — Noticias ya vistas (para no repetir)
```sql
user_id (FK), article_id (TEXT), seen_at (TIMESTAMPTZ)
```

Ambas con **Row Level Security**: usuario solo ve sus datos.

---

## Deploy a Vercel

1. Push a GitHub (este repo)
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa `liocamargo/noticeAR`
4. Agrega **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```
5. Click **Deploy**

Tu app estará live en `noticeAR-xxxxx.vercel.app` en ~2 min ✅

---

## Medios Incluidos

| Medio | RSS | Categorías |
|-------|-----|-----------|
| 🔵 Infobae | General | Política, Economía, Deportes |
| 🔴 La Nación | General | Política, Cultura, Tecnología |
| 🟢 La Voz | General | Economía, Deportes |
| 🟡 Clarín | Política | Política, Economía |
| 🟠 Ámbito | General | Economía, Política |

---

## Troubleshooting

**"Error al iniciar sesión"**
- Verifica que Supabase está up y credenciales en `.env.local` son correctas
- Recarga la página

**"No cargan noticias"**
- Revisa `/api/news` en la consola
- Algunos feeds pueden estar down momentáneamente
- Espera 5 min y recarga (caché)

**"Tipo 'null' en favorites"**
- Limpia localStorage: `localStorage.clear()`
- Recarga

---

## Próximas Features 🚀

- [ ] Push notifications para noticias trending
- [ ] Compartir en redes sociales
- [ ] Dark mode
- [ ] Búsqueda y ordenamiento
- [ ] Más medios argentinos
- [ ] PWA (offline support)
- [ ] Analytics (qué categorías prefiere cada usuario)

---

## Licencia

MIT — Hacé lo que quieras 📜

---

**¿Preguntas?** Abre un issue o escribe a luis@kiri.ar