import {useSMS} from '../SMS';
import {Linking, Platform} from 'react-native';
import {renderHook} from '@testing-library/react';

jest.mock('react-native', () => ({
  Linking: {openURL: jest.fn()},
  Platform: {OS: 'ios'},
}));

beforeEach(jest.clearAllMocks);

describe('#send', () => {
  test('sends a message on iOS', async () => {
    const {result} = renderHook(() => useSMS());

    await result.current.sendSMS('121212-1212');

    expect(Linking.openURL).toHaveBeenCalledWith(
      'sms:+46730121740&body=121212-1212',
    );
  });

  test('sends a message on Android', async () => {
    Platform.OS = 'android';

    const {result} = renderHook(() => useSMS());

    await result.current.sendSMS('121212-1212');

    expect(Linking.openURL).toHaveBeenCalledWith(
      'sms:+46730121740?body=121212-1212',
    );
  });
});
