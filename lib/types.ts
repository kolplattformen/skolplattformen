export interface Auth {
	token?: string;
	/**
	 * @type {string}
	 * @memberof Auth
	 */
	order?: string;
}

/**
 * <p>A JWT token that should be used for authorizing requests</p>
 * @export
 * @interface AuthToken
 */
export interface AuthToken {
	/**
	 * @type {string}
	 * @memberof AuthToken
	 */
	token?: string;
}

/**
 * @export
 * @interface CalendarItem
 */
export interface CalendarItem {
	/**
	 * @type {number}
	 * @memberof CalendarItem
	 */
	id?: number;
	/**
	 * @type {string}
	 * @memberof CalendarItem
	 */
	title?: string;
	/**
	 * @type {string}
	 * @memberof CalendarItem
	 */
	description?: string;
	/**
	 * @type {string}
	 * @memberof CalendarItem
	 */
	location?: string;
	/**
	 * @type {Date}
	 * @memberof CalendarItem
	 */
	startDate?: string;
	/**
	 * @type {Date}
	 * @memberof CalendarItem
	 */
	endDate?: string;
	/**
	 * @type {boolean}
	 * @memberof CalendarItem
	 */
	allDay?: boolean;
}

/**
 * @export
 * @interface Child
 */
export interface Child {
	/**
	 * @type {string}
	 * @memberof Child
	 */
	id?: string;
	/**
	 * <p>Special ID used to access certain subsystems</p>
	 * @type {string}
	 * @memberof Child
	 */
	sdsId?: string;
	/**
	 * @type {string}
	 * @memberof Child
	 */
	name?: string;
	/**
	 * <p>F - förskola, GR - grundskola?</p>
	 * @type {string}
	 * @memberof Child
	 */
	status?: string;
	/**
	 * @type {string}
	 * @memberof Child
	 */
	schoolId?: string;
}

/**
 * @export
 * @interface ChildAll
 */
export interface ChildAll {
	/**
	 * @type {Api.Child}
	 * @memberof ChildAll
	 */
	child?: Api.Child;
	/**
	 * @type {Api.NewsItem[]}
	 * @memberof ChildAll
	 */
	news?: Api.NewsItem[];
	/**
	 * @type {Api.CalendarItem[]}
	 * @memberof ChildAll
	 */
	calendar?: Api.CalendarItem[];
	/**
	 * @type {Api.Notification[]}
	 * @memberof ChildAll
	 */
	notifications?: Api.Notification[];
}

/**
 * @export
 * @interface Classmate
 */
export interface Classmate {
	/**
	 * @type {string}
	 * @memberof Classmate
	 */
	sisId?: string;
	/**
	 * <p>The name of the class of this classmate</p>
	 * @type {string}
	 * @memberof Classmate
	 */
	className?: string;
	/**
	 * @type {string}
	 * @memberof Classmate
	 */
	firstname?: string;
	/**
	 * @type {string}
	 * @memberof Classmate
	 */
	lastname?: string;
	/**
	 * @type {Api.Guardian[]}
	 * @memberof Classmate
	 */
	guardians?: Api.Guardian[];
}

/**
 * @export
 * @interface Guardian
 */
export interface Guardian {
	/**
	 * @type {string}
	 * @memberof Guardian
	 */
	email?: string;
	/**
	 * @type {string}
	 * @memberof Guardian
	 */
	firstname?: string;
	/**
	 * @type {string}
	 * @memberof Guardian
	 */
	lastname?: string;
	/**
	 * @type {string}
	 * @memberof Guardian
	 */
	mobile?: string;
	/**
	 * @type {string}
	 * @memberof Guardian
	 */
	address?: string;
}

/**
 * <p>A news item from the school, for example a weekly news letter</p>
 * @export
 * @interface NewsItem
 */
export interface NewsItem {
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	id?: string;
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	header?: string;
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	intro?: string;
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	body?: string;
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	published?: string;
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	modified?: string;
	/**
	 * @type {string}
	 * @memberof NewsItem
	 */
	imageUrl?: string;
}

/**
 * @export
 * @interface Notification
 */
export interface Notification {
	/**
	 * @type {string}
	 * @memberof Notification
	 */
	id?: string;
	/**
	 * @type {string}
	 * @memberof Notification
	 */
	sender.name?: string;
	/**
	 * @type {Date}
	 * @memberof Notification
	 */
	dateCreated?: string;
	/**
	 * @type {string}
	 * @memberof Notification
	 */
	message?: string;
	/**
	 * <p>URL with the actual message as a webpage. Needs separate login. TODO: Investigate how to solve this somehow</p>
	 * @type {string}
	 * @memberof Notification
	 */
	url?: string;
	/**
	 * @type {string}
	 * @memberof Notification
	 */
	category?: string;
	/**
	 * @type {string}
	 * @memberof Notification
	 */
	messageType?: string;
}
