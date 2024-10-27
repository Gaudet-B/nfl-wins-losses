import { useCallback, useState } from 'react'

export default function useClientRect() {
  const [rect, setRect] = useState<DOMRect | null>(null)
  const ref = useCallback((node: Element | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, ref] as const
}
