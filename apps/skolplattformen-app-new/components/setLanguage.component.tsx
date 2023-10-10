import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {
  Button,
  ButtonGroup,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLanguage} from '../hooks/useLanguage';
import {isRTL, LanguageService} from '../services/languageService';
import {Layout as LayoutStyle, Sizing} from '../styles';
import {languages, translate} from '../utils/translation';
import {RootStackParamList} from './navigation.component';
import {
  SettingGroup,
  SettingListItemSelectable,
} from './settingsComponents.component';

export const setLanguageRouteOptions = (): NativeStackNavigationOptions => ({
  title: translate('language.changeLanguage'),
});

export const SetLanguage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const currentLanguage = LanguageService.getLanguageCode();

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(currentLanguage);
  const {setLanguageCode} = useLanguage();

  const shouldRestart = () => {
    return isRTL(selectedLanguage) || isRTL(currentLanguage);
  };

  const saveLanguage = () => {
    setLanguageCode({languageCode: selectedLanguage});

    // Checks if rtl mode has changed, then we need to restart the app
    if (shouldRestart()) {
      RNRestart.Restart();
    } else {
      goBack();
    }
  };

  const isSelected = (lang: string): boolean => {
    return selectedLanguage === lang;
  };

  const goBack = () => {
    // Need to reset the view so it updates the language
    navigation.navigate('Settings', {rand: Math.random()});
  };

  const activeLanguages = languages.filter(language => language.active);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SettingGroup>
          <View style={styles.languageList}>
            {activeLanguages.map(language => (
              <SettingListItemSelectable
                key={language.langCode}
                onPress={() => setSelectedLanguage(language.langCode)}
                title={language.languageLocalName}
                subTitle={language.languageName}
                isSelected={isSelected(language.langCode)}
              />
            ))}
          </View>
        </SettingGroup>
      </ScrollView>
      <ButtonGroup style={styles.buttonGroup}>
        <Button
          onPress={() => saveLanguage()}
          appearance="ghost"
          status="primary"
          disabled={currentLanguage === selectedLanguage}
          style={styles.button}
          size="medium">
          {translate('language.changeLanguageButton')}
        </Button>
      </ButtonGroup>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  languageList: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginTop: 8,
    paddingHorizontal: Sizing.t4,
  },
  icon: {
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    padding: Sizing.t4,
  },
  buttonGroup: {
    minHeight: 45,
    marginTop: 20,
    marginHorizontal: Sizing.t5,
  },
  button: {...LayoutStyle.flex.full},
});
