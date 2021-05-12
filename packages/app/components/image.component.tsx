import { useApi } from '@skolplattformen/api-hooks'
import React, { useEffect, useState } from 'react'
import { Image as ImageBase, ImageStyle, StyleProp } from 'react-native'

interface ImageProps {
  src: string
  style: StyleProp<ImageStyle>
  accessibilityIgnoresInvertColors: boolean
}

export const Image = ({
  src,
  style,
  accessibilityIgnoresInvertColors,
}: ImageProps) => {
  const { api } = useApi()
  const [headers, setHeaders] = useState()

  const getHeaders = async (url: string) => {
    const { headers: newHeaders } = await api.getSession(url)
    setHeaders(newHeaders)
  }

  useEffect(() => {
    getHeaders(src)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return headers ? (
    <ImageBase
      accessibilityIgnoresInvertColors={accessibilityIgnoresInvertColors}
      source={{
        uri: src,
        headers,
      }}
      style={style}
    />
  ) : null
}
