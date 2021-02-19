import { Text } from '@ui-kitten/components'
import React from 'react'
import { Linking } from 'react-native'
import MarkdownBase from 'react-native-markdown-display'
import { Image } from './image.component'

const rules = {
  image: (node) => {
    const { src } = node.attributes
    const url = src.startsWith('/') ? `https://elevstockholm.sharepoint.com${src}` : src;
    return (
      <Image
        key={src}
        src={url}
        style={{ width: '100%', minHeight: 300 }}
      />
    )
  },
  link: (node, children, _parent, styles) => {
    return (
      <Text
        key={node.key}
        style={styles.link}
        onPress={() => Linking.openURL(node.attributes.href)}
      >
        {children}
      </Text>
    )
  },
}

export const Markdown = ({ style, children }) => {
  return (
    <MarkdownBase rules={rules} style={style}>
      {children}
    </MarkdownBase>
  )
}
