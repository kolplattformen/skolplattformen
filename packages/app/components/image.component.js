import { useApi } from '@skolplattformen/api-hooks'
import React from 'react'
import { Image as ImageBase } from 'react-native'

export const Image = ({ src, style }) => {
  const { api } = useApi()
  const cookie = api.getSessionCookie()

  return (
    <ImageBase
      source={{
        uri: src,
        headers: { cookie },
      }}
      style={style}
    />
  )
}
