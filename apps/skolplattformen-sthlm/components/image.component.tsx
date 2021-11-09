import { useApi } from '@skolplattformen/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Image as ImageBase,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  useWindowDimensions,
  View,
} from 'react-native'

interface ImageProps {
  src: string
  style: StyleProp<ImageStyle>
  /**
   * Width of component. Defaults to window width
   * Used to automatically calculate width
   */
  componentWidth?: number
  accessibilityIgnoresInvertColors: boolean
  resizeMode?: ImageResizeMode
  width?: number
  height?: number
}

export const Image = ({
  src,
  style,
  componentWidth = 0,
  accessibilityIgnoresInvertColors,
  resizeMode = 'contain',
}: ImageProps) => {
  const { api } = useApi()
  const [headers, setHeaders] = useState()
  const { width: windowWidth } = useWindowDimensions()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const prefetchImageInformation = useCallback(
    async (url: string) => {
      const { headers: newHeaders } = await api.getSession(url)

      console.log('[IMAGE] Getting image dimensions with headers', newHeaders)

      ImageBase.getSizeWithHeaders(
        url,
        newHeaders,
        (w, h) => {
          console.log('[IMAGE] Received image dimensions', { w, h })
          setDimensions({ width: w, height: h })
          setHeaders(newHeaders)
        },
        (error) => {
          console.error('[Image] Failed to get image dimensions', error)
        }
      )
    },
    [api]
  )

  useEffect(() => {
    prefetchImageInformation(src)
  }, [prefetchImageInformation, src])

  const compWidth = componentWidth || windowWidth

  const scale = compWidth / dimensions.width
  const scaledWidth = Math.round(dimensions.width * scale)
  const scaledHeight = Math.round(dimensions.height * scale)

  const imageSource =
    resizeMode === 'cover'
      ? { uri: src, headers }
      : { uri: src, headers, height: scaledHeight, width: scaledWidth }

  return headers && scaledWidth && scaledHeight ? (
    <ImageBase
      accessibilityIgnoresInvertColors={accessibilityIgnoresInvertColors}
      source={imageSource}
      resizeMode={resizeMode}
      style={style}
    />
  ) : (
    <View style={style} />
  )
}
