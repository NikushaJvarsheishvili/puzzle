import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// Source - https://stackoverflow.com/q
// Posted by Laurie Crean, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-06, License - CC BY-SA 4.0

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "tailwindcss";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//    postcss: {
//     plugins: [tailwindcss],
//    },
//   },
// });

