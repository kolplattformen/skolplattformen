import { Text } from '@ui-kitten/components'
import React from 'react'
import { Linking, StyleSheet } from 'react-native'
import MarkdownBase, { RenderRules } from 'react-native-markdown-display'
import { Image } from './image.component'

interface MarkdownProps {
  children: React.ReactNode
  style?: StyleSheet.NamedStyles<any>
}

const rules: RenderRules = {
  image: node => {
    const { src } = node.attributes
    const url = src.startsWith('/')
      ? `https://elevstockholm.sharepoint.com${src}`
      : src
    return <Image key={src} src={url} style={styles.markdownImage} />
  },
  link: (node, children, _parent, styles) => {
    if (typeof children === 'string') {
      return (
        <Text
          key={node.key}
          style={styles.link}
          onPress={() => Linking.openURL(node.attributes.href)}
        >
          {children}
        </Text>
      )
    }

    return null
  },
}

export const Markdown = ({ style, children }: MarkdownProps) => {
  return (
    <MarkdownBase rules={rules} style={style}>
      {children}
    </MarkdownBase>
  )
}

const styles = StyleSheet.create({
  markdownImage: { width: '100%', minHeight: 300 },
})
