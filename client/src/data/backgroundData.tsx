import * as d3 from 'd3'

export type Data = { index: string; layer: string; value: number }

// self-explanitory
const LAYERS = 10 as const // number of layers (was 'n', default was 20)
/** @TODO ACTUALLY THIS IS THE "WAVES" */
const SAMPLES = 50 as const // number of samples per layer (was 'm', deafult was 200)
/** @NOTE this is 'variation' in the "WAVES" I think? */
const BUMPS = 200 as const // number of bumps per layer (was 'k', default was 10)

/** @TODO play with these numbers more */
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
  console.log('samples', samples)
  const data = _newData(base, samples)
  const layers = stack(data)
  y.domain([
    d3.min(layers, (l) => d3.min(l, (d) => d[0])) || 0,
    d3.max(layers, (l) => d3.max(l, (d) => d[1])) || 1,
  ])
  return layers
}

export default function backgroundData(height?: number, width?: number) {
  if (!height || !width) return { randomizeLayers: () => null }
  console.log('height', height)
  console.log('width', width)
  const x = d3.scaleLinear([0, SAMPLES - 1], [0, width])
  const y = d3.scaleLinear([0, 1], [height, 0])
  const z = d3.interpolateCool

  /** @note the '3' here is to keep colors on the "lower" end of the scale (AKA blues, not greens) */
  const fill = (i: number) => z(i / 3 / LAYERS)
  const randomFill = () => z(Math.random())

  const data = _newData()
  const keys = d3.union(data.map((d) => d.index))
  // const keys = Array.from(new Set(data.map((d) => d.index)).values())

  // const group = d3.group(
  //   data,
  //   (d) => d.layer,
  //   (d) => d.index
  // )

  // const groupedArray = Array.from(group.entries()).map((g) => {
  //   const obj = {} as { [key: string]: number }
  //   for (const k of keys) {
  //     const val =
  //       g[1]
  //         .get(k)
  //         ?.map((v) => v.value)
  //         .reduce((a, b) => a + b) ?? 0
  //     obj[k] = val
  //   }
  //   return obj
  // })

  // const series = d3
  //   .stack()
  //   .keys(keys)
  //   .offset(d3.stackOffsetWiggle)
  //   .order(d3.stackOrderNone)(
  //   groupedArray
  // )

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

  // const area = d3
  //   .areaRadial()
  //   .x((_, i) => x(i))
  //   .y0((d) => y(d[0]))
  //   .y1((d) => y(d[1]))

  // function randomizeLayers() {
  //   /** @TODO need to remake array here??? */
  //   const layers = stack(DEFAULT_ARR)
  //   y.domain([
  //     d3.min(layers, (l) => d3.min(l, (d) => d[0])) || 0,
  //     d3.max(layers, (l) => d3.max(l, (d) => d[1])) || 1,
  //   ])
  //   return layers
  // }

  /** @TODO play with "base" value more... */
  const randomizeLayers = () => _randomize(stack, y, height / 100, width / 25)

  // _randomize(stack, y).map((layer, i) => {
  //   const values = layer.map((d) => {
  //     return [d[0], d[1]] as [number, number]
  //   })
  //   const path = area(values)
  //   // const path = area(layer)

  //   return (
  //     <g key={i}>
  //       <path
  //         d={path || undefined}
  //         fill={fill()}
  //         className="transition-transform delay-1000"
  //       />
  //     </g>
  //   )
  // })

  return { area, fill, randomFill, randomizeLayers }
}
