
import { MOCK_EVENTS, MOCK_CONTENT } from '../constants';
import { EventItem, ContentItem, EventRegistration, User } from '../types';

class DataService {
  private events: EventItem[] = [...MOCK_EVENTS];
  private content: ContentItem[] = [...MOCK_CONTENT];
  private registrations: EventRegistration[] = [];

  getEvents() { return this.events; }
  getContent() { return this.content; }
  
  getFeaturedEvents() {
    return this.events.filter(e => e.isFeatured);
  }

  getEventById(id: string) {
    return this.events.find(e => e.id === id);
  }

  getContentBySlug(slug: string) {
    return this.content.find(c => c.slug === slug);
  }

  registerForEvent(userId: string, eventId: string): boolean {
    const event = this.getEventById(eventId);
    if (!event || event.currentRegistrations >= event.capacity) return false;

    const exists = this.registrations.find(r => r.userId === userId && r.eventId === eventId);
    if (exists) return true;

    this.registrations.push({
      id: Math.random().toString(36).substr(2, 9),
      userId,
      eventId,
      status: 'registered',
      registeredAt: new Date().toISOString()
    });

    event.currentRegistrations += 1;
    return true;
  }

  getUserRegistrations(userId: string) {
    return this.registrations
      .filter(r => r.userId === userId)
      .map(r => ({
        registration: r,
        event: this.getEventById(r.eventId)
      }));
  }

  // Admin Actions
  updateEvent(id: string, updates: Partial<EventItem>) {
    this.events = this.events.map(e => e.id === id ? { ...e, ...updates } : e);
  }

  deleteEvent(id: string) {
    this.events = this.events.filter(e => e.id !== id);
  }

  addEvent(event: Omit<EventItem, 'id' | 'currentRegistrations'>) {
    const newEvent: EventItem = {
      ...event,
      id: `e${this.events.length + 1}`,
      currentRegistrations: 0
    };
    this.events.push(newEvent);
  }

  addContent(item: Omit<ContentItem, 'id'>) {
    const newItem: ContentItem = {
      ...item,
      id: `c${this.content.length + 1}`
    };
    this.content.push(newItem);
  }
}

export const dataService = new DataService();
