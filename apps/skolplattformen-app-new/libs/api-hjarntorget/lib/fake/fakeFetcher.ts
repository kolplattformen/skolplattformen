import {Fetcher, Response} from '../../../api/lib';
import {calendars, calendar_14241345} from './calendars';
import {currentUser} from './current-user';
import {events} from './events';
import {
  lessons_123456_goteborgsstad,
  lessons_133700_goteborgsstad,
  lessons_133737_goteborgsstad,
} from './lessons';
import {myChildren} from './my-children';
import {wallEvents} from './wall-events';
import {information} from './information';
import {genericRolesInEvent} from './roles-in-event';
import {
  eventRoleMembers14,
  eventRoleMembers18,
  eventRoleMembers21,
  eventRoleMembers24,
} from './event-role-members';

const fetchMappings: {[name: string]: () => Response} = {
  'current-user': currentUser,
  events: events,
  'my-children': myChildren,
  'wall-events': wallEvents,
  'lessons-133700_goteborgsstad': lessons_133700_goteborgsstad,
  'lessons-133737_goteborgsstad': lessons_133737_goteborgsstad,
  'lessons-123456_goteborgsstad': lessons_123456_goteborgsstad,
  info: information,
  'roles-in-event-14': genericRolesInEvent,
  'roles-in-event-18': genericRolesInEvent,
  'roles-in-event-21': genericRolesInEvent,
  'roles-in-event-24': genericRolesInEvent,
  'event-role-members-14-821': eventRoleMembers14,
  'event-role-members-18-821': eventRoleMembers18,
  'event-role-members-21-821': eventRoleMembers21,
  'event-role-members-24-821': eventRoleMembers24,
  calendars: calendars,
  'calendar-14241345': calendar_14241345,
};

export const fakeFetcher: Fetcher = (
  name: string,
  url: string,
  init?: any,
): Promise<Response> => {
  const responder =
    fetchMappings[name] ??
    (() => {
      throw new Error('Request not faked for name: ' + name);
    });
  return Promise.resolve(responder());
};
