// test-utils.js
import React, { ReactNode } from 'react'
import { render as rtlRender, RenderResult } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import messages, { Languages } from '../content/locale'

function render(
  ui: React.ReactElement,
  { locale = 'sv' as Languages, ...renderOptions } = {}
): RenderResult {
  function Wrapper({ children }: { children?: ReactNode }) {
    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
