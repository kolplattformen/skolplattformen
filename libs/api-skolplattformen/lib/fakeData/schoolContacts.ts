import { SchoolContact, Child } from '@skolplattformen/api';
import { children } from './children'

export const schoolContacts = (child: Child): SchoolContact[] => schoolContactData.get(child.id) ?? []

const [child1,child2] = children()

const schoolContactData = new Map<string, SchoolContact[]>([
  [
    child1.id, [
      {
        title: "Expedition",
        name: null,
        phone: "508 000 00",
        email: "",
        schoolName: "Vallaskolan",
        className: null,
      },
      {
        title: "Rektor",
        name: "Alvar Sträng",
        phone: "08-50800001",
        email: "alvar.strang@edu.stockholm.se",
        schoolName: null,
        className: null,
      }
  ]],
  [
    child2.id, [
    {
      title: "Expedition",
      name: null,
      phone: "508 000 00",
      email: "",
      schoolName: "Vallaskolan",
      className: null,
    },
    {
      title: "Rektor",
      name: "Alvar Sträng",
      phone: "08-50800001",
      email: "alvar.strang@edu.stockholm.se",
      schoolName: null,
      className: null,
    }
]]
])
