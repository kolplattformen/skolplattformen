import i18n from 'i18n-js';
import {translate, translations} from '../translation';

describe('translation in swedish', () => {
  beforeAll(() => {
    i18n.translations = {sv: translations.sv};
    i18n.locale = 'sv';
  });
  it('should be able to translate the word settings', () => {
    expect(translate('general.settings')).toEqual('Inställningar');
  });
});

describe('translation in english', () => {
  beforeAll(() => {
    i18n.translations = {en: translations.en};
    i18n.locale = 'en';
  });
  it('should be able to translate the word settings', () => {
    expect(translate('general.settings')).toEqual('Settings');
  });
});
