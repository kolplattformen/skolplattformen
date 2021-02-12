import React from 'react'
import MarkdownBase from 'react-native-markdown-display'
import { Image } from './image.component'
import { Text } from '@ui-kitten/components'
import { Linking } from 'react-native'

const rules = {
  image: (
    node,
    children,
    parent,
    styles,
    allowedImageHandlers,
    defaultImageHandler,
  ) => {
    const { src } = node.attributes
    return (
      <Image
        key={src}
        src={`https://elevstockholm.sharepoint.com${src}`}
        style={{ width: '100%', minHeight: 300 }}
      />
    )
  },
  link: (node, children, parent, styles) => {
    const url = node.attributes.href
    return (
      <Text
        key={node.key}
        style={styles.link}
        onPress={() => Linking.openURL(node.attributes.href)}>
        {children}
      </Text>
    )
  },
}

export const Markdown = ({ style, children }) => {
  return (
    <MarkdownBase
      rules={rules}
      style={style}>
      {children}
    </MarkdownBase>
  )
}
