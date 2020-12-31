import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useAsyncStorage } from 'use-async-storage'
import { api, fillChild } from '../lib/backend'
import { ChildrenView } from './childrenView.component'

export const ChildrenLoader = ({ navigation }) => {
  const [cache, setCache] = useAsyncStorage('@children', [])
  const [childList, setChildList] = useState(cache)
  const [cookie] = useAsyncStorage('@cookie')
  useEffect(() => {
    const load = async () => {
      try {
        const newChildList = (childList?.length && childList) || await api.getChildren()
        if (!newChildList?.length) {
          console.log('no children found', await api.getChildren())
          return navigation.navigate('Login', { error: 'Hittar inga barn för det personnumret' })
        }

        await (Promise.all(newChildList.map(async (child, i) => {
          let result
          let updatedChild = { ...child, news: [], loading: true, updated: null } // keep a reference to the latest updated information so we don't patch an old object
          const iter = fillChild(child)
          while (!result?.done) {
            result = await iter.next() // get updated values for every updated property
            const updated = await result.value
            newChildList[i] = updatedChild = { ...updatedChild, ...updated, loading: !result.done, updated: moment() }
            setChildList(newChildList)
          }
          console.log('done', child.name)
        })))
        await setCache(newChildList)
        setChildList(newChildList)
        console.log('done loading children')
      } catch (err) {
        console.log('err', err)
        navigation.navigate('Login', { error: 'Fel uppstod, försök igen' })
      }
    }
    if (cookie) load()
  }, [cookie])
  return <ChildrenView navigation={navigation} childList={childList} />
}
