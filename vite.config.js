
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig(({ mode }) => ({
//   plugins: [
//     tailwindcss(),
//     react(),
//   ],
//   base: mode === 'production' ? '/megablog/' : '/',
// }))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  base: './',  // Use relative paths
  build: {
    outDir: 'dist'
  }
})