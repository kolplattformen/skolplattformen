import * as eva from '@eva-design/eva'
import { render as rtlRender } from '@testing-library/react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { setI18nConfig } from './translation'

export const render = (children) => {
  setI18nConfig()

  return rtlRender(
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {children}
      </ApplicationProvider>
    </>
  )
}
