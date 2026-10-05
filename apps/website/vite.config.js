import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const pages = ['index', 'contact', 'terms-and-conditions', 'privacy-policy', '404']

// Serves /contact from contact.html and unknown paths from 404.html, the way the deployed site does.
function cleanUrls() {
  const rewrite = (req, res, next) => {
    const [pathname, query = ''] = req.url.split('?')
    if (pathname === '/' || pathname.includes('.') || pathname.startsWith('/@') || pathname.startsWith('/src/') || pathname.startsWith('/node_modules/')) {
      return next()
    }
    const name = pathname.replace(/^\/|\/$/g, '')
    const known = pages.includes(name) && existsSync(resolve(__dirname, `${name}.html`))
    if (!known) res.statusCode = 404
    req.url = `/${known ? name : '404'}.html${query ? `?${query}` : ''}`
    next()
  }
  return {
    name: 'clean-urls',
    configureServer: (server) => { server.middlewares.use(rewrite) },
    configurePreviewServer: (server) => { server.middlewares.use(rewrite) },
  }
}

export default defineConfig({
  plugins: [cleanUrls()],
  // The trading app owns Vite's default port; `pnpm dev` at the root starts both.
  server: { port: 5174, strictPort: true },
  preview: { port: 4174 },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((name) => [name, resolve(__dirname, `${name}.html`)])),
    },
  },
})
