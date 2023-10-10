import * as eva from '@eva-design/eva';
import {render as rtlRender} from '@testing-library/react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React, {ReactElement} from 'react';
import {LanguageProvider} from '../context/language/languageContext';
import {translations} from './translation';
import {lightTheme} from '../design/themes';

type AllTheProvidersProps = {
  children: React.ReactNode;
};

export const render = (
  ui: ReactElement<any, string>,
  {language = 'sv', ...options} = {},
) => {
  const AllTheProviders: React.FC<AllTheProvidersProps> = ({children}) => {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={lightTheme}>
          <LanguageProvider
            cache={false}
            data={translations}
            initialLanguageCode={language}>
            {children}
          </LanguageProvider>
        </ApplicationProvider>
      </>
    );
  };

  return rtlRender(ui, {wrapper: AllTheProviders, ...options});
};
