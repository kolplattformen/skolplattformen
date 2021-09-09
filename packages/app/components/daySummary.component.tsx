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
      <View style={styles.part}>
        <View>
          <Text category="c2" style={styles.label}>
            {translate('schedule.start')}
          </Text>
          <Text category="h5">{lessons[0].timeStart.slice(0, 5)} - </Text>
        </View>
      </View>
      <View style={styles.part}>
        <View>
          <Text category="c2" style={styles.label}>
            {translate('schedule.end')}
          </Text>
          <Text category="h5">
            {lessons[lessons.length - 1].timeEnd.slice(0, 5)}
          </Text>
        </View>
      </View>
      <View style={styles.part}>
        <View>
          <Text category="c2" style={styles.label}>
            &nbsp;
          </Text>
          <Text category="s2">
            {gymBag
              ? ` 🤼‍♀️ ${translate('schedule.gymBag', {
                  defaultValue: 'Gympapåse',
                })}`
              : ''}
          </Text>
        </View>
      </View>
    </View>
  )
}

const themedStyles = StyleService.create({
  part: {
    flexDirection: 'column',
  },
  summary: {
    flexDirection: 'row',
  },
  label: {
    marginTop: 10,
  },
})
