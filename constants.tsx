
import { EventItem, ContentItem, EventType, EventStatus, UserRole, User } from './types';

export const INITIAL_USER: User = {
  id: 'user-1',
  name: 'Ayşe Yılmaz',
  email: 'ayse@example.com',
  role: UserRole.USER,
  interests: ['Yoga', 'Meditation', 'Healthy Living'],
  avatar: 'https://picsum.photos/seed/ayse/200/200'
};

export const ADMIN_USER: User = {
  id: 'admin-1',
  name: 'ZenHub Admin',
  email: 'admin@zenhub.com',
  role: UserRole.ADMIN,
  interests: ['Management'],
  avatar: 'https://picsum.photos/seed/admin/200/200'
};

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Weekend Yoga Retreat in Bodrum',
    description: 'Join us for a 3-day immersive yoga experience overlooking the Aegean Sea. Perfect for all levels.',
    location: 'Bodrum',
    venue: 'Sea View Sanctuary',
    startDate: '2024-06-15',
    endDate: '2024-06-18',
    price: 450,
    capacity: 20,
    currentRegistrations: 12,
    organizer: 'Zeynep Yoga',
    coverImage: 'https://picsum.photos/seed/retreat1/800/600',
    type: EventType.RETREAT,
    status: EventStatus.PUBLISHED,
    isFeatured: true
  },
  {
    id: 'e2',
    title: 'Mindfulness Workshop: Breath & Focus',
    description: 'Learn ancient breathing techniques to reduce stress and improve mental clarity in this intensive one-day workshop.',
    location: 'Istanbul',
    venue: 'Kolektif House Levent',
    startDate: '2024-05-20',
    endDate: '2024-05-20',
    price: 80,
    capacity: 30,
    currentRegistrations: 28,
    organizer: 'Mert Koç',
    coverImage: 'https://picsum.photos/seed/workshop1/800/600',
    type: EventType.WORKSHOP,
    status: EventStatus.PUBLISHED,
    isFeatured: true
  },
  {
    id: 'e3',
    title: 'Digital Detox & Silence Retreat',
    description: 'Escape the noise. Five days of silence, meditation, and reconnecting with nature in the mountains of Bolu.',
    location: 'Bolu',
    venue: 'Pine Forest Lodge',
    startDate: '2024-07-10',
    endDate: '2024-07-15',
    price: 600,
    capacity: 15,
    currentRegistrations: 15,
    organizer: 'Quiet Mind Collective',
    coverImage: 'https://picsum.photos/seed/retreat2/800/600',
    type: EventType.RETREAT,
    status: EventStatus.SOLD_OUT,
    isFeatured: false
  }
];

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'c1',
    title: 'Modern Dünyada Mindfulness Pratiği',
    slug: 'modern-dunyada-mindfulness',
    coverImage: 'https://picsum.photos/seed/blog1/800/400',
    content: 'Mindfulness, günümüzün hızlı tempolu dünyasında bir lüks değil, bir gereklilik haline geldi...',
    tags: ['Mindfulness', 'Meditasyon'],
    author: 'Deniz Aksu',
    publishedAt: '2024-04-01',
    readingTime: '5 min'
  },
  {
    id: 'c2',
    title: 'Sabah Rutininizi Değiştirecek 5 İpucu',
    slug: 'sabah-rutini-ipuclari',
    coverImage: 'https://picsum.photos/seed/blog2/800/400',
    content: 'Güne nasıl başladığınız, gününüzün geri kalanını nasıl geçireceğinizi belirler...',
    tags: ['Lifestyle', 'Wellness'],
    author: 'Caner Öz',
    publishedAt: '2024-04-05',
    readingTime: '3 min'
  }
];
