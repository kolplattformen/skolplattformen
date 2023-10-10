import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {
  Image,
  ImageStyle,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTranslation} from '../hooks/useTranslation';
import {Layout as LayoutStyle, Sizing, Typography} from '../styles';
import {fontSize} from '../styles/typography';
import {KeyboardAvoidingView} from '../ui/keyboardAvoidingView.component';
import {SafeAreaView} from '../ui/safeAreaView.component';
import {SettingsIcon} from './icon.component';
import {Login} from './login.component';
import {RootStackParamList} from './navigation.component';

const randomWord = (
  t: (scope: I18n.Scope, options?: I18n.TranslateOptions | undefined) => string,
) => {
  const words = t('auth.words');
  const keys = Object.keys(words);

  const randomIndex: number = Math.floor(Math.random() * keys.length);
  const argumentKey: string = keys[randomIndex];

  return words[argumentKey];
};

interface AuthProps {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

export const authRouteOptions = (): NativeStackNavigationOptions => {
  return {
    headerShown: false,
    animationTypeForReplace: 'push',
    animation: 'fade',
  };
};

export const Auth: React.FC<AuthProps> = ({navigation}) => {
  const styles = useStyleSheet(themeStyles);
  const colors = useTheme();
  const {t} = useTranslation();
  // const t = (key: string) => key;

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={LayoutStyle.flex.full}>
          <TouchableOpacity
            style={styles.settingsLink}
            onPress={() => navigation.navigate('Settings')}
            accessibilityHint={t(
              'auth.a11y_navigate_to_settings',
              // defaultValue: 'Navigerar till vyn för inställningar',
            )}
            accessibilityLabel={t(
              'auth.a11y_settings',
              //   {
              //   // defaultValue: 'Inställningar',
              // }
            )}>
            <View style={styles.language}>
              <SettingsIcon
                height={28}
                width={28}
                fill={colors['color-primary-500']}
              />
              <Text style={styles.languageText}>{t('general.settings')}</Text>
            </View>
          </TouchableOpacity>
          <KeyboardAvoidingView>
            <View style={styles.content}>
              <View style={styles.imageWrapper}>
                <Image
                  source={require('../assets/boys.png')}
                  style={styles.image as ImageStyle}
                  accessibilityHint={t(
                    'login.a11y_image_two_boys',
                    // {
                    //   defaultValue: 'Bild på två personer som kollar i mobilen',
                    // }
                  )}
                  resizeMode="contain"
                  accessibilityIgnoresInvertColors={false}
                />
              </View>
              <View style={styles.container}>
                <Text
                  category="h1"
                  style={styles.header}
                  adjustsFontSizeToFit
                  numberOfLines={2}>
                  Öppna skolplattformen
                </Text>
                <Login />
                <Text category="c2" style={styles.subtitle}>
                  {t('auth.subtitle', {
                    word: randomWord(t),
                  })}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const themeStyles = StyleService.create({
  container: {
    ...LayoutStyle.mainAxis.flexStart,
    ...LayoutStyle.crossAxis.flexEnd,
    padding: Sizing.t6,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    ...Sizing.aspectRatio(1.5, Sizing.Ratio['4:3']),
  },
  content: {
    ...LayoutStyle.flex.full,
  },
  header: {
    width: '100%',
    marginBottom: Sizing.t5,
    fontFamily: 'Poppins-Black',
    fontWeight: '900',
  },
  subtitle: {
    width: '100%',
    textAlign: 'center',
    ...Typography.fontSize.xs,
    marginTop: Sizing.t5,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizing.t3,
    paddingLeft: Sizing.t5,
  },
  languageText: {
    ...fontSize.sm,
    marginLeft: Sizing.t1,
  },
  settingsLink: {
    alignSelf: 'flex-start',
    zIndex: 1,
  },
});
