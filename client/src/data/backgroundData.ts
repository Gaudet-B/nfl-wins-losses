import * as d3 from 'd3'
import { ColorPalette } from '../components/AnimatedBackground/AnimatedBackground'
import bgColors from './bgColors'

export type Data = { index: string; layer: string; value: number }

// number of "layers"
const LAYERS = 10 as const // (was 'n', default was 20)
// number of "waves" (AKA the x axis)
const SAMPLES = 50 as const // (was 'm', deafult was 200)
/** the variation in the "waves" (AKA all data points) */
const BUMPS = 200 as const // (was 'k', default was 10)

const X_MULTIPLIER = 1 // was 1
const Y_MULTIPLIER = 2 // was 2
const Z_MULTIPLIER = 10 // was 10

function bump(a: number[], n: number) {
  const x = X_MULTIPLIER / (0.1 + Math.random())
  const y = Y_MULTIPLIER * Math.random() - 0.5
  const z = Z_MULTIPLIER / (0.1 + Math.random())
  for (let i = 0; i < n; ++i) {
    const w = (i / n - y) * z
    a[i] += x * Math.exp(-w * w)
  }
}

function bumps(n: number, m: number, base?: number) {
  const a = []
  for (let i = 0; i < n; ++i) a[i] = base || 0
  for (let i = 0; i < m; ++i) bump(a, n)
  return a
}

function _newData(base?: number, samples?: number) {
  let returnArr: Array<Data> = []

  const matrix = d3.transpose(
    Array.from(
      { length: LAYERS },
      () => bumps(samples || SAMPLES, BUMPS, base)
      // bumps(SAMPLES + (base || 0), BUMPS, base)
    )
  )

  matrix.forEach((a, l) => {
    a.forEach((b, i) => {
      returnArr.push({
        index: i.toString(),
        layer: l.toString(),
        value: b,
      })
    })
  })

  return returnArr
}

function _randomize(
  stack: d3.Stack<any, Data, string>,
  y: d3.ScaleLinear<number, number>,
  base: number = 0,
  samples?: number
) {
  const data = _newData(base, samples)
  const layers = stack(data)
  y.domain([
    d3.min(layers, (l) => d3.min(l, (d) => d[0])) || 0,
    d3.max(layers, (l) => d3.max(l, (d) => d[1])) || 1,
  ])
  return layers
}

export default function backgroundData(
  height?: number,
  width?: number,
  colorPalette?: ColorPalette
) {
  if (!height || !width) return { randomizeLayers: () => null }
  const x = d3.scaleLinear([0, SAMPLES - 1], [0, width])
  const y = d3.scaleLinear([0, 1], [height, 0])

  const color = colorPalette ? bgColors[colorPalette] : d3.interpolateCool

  const fill = (i: number) => {
    /** @note the '3' here is to keep colors on the "lower" end of the scale (AKA blues, not greens) */
    const index = i / 3 / LAYERS
    if (colorPalette === 'inferno' || colorPalette === 'cubehelix')
      return color(Math.abs(index - 1))
    return color(index)
  }
  const randomFill = () => color(Math.random())

  const data = _newData()
  const keys = d3.union(data.map((d) => d.index))

  const stack = d3
    .stack<{ index: string; layer: string; value: number }>()
    .keys(keys)
    .offset(d3.stackOffsetSilhouette)
    // .offset(d3.stackOffsetWiggle)
    // .offset(d3.stackOffsetExpand)
    .order(d3.stackOrderNone)
    .value((d) => d.value)

  const area = d3
    .area()
    .x((_, i) => x(i))
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]))
    .curve(d3.curveCatmullRom.alpha(0.5))

  /** @TODO play with "base" and "samples" values more... */
  const randomizeLayers = () => _randomize(stack, y, height / 100, width / 25)

  return { area, fill, randomFill, randomizeLayers }
}
