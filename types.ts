
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  interests: string[];
  avatar?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  content: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: string;
}

export enum EventType {
  WORKSHOP = 'Workshop',
  RETREAT = 'Retreat',
  ONLINE = 'Online Event'
}

export enum EventStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  SOLD_OUT = 'Sold Out'
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  currentRegistrations: number;
  organizer: string;
  coverImage: string;
  type: EventType;
  status: EventStatus;
  isFeatured?: boolean;
}

export interface EventRegistration {
  id: string;
  userId: string;
  eventId: string;
  status: 'registered' | 'cancelled';
  registeredAt: string;
}
