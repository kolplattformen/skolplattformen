import { Teacher, Child } from '@skolplattformen/api';
import { children } from './children'

export const teachers = (child: Child): Teacher[] => teacherData.get(child.id) ?? []

const [child1,child2] = children()

const teacherData = new Map<string, Teacher[]>([
  [  
    child1.id, [
      {
        id: 15662220,
        firstname: "Cecilia",
        sisId: null,
        lastname: "Test",
        email: "cecilia.test@edu.stockholm.se",
        phoneWork: null,
        active: true,
        status: " S",
        timeTableAbbreviation: 'CTE',
      },
      {
        id: 15662221,
        firstname: "Anna",
        lastname: "Test",
        sisId: null,
        email: "anna.test@edu.stockholm.se",
        phoneWork: '08000000',
        active: true,
        status: " GR",
        timeTableAbbreviation: 'ATE',
      },
      {
        id: 15662221,
        firstname: "Greta",
        lastname: "Test",
        sisId: null,
        email: null,
        phoneWork: '08000001',
        active: true,
        status: " F",
        timeTableAbbreviation: 'GTE',
      },
  ]],
[
  child2.id, [
    {
      id: 15662220,
      firstname: "Cecilia",
      sisId: null,
      lastname: "Test",
      email: "cecilia.test@edu.stockholm.se",
      phoneWork: null,
      active: true,
      status: " S",
      timeTableAbbreviation: 'CTE',
    },
    {
      id: 15662221,
      firstname: "Anna",
      lastname: "Test",
      sisId: null,
      email: "anna.test@edu.stockholm.se",
      phoneWork: '08000000',
      active: true,
      status: " GR",
      timeTableAbbreviation: 'ATE',
    },
    {
      id: 15662221,
      firstname: "Greta",
      lastname: "Test",
      sisId: null,
      email: null,
      phoneWork: '08000001',
      active: true,
      status: " F",
      timeTableAbbreviation: 'GTE',
    },
]],
])
