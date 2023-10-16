import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook} from '@testing-library/react';
import AppStorage from '../../services/appStorage';
import useSettingsStorage, {settingsState} from '../useSettingsStorage';

beforeEach(() => {
  AsyncStorage.clear();
  // TODO: This is a bit ugly. Should probably fix that.
  settingsState.settings.theme = 'light';
});

const prefix = AppStorage.settingsStorageKeyPrefix;

test('use key prefix on set', async () => {
  const {result} = renderHook(() => useSettingsStorage('theme'));

  await act(async () => {
    const [, setValue] = result.current;
    setValue('dark');

    //? maybe not the best fix but it works!
    // await waitForNextUpdate();
    await new Promise(r => setTimeout(r, 1000));

    const data = await AsyncStorage.getItem(prefix + 'SETTINGS');
    const parsed = JSON.parse(data ?? '');
    expect(parsed.theme).toEqual('dark');
  });
});

test('update value', async () => {
  let data;
  let parsed;
  const {result} = renderHook(() => useSettingsStorage('theme'));

  const [initValue, setValue] = result.current;

  await act(async () => {
    expect(settingsState.settings.theme).toEqual('light');
    setValue('dark');

    await new Promise(r => setTimeout(r, 1000));
    // await waitForNextUpdate();

    // const [updateValue] = result.current;

    expect(initValue).toEqual('light');
    // expect(updateValue).toEqual('dark');

    data = await AsyncStorage.getItem(prefix + 'SETTINGS');
    parsed = JSON.parse(data ?? '');
    expect(parsed.theme).toEqual('dark');
    expect(settingsState.settings.theme).toEqual('dark');
  });
});
