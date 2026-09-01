# Cómo está armado Rivox

Este documento explica **qué hace el proyecto hoy**, **por qué se hizo así** y **por dónde entra la API de Deezer**. Sirve para entender el código sin tener que reconstruir el historial del chat.

## 1. Qué es Rivox ahora

Rivox es un cliente de música en React. La UI (Home, Favoritos, Álbumes, Artistas, playlist) **no habla con Deezer**. Habla con un catálogo interno (`id`, `title`, `artist`, `img`, `src`…).

Deezer solo existe en una capa de servicios. Si mañana tu server reemplaza a Deezer, las páginas no tienen que cambiar: cambia el origen de los datos.

```
Pantalla (Home, Playlist, Player)
        ↓
Stores (catálogo, player, favoritos)
        ↓
catalog.js  →  contrato estable de la app
        ↓
deezer/     →  HTTP + mappers (Deezer → Rivox)
        ↓
api.deezer.com
```

## 2. Por qué este patrón (y si es el mejor)

Es un **adapter + store**, no un “fetch en el componente”.

| Capa | Archivos | Propósito |
|---|---|---|
| UI | `src/components/` | Pintar y navegar. No sabe qué es Deezer. |
| Estado | `src/store/` | Caché y acciones (`loadHome`, `playSong`, likes). |
| Contrato | `src/services/catalog.js` | Lo que la app “cree” que es el catálogo. |
| Adapter | `src/services/deezer/` | Pedir a Deezer y **traducir** su JSON al contrato. |
| Config | `src/config/deezer.js` | Filtros y artista destacado. No es data de canciones. |

**Por qué sirve ahora**

- Un mapper evita que un cambio de Deezer (`picture_xl`, `nb_fan`, `preview`) se cuele en 20 componentes.
- Zustand es suficiente: el catálogo no es un CRUD enorme ni necesita cache HTTP avanzada todavía.
- Las páginas piden `loadPlaylist(id)` y leen `collection`. No copian `fetch` en cada vista.

**Qué no es “el patrón final de una empresa”**

- No hay backend propio. En producción el navegador llega a Deezer con JSONP (o, en `npm run dev`, con el proxy de Vite).
- No hay React Query / SWR. Si aparecen muchas pantallas con refetch, loading y retry, ese sería el siguiente paso, **encima** de los mappers, no en lugar de ellos.
- Favoritos viven en `localStorage`, no en tu usuario de Deezer. Falta OAuth para “mis playlists”.

Conclusión: **sí es el patrón correcto para este tamaño**. El error sería que Home importe `api.deezer.com`. El error opuesto sería meter Redux + 4 microservicios antes de tener las páginas.

## 3. Cómo se conecta Deezer (CORS)

Deezer **no manda headers CORS** útiles para un `fetch` desde `localhost`. Por eso:

1. **Desarrollo** (`npm run dev`): Vite proxy `/deezer` → `https://api.deezer.com` (`vite.config.js`).
2. Si el proxy falla, el cliente cae a **JSONP**, que Deezer sí permite en el browser.
3. **Producción** sin tu server: JSONP. Cuando tengas API propia, `deezerGet` se sustituye por `fetch("https://tu-server/...")`.

Archivo: `src/services/deezer/client.js`.

**Límite legal/técnico:** `track.preview` es un MP3 de **30 segundos**. El player usa eso. No hay track completo por esta API pública.

## 4. Qué pides a Deezer y para qué pantalla

| Pantalla | Request aproximado | Quién lo dispara |
|---|---|---|
| Home | chart tracks, chart playlists, search artist + related + albums + top | `loadHome()` al arrancar (`App.jsx`) |
| Tabs Home | `/chart/{genreId}/tracks` o search | `loadFilter(id)` |
| Álbumes | `/chart/0/albums` | `loadAlbums()` |
| Artistas | `/chart/0/artists` | `loadArtists()` |
| Playlist | `/playlist/:id` | click en el sidebar |
| Álbum | `/album/:id` | grid o panel derecho |
| Artista | `/artist/:id` + top + albums | grid o panel derecho |
| Favoritos | `/track/:id` solo si falta en caché | likes en `localStorage` |

Los mappers (`src/services/deezer/mappers.js`) convierten:

- `preview` → `src`
- `cover_medium` / `picture_xl` → `img` / `image`
- `nb_fan` → `monthlyListeners` (en Deezer son fans, no oyentes mensuales)

## 5. Stores (estado de la app)

**`catalogStore`**  
Caché del catálogo: canciones por filtro, `songsById`, playlists del sidebar, grids, y `collection` (detalle actual de playlist/álbum/artista).

**`playerStore`**  
Canción actual, cola, play/pause, volumen. El `<audio>` es un singleton. `playSong(id, queue)` necesita que esa canción exista en `songsById`.

**`libraryStore`**  
IDs de favoritos. Se guardan en `localStorage` (`rivox-liked-ids`). No es la API de Deezer.

**Data local que sí queda** (no es catálogo musical):

- `src/data/sections.jsx` — ítems del menú
- `src/data/user.js` — avatar hasta que haya login

## 6. Rutas

| Ruta | Página |
|---|---|
| `/` | Home (hero + tabs + lista) |
| `/favorites` | Favoritos |
| `/albumes` | Grid de álbumes |
| `/albumes/:id` | Portada + tracks |
| `/artistas` | Grid de artistas |
| `/artistas/:id` | Perfil + top + álbumes |
| `/playlist/:id` | Portada de playlist + tracks |

El layout (sidebar, panel derecho, player) es `MainLayout`. Cada page lo envuelve. Por eso el chrome no se pierde al cambiar de ruta.

## 7. Cómo se ve una playlist

Mismo layout que álbum:

1. `CollectionHero` — cover, tipo, título, meta, Reproducir
2. `ListeSongs` con `showAll` — tabla completa

El sidebar lista playlists del chart y cada ítem es un `NavLink` a `/playlist/:id`.

## 8. Cómo agregar otra pantalla sin romper el patrón

1. Función en `src/services/deezer/catalog.js` (fetch + mapper).
2. Acción en `catalogStore` (`loadX`).
3. Page que llama `loadX` y lee el store.
4. Ruta en `AppRouter.jsx`.
5. Link en sidebar o grid.

No hagas `fetch` dentro del JSX de la page.

## 9. Cuando tengas tu server

El cambio grande es **un archivo**, no las pages:

```js
// hoy
deezerGet("/chart/0/tracks");

// mañana
api.get("/songs");
```

Si tu API ya devuelve el shape de Rivox (`title`, `img`, `src`…), los mappers de Deezer se pueden retirar. Si sigue siendo “formato Deezer”, los mappers se quedan y solo cambia `client.js`.

OAuth (favoritos reales, playlists del usuario) **sí** necesita Application ID en el server. El secret **nunca** va en React.

## 10. Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL de Vite. Sin `dev`, el proxy `/deezer` no existe; en build de producción se usa JSONP.

---

Si algo “no se entiende” en el código, el archivo a leer primero es `src/store/catalogStore.js`: ahí está el mapa de qué se carga y cuándo.
