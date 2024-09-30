import { createEffect, createSignal, For, onCleanup, onMount } from 'solid-js'
import './grid.css'

export const Grid = (props: {
  /**
   * Grid のサイズ
   */
  size: number

  /**
   * 広がるまでの時間、ms
   */
  time: number

  /**
   * 色
   */
  color: string | (() => string)
  
  /**
   * 線の太さ
   */
  weight: number

  /**
   * class
   */
  class?: string
}) => {
  const [width, setWidth] = createSignal(0)
  const [height, setHeight] = createSignal(0)

  let canvas!: HTMLCanvasElement

  let isCleanuped = false
  onCleanup(() => {
    isCleanuped = true
  })
  window.addEventListener('resize', () => {
    setWidth(window.outerWidth)
    setHeight(window.outerHeight)
  })
  onMount(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })
  const scrolledByTime: number[] = []
  let sizes: number[] = []

  createEffect(() => {
    width()
    height()
    ;(async () => {
      await new Promise(requestAnimationFrame)

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }
      sizes = []
      for (let y = 0; y < Math.floor(height() / props.size) + 5; y++) {
        sizes.push(Math.floor(width() / props.size) + 5)
      }
    })()
  })

  onMount(() => {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const step = () => {
      const now = Date.now()
      if (scrolledByTime.length * 32 < window.scrollY + window.outerHeight) {
        scrolledByTime.push(now)
      }
      const baseY = props.size - (window.scrollY % props.size) - props.size * 3
      ctx.clearRect(0, 0, width(), height())
      for (let y = 0; y < sizes.length; y++) {
        const ys = sizes[y]

        const n = y + Math.floor(window.scrollY / props.size)
        const delta = now - scrolledByTime[n]
        if (!(n in scrolledByTime)) {
          continue
        }
        const many = Math.floor((Math.min(delta / props.time, 1) * ys) / 2)

        for (let x = 0; x < many; x++) {
          ctx.beginPath()
          ctx.strokeStyle =
            typeof props.color === 'function' ? props.color() : props.color
          ctx.lineWidth = props.weight
          ctx.strokeRect(
            x * props.size + width() / 2,
            baseY + y * props.size,
            props.size,
            props.size,
          )
          ctx.strokeRect(
            -x * props.size + width() / 2,
            baseY + y * props.size,
            props.size,
            props.size,
          )
        }
      }
      !isCleanuped && requestAnimationFrame(step)
    }
    step()
  })
  return (
    <canvas width={width()} height={height()} ref={canvas} class={props.class} />
  )
}
