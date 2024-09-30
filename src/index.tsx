/* @refresh reload */
import { render } from 'solid-js/web'
import 'virtual:uno.css'

import App from './App'

if (import.meta.env.DEV) {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/eruda'
  // @ts-ignore global eruda
  script.onload = () => globalThis.eruda.init()
  document.body.append(script)
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element found')
}

render(() => <App />, root)
