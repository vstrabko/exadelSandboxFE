import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: TODAY_STR,
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: '2021-11-12T09:00:00+03:00',
  //   end: '2021-11-12T12:00:00+03:00',
  // },
  // {
  //   title: 'Meeting',
  //   start: '2021-11-25T04:00:00.000Z',
  //   end: '2021-11-25T09:00:00.000Z',
  //   extendedProps: {
  //     status: 'done'
  //   },
  //   backgroundColor: 'green',
  // }
];

export function createEventId(): string {
  return String(eventGuid++);
}
