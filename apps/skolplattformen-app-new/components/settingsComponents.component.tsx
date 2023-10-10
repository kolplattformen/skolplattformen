import {
  IconProps,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useLangRTL} from '../hooks/useLangRTL';
import {Sizing} from '../styles';
import {fontSize} from '../styles/typography';
import {CheckIcon, RightArrowIcon} from './icon.component';

export const SettingListItem = ({
  label,
  value,
  icon: Icon,
  onNavigate,
  onPress,
  children,
}: {
  label?: string;
  value?: string;
  icon?: (props: IconProps) => JSX.Element;
  onNavigate?: () => void;
  onPress?: () => void;
  children?: React.ReactNode;
}) => {
  const textHintColor = useTheme()['text-hint-color'];
  const styles = useStyleSheet(themedStyles);
  const isRTL = useLangRTL();

  const [isPressing, setIsPressing] = useState(false);

  return (
    <Pressable
      onPress={onNavigate || onPress}
      onPressIn={() => setIsPressing(true)}
      onPressOut={() => setIsPressing(false)}>
      <SettingListItemWrapper
        isPressing={(onNavigate || onPress) && isPressing}>
        {Icon && (
          <View style={styles.icon}>
            <Icon width="24" height="24" fill="#fff" />
          </View>
        )}
        <View style={styles.listItemText}>
          {label && (
            <Text
              style={[styles.listItemLabel, onPress && styles.listItemButton]}
              numberOfLines={1}>
              {label}
            </Text>
          )}
          {value && <Text style={styles.listItemValue}>{value}</Text>}
          {children}
        </View>
        {onNavigate && (
          <View
            style={[
              styles.arrow,
              {transform: [{rotateY: isRTL ? '180deg' : '0deg'}]},
            ]}>
            <RightArrowIcon width="24" height="24" fill={textHintColor} />
          </View>
        )}
      </SettingListItemWrapper>
    </Pressable>
  );
};

export const SettingListSeparator = () => {
  const styles = useStyleSheet(themedStyles);
  return <View style={styles.separator} />;
};

export const SettingListItemWrapper = ({
  children,
  isPressing = false,
}: {
  isPressing?: boolean;
  children?: React.ReactNode;
}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.listItem, isPressing ? styles.listItemPressed : null]}>
      {children}
    </View>
  );
};

export const SettingGroup = ({children}: {children?: React.ReactNode}) => {
  const styles = useStyleSheet(themedStyles);

  return <View style={styles.group}>{children}</View>;
};

export const SettingListItemSelectable = ({
  title,
  subTitle,
  isSelected,
  onPress,
}: {
  title: string;
  subTitle?: string;
  isSelected?: boolean;
  onPress: () => void;
}) => {
  const styles = useStyleSheet(themedStyles);
  const colors = useTheme();

  return (
    <TouchableOpacity style={styles.selectableButton} onPress={onPress}>
      <View>
        <Text style={styles.selectableButtonTitle}>{title}</Text>
        {subTitle && (
          <Text style={styles.selectableButtonSubtitle}>{subTitle}</Text>
        )}
      </View>
      {isSelected ? (
        <CheckIcon height={24} width={24} fill={colors['color-success-600']} />
      ) : null}
    </TouchableOpacity>
  );
};

const themedStyles = StyleService.create({
  group: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: 15,
    marginBottom: Sizing.t5,
    overflow: 'hidden',
  },
  listItem: {
    paddingHorizontal: Sizing.t4,
    paddingVertical: Sizing.t2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemButton: {
    color: 'color-tab-focused',
  },
  listItemPressed: {
    backgroundColor: 'color-separator',
  },
  listItemText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemLabel: {
    ...fontSize.sm,
  },
  listItemValue: {
    ...fontSize.xs,
    color: 'text-hint-color',
    flexShrink: 0,
  },
  separator: {
    height: 1,
    marginLeft: Sizing.t4,
    backgroundColor: 'color-separator',
  },
  icon: {
    backgroundColor: 'color-primary-500',
    borderRadius: 5,
    padding: 3,
    marginRight: Sizing.t3,
  },
  arrow: {flexShrink: 0},
  selectableButton: {
    paddingVertical: Sizing.t2,
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectableButtonTitle: {
    ...fontSize.base,
    textAlign: 'left',
  },
  selectableButtonSubtitle: {
    ...fontSize.sm,
    color: 'text-hint-color',
    textAlign: 'left',
  },
});
