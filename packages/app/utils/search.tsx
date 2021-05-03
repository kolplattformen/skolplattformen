import React, { useMemo, ReactNode } from 'react'
import { Text } from 'react-native'
import { useNews } from '@skolplattformen/api-hooks'
import { NewsItem } from '@skolplattformen/embedded-api'
import { Typography } from '../styles'
import { useChild } from '../components/childContext.component'

// https://github.com/facebook/react-native/issues/14796#issuecomment-389743259
global.Buffer = global.Buffer || require('buffer').Buffer
import { Searcher, MatchData } from 'fast-fuzzy'

const NUM_CHARS_AROUND_SEARCH_MATCH = 20

export function useNewsListSearchResults(
  searchQuery: string
): MatchData<NewsItem>[] {
  const child = useChild()
  const { data } = useNews(child)

  const searcher = useMemo(() => {
    return new Searcher(data, {
      threshold: 0.7,
      keySelector: (newsItem) => newsItem.body ?? '',
      returnMatchData: true,
    })
  }, [data])

  return useMemo(() => {
    if (!searchQuery) return []
    return searcher.search(searchQuery)
  }, [searchQuery, searcher])
}

function replaceNewLines(string: string): string {
  return string.replace(/\n/g, ' ')
}

export function renderSearchResultPreview(
  searchResult: MatchData<NewsItem>
): ReactNode {
  const start = searchResult.match.index
  const end = start + searchResult.match.length

  const beforeMatch = replaceNewLines(
    searchResult.original.slice(start - NUM_CHARS_AROUND_SEARCH_MATCH, start)
  )
  const match = replaceNewLines(searchResult.original.slice(start, end))
  const afterMatch = replaceNewLines(
    searchResult.original.slice(end, end + NUM_CHARS_AROUND_SEARCH_MATCH)
  )
  return (
    <>
      {!!beforeMatch && `...${beforeMatch}`}
      <Text style={Typography.fontWeight.bold}>{match}</Text>
      {!!afterMatch && `${afterMatch}...`}
    </>
  )
}
