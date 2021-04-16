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
    return []
  }

  const menuItemsFS = [
    {
      title: `Måndag - Vecka ${currentWeek.week}`,
      description: toMarkdown(currentWeek.mon) ,
    },
    {
      title: `Tisdag - Vecka ${currentWeek.week}`,
      description: toMarkdown(currentWeek.tue),
    },
    {
      title: `Onsdag - Vecka ${currentWeek.week}`,
      description: toMarkdown(currentWeek.wed),
    },
    {
      title: `Torsdag - Vecka ${currentWeek.week}`,
      description: toMarkdown(currentWeek.thu),
    },
    {
      title: `Fredag - Vecka ${currentWeek.week}`,
      description: toMarkdown(currentWeek.fri),
    },
  ]

  return menuItemsFS
}
