
import React from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { EventItem, ContentItem, EventStatus } from '../types';

const Home: React.FC = () => {
  const featuredEvents = dataService.getFeaturedEvents();
  const recentContent = dataService.getContent().slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-300 font-medium text-sm">
              Discover Inner Peace
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Wellness Experiences & Community
            </h1>
            <p className="text-lg md:text-xl text-stone-200 max-w-lg">
              Find curated retreats, soulful workshops, and meaningful connections in one place.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/events" className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold transition shadow-lg text-lg">
                Explore Events
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold transition text-lg">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Featured Experiences</h2>
            <p className="text-stone-500 mt-2">Carefully selected retreats and workshops for your growth.</p>
          </div>
          <Link to="/events" className="text-teal-600 font-semibold hover:underline hidden sm:block">View all events &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Journal / Content */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900">From the Journal</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">Deep dives into mindfulness, nutrition, and soulful living practices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentContent.map(article => (
              <ContentCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/content" className="inline-flex items-center space-x-2 text-teal-600 font-bold hover:text-teal-700">
              <span>Read the full journal</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-900 rounded-3xl p-12 relative overflow-hidden text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Never miss a retreat again.</h2>
            <p className="text-teal-100 mb-8 max-w-lg mx-auto">Get early access to event bookings, exclusive articles, and community stories.</p>
            <form className="max-w-md mx-auto flex gap-2 flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-grow px-6 py-3 rounded-full text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="px-8 py-3 bg-teal-500 hover:bg-teal-400 rounded-full font-bold transition whitespace-nowrap">
                Keep Me Posted
              </button>
            </form>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>
    </div>
  );
};

export const EventCard: React.FC<{ event: EventItem }> = ({ event }) => (
  <Link to={`/events/${event.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider">
          {event.type}
        </span>
      </div>
      {event.status === EventStatus.SOLD_OUT && (
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center">
          <span className="px-6 py-2 bg-stone-900 text-white font-bold rounded-full transform -rotate-3 border-2 border-white/20">SOLD OUT</span>
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <span className="text-teal-600 font-bold text-lg">${event.price}</span>
        <span className="text-stone-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {event.location}
        </span>
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-teal-600 transition">{event.title}</h3>
      <p className="text-stone-500 text-sm line-clamp-2 mb-4">{event.description}</p>
      <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs text-stone-400 font-medium">
        <span>Starts {new Date(event.startDate).toLocaleDateString()}</span>
        <span>{event.capacity - event.currentRegistrations} spots left</span>
      </div>
    </div>
  </Link>
);

const ContentCard: React.FC<{ article: ContentItem }> = ({ article }) => (
  <Link to={`/content/${article.slug}`} className="group space-y-4">
    <div className="aspect-video rounded-2xl overflow-hidden">
      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
    </div>
    <div className="space-y-2">
      <div className="flex gap-2">
        {article.tags.map(tag => (
          <span key={tag} className="text-xs font-bold text-teal-600 uppercase tracking-widest">{tag}</span>
        ))}
      </div>
      <h3 className="text-xl font-bold text-stone-900 group-hover:text-teal-600 transition">{article.title}</h3>
      <div className="flex items-center space-x-3 text-sm text-stone-500 pt-2">
        <span className="font-medium text-stone-700">{article.author}</span>
        <span>&bull;</span>
        <span>{article.readingTime} read</span>
      </div>
    </div>
  </Link>
);

export default Home;
