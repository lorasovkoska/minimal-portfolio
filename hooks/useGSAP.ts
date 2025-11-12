import { useEffect, useLayoutEffect, useRef } from 'react'

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useGSAP = (callback: () => void | (() => void), deps: any[] = []) => {
  const cleanupRef = useRef<(() => void) | void>()

  useIsomorphicLayoutEffect(() => {
    cleanupRef.current = callback()

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current()
      }
    }
  }, deps)
}

