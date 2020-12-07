import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as material from '@eva-design/material';
import customization from './design/customization.json';
import children from './output.json';

import {ChildList} from './components/childList.component'

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...material} theme={{...material.dark, customization}}>
      <ChildList children={children} />
    </ApplicationProvider>
  </>
)