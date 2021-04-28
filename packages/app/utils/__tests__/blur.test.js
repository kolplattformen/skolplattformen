import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'
import { useBlurView, useBackgroundBlur } from '../blur'
import { AppState } from 'react-native'

jest.mock('react-native/Libraries/AppState/AppState')

describe('useBlurView tests', () => {
  const setup = (defaultValue = false) => {
    const { result } = renderHook(() => useBlurView(defaultValue))
    return result
  }

  test.each([
    [undefined, false],
    [true, true],
    [false, false],
  ])(
    'initial value: %s should blur by default: %s',
    (initialBlurred, shouldBlur) => {
      const { isBlurred, FullBlurView } = setup(initialBlurred).current
      expect(!!isBlurred).toBe(shouldBlur)
      expect(!!FullBlurView).toBe(shouldBlur)
    }
  )

  test('should be able to change blurred', () => {
    const result = setup()

    act(() => result.current.setIsBlurred(true))

    expect(result.current.isBlurred).toBeTruthy()
    expect(result.current.FullBlurView).toBeTruthy()

    act(() => result.current.setIsBlurred(false))

    expect(result.current.isBlurred).toBeFalsy()
    expect(result.current.FullBlurView).toBeFalsy()
  })
})

describe('useBackgroundBlur tests', () => {
  const setup = (setCallbackFn) => {
    AppState.addEventListener.mockImplementation((event, callback) => {
      if (event === 'change') {
        setCallbackFn(callback)
      }
    })
    AppState.removeEventListener.mockImplementation(jest.fn())
  }

  test('should not blur by default', () => {
    const { result } = renderHook(() => useBackgroundBlur())
    expect(result.current).toBeFalsy()
  })

  test.each([
    ['active', false],
    ['background', false],
    ['inactive', true],
  ])('AppState %s should blur: %s', (appState, shouldBlur) => {
    let appStateChangeCallback = null
    setup((callback) => (appStateChangeCallback = callback))
    const { result } = renderHook(() => useBackgroundBlur())

    act(() => appStateChangeCallback(appState))

    expect(!!result.current).toBe(shouldBlur)
  })
})
