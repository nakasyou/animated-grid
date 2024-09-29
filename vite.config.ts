import unocss from '@unocss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [unocss(), solid()],
})
