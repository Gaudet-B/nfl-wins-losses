import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import debounce from 'lodash.debounce'
import LargeButton from '../components/LargeButton'
import {
  COLOR_PALETTE_KEYS,
  ColorPalette,
} from '../components/AnimatedBackground'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const routes = ['/barplot', '/animated-background'] as const

function Index() {
  const [colorPalette, setColorPalette] = useState<ColorPalette>('inferno')
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = debounce(() => {
    setIsHovered(true)
  }, 500)

  const handleColorChange = debounce(() => {
    if (!isHovered) return
    const randomIndex = Math.floor(Math.random() * COLOR_PALETTE_KEYS.length)
    setColorPalette(COLOR_PALETTE_KEYS[randomIndex])
  }, 2000)

  return (
    <div className="w-full p-6 flex gap-6 justify-center">
      {routes.map((route) => (
        <div
          onMouseOver={
            route === '/animated-background' ? handleHover : undefined
          }
          onMouseOut={
            route === '/animated-background' ? handleColorChange : undefined
          }
        >
          <LargeButton key={route} colorPalette={colorPalette} route={route} />
        </div>
      ))}
    </div>
  )
}
