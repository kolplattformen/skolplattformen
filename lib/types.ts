export interface RequestInit {
  headers?: any
  method?: string
  body?: string
}

export interface Headers {
  get(name: string): string | null
}

export interface Response {
  headers: Headers
  text: () => Promise<string>
  json: () => Promise<any>
}

export interface Fetch {
  (url: string, init?: RequestInit): Promise<Response>
}

export interface AuthTicket {
  order: string
  token: string
}

/**
 * @export
 * @interface CalendarItem
 */
export interface CalendarItem {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  allDay?: boolean;
}

/**
 * @export
 * @interface Child
 */
export interface Child {
  id?: string;
  /**
   * <p>Special ID used to access certain subsystems</p>
   * @type {string}
   * @memberof Child
   */
  sdsId?: string;
  name?: string;
  /**
   * <p>F - förskola, GR - grundskola?</p>
   * @type {string}
   * @memberof Child
   */
  status?: string;
  schoolId?: string;
}

/**
 * @export
 * @interface Classmate
 */
export interface Classmate {
  sisId?: string;
  /**
   * <p>The name of the class of this classmate</p>
   * @type {string}
   * @memberof Classmate
   */
  className?: string;
  firstname?: string;
  lastname?: string;
  guardians?: Guardian[];
}

/**
 * @export
 * @interface Guardian
 */
export interface Guardian {
  email?: string;
  firstname?: string;
  lastname?: string;
  mobile?: string;
  address?: string;
}

/**
 * <p>A news item from the school, for example a weekly news letter</p>
 * @export
 * @interface NewsItem
 */
export interface NewsItem {
  id?: string;
  header?: string;
  intro?: string;
  body?: string;
  published?: string;
  modified?: string;
  imageUrl?: string;
}

/**
 * @export
 * @interface Notification
 */
export interface Notification {
  id?: string;
  sender?: {
    name?: string;
  };
  dateCreated?: string;
  message?: string;
  /**
   * <p>
   *  URL with the actual message as a webpage. Needs separate login.
   * TODO: Investigate how to solve this somehow
   * </p>
   * @type {string}
   * @memberof Notification
   */
  url?: string;
  category?: string;
  messageType?: string;
}
