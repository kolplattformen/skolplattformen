import * as eva from '@eva-design/eva'
import { render as rtlRender } from '@testing-library/react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React, { ReactElement } from 'react'
import { LanguageProvider } from '../context/language/languageContext'
import { translations } from './translation'

export const render = (
  ui: ReactElement<any, string>,
  { language = 'sv', ...options } = {}
) => {
  const AllTheProviders: React.FC = ({ children }) => {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <LanguageProvider
            cache={false}
            data={translations}
            initialLanguageCode={language}
          >
            {children}
          </LanguageProvider>
        </ApplicationProvider>
      </>
    )
  }

  return rtlRender(ui, { wrapper: AllTheProviders, ...options })
}
