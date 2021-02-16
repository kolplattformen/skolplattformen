import * as eva from '@eva-design/eva'
import { render as rtlRender } from '@testing-library/react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'

export const render = (children) => {
  return rtlRender(
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {children}
      </ApplicationProvider>
    </>
  )
}
