import {useCallback} from 'react';
import {proxy, subscribe, useSnapshot} from 'valtio';
import AppStorage from '../services/appStorage';

export type ChildPersonalNumbers = Record<string, string>;

export const settingsState = proxy({
  hydrated: false,
  settings: {
    loginMethodId: 'thisdevice' as
      | 'thisdevice'
      | 'otherdevice'
      | 'testuser'
      | 'freja',
    usingSystemTheme: true,
    theme: 'light',
    cachedPersonalIdentityNumber: '',
    currentSchoolPlatform: 'stockholm-skolplattformen' as
      | 'stockholm-skolplattformen'
      | 'goteborg-hjarntorget',
    childPersonalIdentityNumber: {} as ChildPersonalNumbers,
  },
});

export type Settings = (typeof settingsState)['settings'];

const SETTINGS_STORAGE_KEY = 'SETTINGS';

subscribe(settingsState, () => {
  AppStorage.setSetting(SETTINGS_STORAGE_KEY, settingsState.settings);
});

export const initializeSettingsState = async () => {
  const settings = await AppStorage.getSetting<any>(SETTINGS_STORAGE_KEY);

  settingsState.hydrated = true;

  if (settings) {
    settingsState.settings = {
      ...settingsState.settings,
      ...settings,
    };
  }
};

export default function useSettingsStorage<
  TKey extends keyof Settings,
  TValue = Settings[TKey],
>(key: TKey) {
  const {settings} = useSnapshot(settingsState);

  const setter = useCallback(
    (value: TValue) => {
      settingsState.settings[key] = value as any;
    },
    [key],
  );

  return [settings[key], setter] as const;
}
