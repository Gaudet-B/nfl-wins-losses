import { PropsWithChildren } from 'react'

export function ButtonContainer({ children }: PropsWithChildren) {
  return <div className="z-0 -translate-x-24 -translate-y-10">{children}</div>
}

export function ButtonImg() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <text x="-50" y="50" font-size="36" text-anchor="middle" fill="black">
            walk through timeline
          </text> */}
      <g className="">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="black"
          stroke-width="5"
          fill="white"
        />
        <polygon
          points="40,30 70,50 40,70"
          fill="none"
          stroke="black"
          strokeWidth={5}
        />
      </g>
    </svg>
  )
}

export function ButtonText() {
  return <span className="text-xl">walk through timeline</span>
}
