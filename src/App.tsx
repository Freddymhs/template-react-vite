import { useRegisterSW } from 'virtual:pwa-register/react'

const REPO_URL = 'https://github.com/Freddymhs/template-react-vite'

function App() {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
  const [isOfflineReady] = offlineReady
  const [isUpdateAvailable, setNeedRefresh] = needRefresh

  const dismissUpdateBanner = () => setNeedRefresh(false)
  const applyUpdate = () => updateServiceWorker(true)

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-950 px-6 text-center text-slate-100">
      <h1 className="text-4xl font-semibold tracking-tight">template-react-vite</h1>
      <p className="max-w-md text-slate-400">
        Base PWA local-first: Vite + React 19 + TypeScript strict + Tailwind CSS v4. Cloná este repo
        para arrancar un proyecto nuevo desde una fundacion gold-standard.
      </p>

      <section
        aria-label="Estado del service worker"
        className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm"
      >
        <p>
          Service worker:{' '}
          <span className={isOfflineReady ? 'text-emerald-400' : 'text-amber-400'}>
            {isOfflineReady ? 'listo para uso offline' : 'registrando...'}
          </span>
        </p>
        {isUpdateAvailable ? (
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-amber-400">Hay una nueva version disponible</span>
            <button
              type="button"
              onClick={applyUpdate}
              className="rounded bg-emerald-600 px-3 py-1 font-medium text-white hover:bg-emerald-500"
            >
              Actualizar
            </button>
            <button
              type="button"
              onClick={dismissUpdateBanner}
              className="rounded border border-slate-700 px-3 py-1 text-slate-300 hover:bg-slate-800"
            >
              Descartar
            </button>
          </div>
        ) : null}
      </section>

      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
      >
        {REPO_URL}
      </a>
    </main>
  )
}

export default App
