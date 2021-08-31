import React from 'react'
import { useTimetable } from '@skolplattformen/api-hooks'
import { Child } from '@skolplattformen/embedded-api'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import moment, { Moment } from 'moment'
import { View } from 'react-native'
import { LanguageService } from '../services/languageService'
import { translate } from '../utils/translation'

interface DaySummaryProps {
  child: Child
  date?: Moment
}

export const DaySummary = ({ child, date = moment() }: DaySummaryProps) => {
  const styles = useStyleSheet(themedStyles)
  const [year, week] = [moment().isoWeekYear(), moment().isoWeek()]
  const { data: weekLessons } = useTimetable(
    child,
    week,
    year,
    LanguageService.getLanguageCode()
  )

  const lessons = weekLessons
    .filter((lesson) => lesson.dayOfWeek === date.isoWeekday())
    .sort((a, b) => a.dateStart.localeCompare(b.dateStart))

  if (lessons.length <= 0) {
    return null
  }

  const gymBag = lessons.some((lesson) => lesson.code === 'IDH')

  return (
    <View style={styles.summary}>
      <Text category="s1">Skoldag </Text>
      <Text category="s1">
        {lessons[0].timeStart.slice(0, 5)}-
        {lessons[lessons.length - 1].timeEnd.slice(0, 5)}
        {gymBag
          ? ` (🤼‍♀️ ${translate('schedule.gymBag', {
              defaultValue: 'Gympapåse',
            })})`
          : ''}
      </Text>
    </View>
  )
}

const themedStyles = StyleService.create({
  summary: {
    flexDirection: 'row',
  },
})
