import React, { useEffect, useState } from 'react'
import { StyleSheet, AppState } from 'react-native'
import { BlurView } from '@react-native-community/blur'
/**
 * Blurs everything above FullBlurView component
 * @param {boolean} isBlurredDefault
 * @returns { isBlurred, setIsBlurred, FullBlurView }
 */
export const useBlurView = (isBlurredDefault = false) => {
  const [isBlurred, setIsBlurred] = useState(isBlurredDefault)

  const FullBlurView = isBlurred && (
    <BlurView
      style={styles.blur}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />
  )
  return { isBlurred, setIsBlurred, FullBlurView }
}

export const useBackgroundBlur = () => {
  const { setIsBlurred, FullBlurView } = useBlurView()

  useEffect(() => {
    const handleAppStateChange = (nextState) => {
      setIsBlurred(nextState === 'inactive')
    }

    AppState.addEventListener('change', handleAppStateChange)
    return () => AppState.removeEventListener('change', handleAppStateChange)
  }, [setIsBlurred])

  return FullBlurView
}

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
