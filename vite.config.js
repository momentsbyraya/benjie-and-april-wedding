import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * publicDir is the repo `assets/` folder, so static files live at `/images/...`, `/fonts/...`.
 * Only rewrite those prefixes — do NOT rewrite `/assets/index-*.js` (Vite may serve chunks there).
 */
function assetsUrlRewritePlugin() {
  return {
    name: 'assets-url-rewrite',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url ?? ''
        const q = raw.indexOf('?')
        const path = q === -1 ? raw : raw.slice(0, q)
        const search = q === -1 ? '' : raw.slice(q)
        const shouldRewrite =
          path.startsWith('/assets/images/') || path.startsWith('/assets/fonts/')
        if (shouldRewrite) {
          req.url = path.replace(/^\/assets/, '') + search
        }
        next()
      })
    },
  }
}

// Custom plugin to copy assets and Netlify headers
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const copyDir = (src, dest) => {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
        }
        
        const items = readdirSync(src)
        items.forEach(item => {
          const srcPath = join(src, item)
          const destPath = join(dest, item)
          
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        })
      }
      
      copyDir('assets', 'dist/assets')
      
      // Copy _headers file from public to dist root for Netlify
      if (existsSync('public/_headers')) {
        copyFileSync('public/_headers', 'dist/_headers')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [assetsUrlRewritePlugin(), react(), copyAssetsPlugin()],
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: [
      'subadministrative-alice-scrofulously.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'assets'
}) 