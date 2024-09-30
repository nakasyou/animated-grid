import { For } from 'solid-js'
import { Grid } from './Grid'
import './unocss.css'

function App() {
  const color = `rgb(${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())})`
  return (
    <>
      <div class="fixed top-0 left-0 w-full -z-20">
        <Grid
          size={32}
          time={1000}
          color={color}
          weight={2}
          class="opacity-30"
        />
      </div>
      <div>
        <For each={Array(500)}>
          {() => <div class="text-center">{'Content '.repeat(10)}</div>}
        </For>
      </div>
    </>
  )
}

export default App
