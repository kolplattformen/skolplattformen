import {Guardian} from '../libs/api/lib';

export const studentName = (name?: string) => name?.replace(/\s?\(\w+\)$/, '');

export const sortByFirstName = <T extends {firstname: string}>(
  data: T[],
): T[] => data.sort((a, b) => a.firstname.localeCompare(b.firstname));

export const guardians = (data: Guardian[]) =>
  sortByFirstName(data).map(fullName).join(', ');

export const fullName = (person: Guardian) =>
  `${person.firstname} ${person.lastname}`;

export const initials = (name?: string) => {
  return name?.slice(0, 2);
};
