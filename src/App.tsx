import { For } from 'solid-js'
import { Grid } from './Grid'
import './unocss.css'

function App() {
  return (
    <>
      <div class="fixed top-0 left-0 w-full -z-20">
        <Grid size={32} time={800} />
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
