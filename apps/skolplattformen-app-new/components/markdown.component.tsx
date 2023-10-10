import {Text} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, Linking, StyleSheet} from 'react-native';
import MarkdownBase, {
  RenderRules,
} from '@ronradtke/react-native-markdown-display';
import {Sizing} from '../styles';
import {Image} from './image.component';

interface MarkdownProps {
  children: React.ReactNode;
  style?: StyleSheet.NamedStyles<any>;
}

const rules: RenderRules = {
  image: node => {
    const {src} = node.attributes;
    const url = src.startsWith('/')
      ? `https://elevstockholm.sharepoint.com${src}`
      : src;
    return (
      <Image
        accessibilityIgnoresInvertColors
        key={src}
        src={url}
        // TODO: Sizing.t5 should not be hardcoded here...
        //       Maybe measure the width from inside the component instead?
        componentWidth={Dimensions.get('window').width - Sizing.t5 * 2}
        style={styles.markdownImage}
      />
    );
  },
  link: (node, children, _parent, styles) => {
    if (children) {
      return (
        <Text
          key={node.key}
          style={styles.link}
          onPress={() => Linking.openURL(node.attributes.href)}>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </Text>
      );
    }
    return null;
  },
};

export const Markdown = ({style, children}: MarkdownProps) => {
  return (
    <MarkdownBase rules={rules} style={style}>
      {children}
    </MarkdownBase>
  );
};

const styles = StyleSheet.create({
  markdownImage: {width: '100%', borderRadius: 15},
});
