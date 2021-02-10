import React from 'react'
import { Image as ImageBase } from 'react-native'
import { useApi } from '@skolplattformen/api-hooks'

export const Image = ({ key, src, style }) => {
  const { api } = useApi()
  const cookie = api.getSessionCookie()
  return (
    <ImageBase
      key={key}
      source={{
        uri: src,
        headers: { cookie },
      }}
      style={style}
    />
  )
}
