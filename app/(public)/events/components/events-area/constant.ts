import { EventInput } from "@fullcalendar/core";

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "event",
    start: "2025-03-13",
  },
  {
    id: createEventId(),
    title: "event",
    start: "2025-03-13",
  },
  {
    id: createEventId(),
    title: "event",
    start: "2025-03-13",
  },
  {
    id: createEventId(),
    title: "event",
    start: "2025-03-13",
  },
  {
    id: createEventId(),
    title: "event",
    start: "2025-03-15",
  },
  {
    id: createEventId(),
    title: "event",
    start: "2025-03-15",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export const eventTypes = [
  "live Webminar",
  "On-Demand Workshop",
  "Virtual Support Group",
];

export const services = [
  "Special Education",
  "Speech Therapy",
  "Speech Language Pathology",
];
