// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import messages from '../content/locale'

function render(ui, { locale = 'sv', ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <IntlProvider locale={locale} messages={messages[locale]}>{children}</IntlProvider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
