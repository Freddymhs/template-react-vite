# template-react-vite

[![CI](https://github.com/Freddymhs/template-react-vite/actions/workflows/ci.yml/badge.svg)](https://github.com/Freddymhs/template-react-vite/actions/workflows/ci.yml)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?logo=vite&logoColor=white)](https://vite.dev)

Template starter para proyectos **PWA local-first** con Vite + React 19 + TypeScript estricto.
Base genérica y lean: trae el tooling gold-standard listo (testing, lint, hooks, CI) y nada de
librerías de dominio — esas se agregan por proyecto (ver seccion de abajo).

## Stack

| Capa             | Tecnologia                            | Notas                                                                             |
| ---------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| Base             | Vite + React 19 + TypeScript (strict) | `tsc -b` con project references (`tsconfig.app.json` / `tsconfig.node.json`)      |
| Estilos          | Tailwind CSS v4 (`@tailwindcss/vite`) | Sin config file — Tailwind v4 usa CSS-first config, ver `src/index.css`           |
| PWA              | `vite-plugin-pwa` (Workbox)           | `registerType: 'autoUpdate'`, app-shell offline, manifest de ejemplo              |
| Testing unitario | Vitest + Testing Library + jsdom      | `src/App.test.tsx` de ejemplo                                                     |
| Testing E2E      | Playwright                            | `e2e/home.spec.ts` — smoke que carga la home                                      |
| Lint / format    | ESLint flat config + Prettier         | `eslint.config.mjs`, `.prettierrc`                                                |
| Git hooks        | Husky + lint-staged + commitlint      | pre-commit corre lint+format sobre staged, commit-msg valida conventional commits |
| CI               | GitHub Actions                        | `.github/workflows/ci.yml`                                                        |

### Por que Tailwind v4

Se uso Tailwind v4 (`4.3.2` al momento de crear este template) en vez de v3: el setup es estable,
elimina `tailwind.config.js` y `postcss.config.js` (configuracion CSS-first via `@import
'tailwindcss'` en `src/index.css` + plugin `@tailwindcss/vite`), y el build/tests corrieron sin
problemas en la verificacion de este template. Si tu proyecto depende de un plugin de Tailwind que
todavia no soporta v4, bajar a v3 estable es la alternativa documentada.

## Como usar

```bash
git clone https://github.com/Freddymhs/template-react-vite.git mi-proyecto
cd mi-proyecto
rm -rf .git && git init   # arrancar historia propia
npm install
npm run dev
```

### Scripts

| Script                 | Que hace                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo con HMR                                                     |
| `npm run build`        | Type-check (`tsc -b`) + build de produccion (`dist/`)                              |
| `npm run preview`      | Sirve el build de produccion localmente                                            |
| `npm run lint`         | ESLint sobre todo el proyecto                                                      |
| `npm run lint:fix`     | ESLint con `--fix`                                                                 |
| `npm run format`       | Prettier `--write` sobre todo el proyecto                                          |
| `npm run format:check` | Prettier `--check` (usado en CI)                                                   |
| `npm run type-check`   | `tsc -b` sin build de Vite                                                         |
| `npm run test`         | Vitest en modo watch                                                               |
| `npm run test:run`     | Vitest una sola pasada (usado en CI)                                               |
| `npm run test:e2e`     | Playwright — requiere `npx playwright install --with-deps chromium` la primera vez |
| `npm run prepare`      | Instala los hooks de Husky (se corre solo en `npm install`)                        |

## Que agregar por proyecto

Este template es intencionalmente lean. Las siguientes librerias **no** vienen instaladas — se
agregan segun lo que el proyecto concreto necesite:

- **Dexie** — si el proyecto necesita persistencia local con IndexedDB (offline-first real, no solo cache de assets).
- **Zustand** — si el estado global crece mas alla de lo que Context/props resuelve limpio.
- **Recharts** — si el proyecto muestra graficos/dashboards.
- **react-hook-form** — si hay formularios con validacion compleja.
- **Zod** — si necesitas validar schemas en runtime (forms, respuestas de API, `localStorage`).
- **date-fns** — si hay manejo de fechas mas alla de lo nativo (`Intl.DateTimeFormat`, `Date`).

No se agregan preventivamente: cada dependencia nueva es superficie de mantenimiento que este
template no asume por vos.

## Estructura

```
src/
  main.tsx          # entry point
  App.tsx            # home de ejemplo + estado del service worker (PWA)
  App.test.tsx        # test Vitest + Testing Library de ejemplo
  index.css           # Tailwind directives
  lib/                # logica de dominio del proyecto (vacio por diseno)
  test/setup.ts        # matchers de jest-dom para Vitest
e2e/
  home.spec.ts         # smoke test Playwright (carga la home)
.github/workflows/
  ci.yml                # type-check -> lint -> test -> build (+ e2e en job separado)
```

## CI

El workflow corre dos jobs:

1. **quality** — type-check, lint, format check, unit tests y build. Rapido, corre siempre.
2. **e2e** — instala Chromium y corre el smoke test de Playwright. Depende de `quality` (`needs:
quality`) para no gastar minutos de CI en un job mas lento si lo basico ya rompio. Sube el
   reporte de Playwright como artifact si falla.

## Node

Version fijada en `.nvmrc` (Node 22 LTS). Si usas `nvm`, `nvm use` la toma automaticamente.
