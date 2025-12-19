import { defineConfig } from "tsup"

export default defineConfig({
  outDir: `./dist`,
  entry: [`./src/index.ts`],
  format: [`cjs`, `esm`],
  cjsInterop: true,
  dts: true,
  clean: true,
  minify: true
})
