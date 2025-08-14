import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"

export default defineConfig([
  tseslint.configs.recommended as any,
  {
    files: [`**/*.{js,mjs,cjs,ts,mts,cts}`],
    plugins: { js },
    extends: [`js/recommended`],
    languageOptions: {
      globals: { ...globals.node, Bun: true, Worker: true }
    },
    rules: {
      quotes: [`warn`, `backtick`], // ⬅️ Tambahkan ini untuk memaksa backtick
      "@typescript-eslint/no-explicit-any": `off`, // ⬅️ Mengijinkan any
      "@typescript-eslint/no-unused-vars": `off`, // ⬅️ Mengijinkan deklarasi variable tanpa harus digunakan (typescript)
      "no-unused-vars": `off` // ⬅️ Mengijinkan deklarasi variable tanpa harus digunakan (javascript)
    }
  }
])
