import { useApi } from '@skolplattformen/api-hooks'
import React, { useEffect, useState } from 'react'
import { Image as ImageBase } from 'react-native'

export const Image = ({ src, style }) => {
  const { api } = useApi()
  const [headers, setHeaders] = useState()

  const getHeaders = async (url) => {
    // eslint-disable-next-line no-shadow
    const { headers } = await api.getSession(url)
    setHeaders(headers)
  }

  useEffect(() => {
    getHeaders(src)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return (
    <>
      {headers && (
        <ImageBase
          source={{
            uri: src,
            headers,
          }}
          style={style}
        />
      )}
    </>
  )
}
