import { etjanst } from './etjanst'
import { toMarkdown } from '../parseHtml'
import { MenuItem, MenuList } from '../types'

export const menuItem = ({ title, description }: any): MenuItem => ({
  title,
  description: toMarkdown(description),
})

export const menu = (data: any): MenuItem[] => etjanst(data).map(menuItem)

export const menuList = (data: any): MenuItem[] => {
  const etjanstData = etjanst(data)
  const menuFS = etjanstData as MenuList

  const currentWeek = menuFS.menus.find(
    (item) => menuFS.selectedWeek === Number.parseInt(item.week, 10)
  )

  if (!currentWeek) {
    return [
      {
        title: 'Måndag - Vecka ?',
        description: 'Hittade ingen meny',
      },
    ]
  }

  const menuItemsFS = [
    {
      title: `Måndag - Vecka ${currentWeek.week}`,
      description: currentWeek.mon,
    },
    {
      title: `Tisdag - Vecka ${currentWeek.week}`,
      description: currentWeek.tue,
    },
    {
      title: `Onsdag - Vecka ${currentWeek.week}`,
      description: currentWeek.wed,
    },
    {
      title: `Torsdag - Vecka ${currentWeek.week}`,
      description: currentWeek.thu,
    },
    {
      title: `Fredag - Vecka ${currentWeek.week}`,
      description: currentWeek.fri,
    },
  ]

  return menuItemsFS
}
