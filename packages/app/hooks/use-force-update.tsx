import { useCallback, useState } from 'react'

export default function useForceUpdate(): () => void {
  const [, dispatch] = useState<{}>(Object.create(null))

  const memoizedDispatch = useCallback((): void => {
    dispatch(Object.create(null))
  }, [dispatch])
  return memoizedDispatch
}
