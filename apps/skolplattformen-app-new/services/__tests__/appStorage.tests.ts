import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../libs/api/lib';
import AppStorage from '../appStorage';

beforeEach(() => {
  jest.clearAllMocks();
  AsyncStorage.clear();
});

const prefix = AppStorage.settingsStorageKeyPrefix;
const temp = AppStorage.tempStorageKeyPrefix;

test('Sets setting with prefix in storage', async () => {
  await AppStorage.setSetting('key', 'value');

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    prefix + 'key',
    JSON.stringify('value'),
  );
});

test('Can get setting from storage', async () => {
  await AppStorage.setSetting('key', 'value');
  const result = await AppStorage.getSetting<string>('key');

  expect(result).toEqual('value');
  expect(AsyncStorage.getItem).toHaveBeenCalledWith(prefix + 'key');
});

test('Clear only settings', async () => {
  const user: User = {personalNumber: '201701012393'};
  await AppStorage.setSetting('key', 'value');
  await AppStorage.setSetting('key2', 'value2');
  await AppStorage.setSetting('key3', 'value3');

  await AppStorage.setTemporaryItem('nonSetting', 'nonSettingValue');
  await AppStorage.setPersonalData(user, 'personalData', 'personal id value');

  await AppStorage.clearAllSettings();

  const allKeys = await AsyncStorage.getAllKeys();

  expect(allKeys).toHaveLength(2);
  expect(allKeys[0]).toEqual(temp + 'nonSetting');
  expect(allKeys[1]).toEqual(user.personalNumber + '_' + 'personalData');
});

test('Clear temporary items', async () => {
  const user: User = {personalNumber: '201701012393'};
  await AppStorage.setSetting('settingKey1', 'settingValue1');
  await AppStorage.setSetting('settingKey2', 'settingValue2');
  await AppStorage.setSetting('settingKey3', 'settingValue3');
  await AppStorage.setTemporaryItem('tempKey1', 'tempValue1');
  await AppStorage.setTemporaryItem('tempKey2', 'tempValue2');
  await AppStorage.setTemporaryItem('tempKey3', 'tempValue3');
  await AppStorage.setPersonalData(user, 'personalData', 'personal id value');

  await AppStorage.clearTemporaryItems();

  const allKeys = await AsyncStorage.getAllKeys();

  expect(allKeys).toHaveLength(4);
  expect(allKeys[0]).toEqual(prefix + 'settingKey1');
  expect(allKeys[3]).toEqual(user.personalNumber + '_' + 'personalData');
});

test('Store temporary string in AsyncStorage', async () => {
  await AppStorage.setTemporaryItem('tempkey', 'tempvalue');

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    temp + 'tempkey',
    JSON.stringify('tempvalue'),
  );
});

test('Get temporary string from AsyncStorage', async () => {
  await AppStorage.getTemporaryItem('tempkey');

  expect(AsyncStorage.getItem).toHaveBeenCalledWith(temp + 'tempkey');
});

test('Store temporary object in AsyncStorage', async () => {
  const obj = {a: 'foo', b: 5};
  await AppStorage.setTemporaryItem('tempkey', obj);

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    temp + 'tempkey',
    JSON.stringify(obj),
  );
});

test('Get temporary object from AsyncStorage', async () => {
  await AppStorage.getTemporaryItem('tempkey');

  expect(AsyncStorage.getItem).toHaveBeenCalledWith(temp + 'tempkey');
});

test('Set personal data with personal number prefix', async () => {
  const obj = {a: 'gdpr', b: 'is fun'};
  const user: User = {personalNumber: '201701012393'};
  await AppStorage.setPersonalData(user, 'key', obj);

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    user.personalNumber + '_' + 'key',
    JSON.stringify(obj),
  );
});

test('Set personal data does nothing if personal number missing', async () => {
  const obj = {a: 'gdpr', b: 'is fun'};
  const user: User = {personalNumber: ''};
  await AppStorage.setPersonalData(user, 'key', obj);

  expect(AsyncStorage.setItem).not.toHaveBeenCalled();
});

test('Get personal data gets data if personal number matches', async () => {
  const data = 'personal data';
  const user: User = {personalNumber: '201701012393'};

  await AppStorage.setPersonalData(user, 'key', data);
  const storedData = await AppStorage.getPersonalData(user, 'key');

  expect(storedData).toEqual(data);
});

test('Get no personal data gets data if personal number does not match', async () => {
  const data = 'personal data';
  const user: User = {personalNumber: '201701012393'};
  const anotherAser: User = {personalNumber: '202112312380'};

  await AppStorage.setPersonalData(user, 'key', data);
  const storedData = await AppStorage.getPersonalData(anotherAser, 'key');

  expect(user).not.toEqual(anotherAser);
  expect(storedData).toEqual(null);
});

test('Clear only PersonalData', async () => {
  await AppStorage.setSetting('settingKey1', 'settingValue1');
  await AppStorage.setTemporaryItem('tempKey1', 'tempValue1');

  const data = 'personal data';
  const user: User = {personalNumber: '201701012393'};
  await AppStorage.setPersonalData(user, 'key', data);

  await AppStorage.clearPersonalData(user);

  const allKeys = await AsyncStorage.getAllKeys();
  expect(allKeys).toHaveLength(2);
  expect(allKeys).not.toContain(user.personalNumber + '_key');
});

test('Clear PersonalData does nothing if personalnumber is empty', async () => {
  const user: User = {personalNumber: ''};
  await AppStorage.clearPersonalData(user);

  expect(AsyncStorage.multiRemove).not.toHaveBeenCalled();
});
