// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from "path" 

// export default defineConfig({
//   define: {
//     "process.env": {
//       NODE_ENV: "production",
//     },
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     lib: {
//       entry: "./src/index.jsx",
//       name: "widget",
//       fileName: (format) => `widget.${format}.js`,
//     },
//     target: "esnext",
//   },
// });

/////////// working above //////////////////////

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" 

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "./src/index-email.jsx",
      name: "widget",
      formats: ['umd'],
      // fileName: (format, entryName) => `${entryName}.${format}.js`,
      fileName: (format) => `widget.${format}.js`,
    },
    target: "esnext",
  },
});
