
import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { EventCard } from './Home';
import { EventType } from '../types';

const Events: React.FC = () => {
  const [filter, setFilter] = useState<EventType | 'All'>('All');
  const allEvents = dataService.getEvents();
  
  const filteredEvents = filter === 'All' 
    ? allEvents 
    : allEvents.filter(e => e.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Discover Experiences</h1>
        <p className="text-xl text-stone-500">From weekend workshops to deep-nature retreats.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-stone-200">
        <FilterButton 
          active={filter === 'All'} 
          onClick={() => setFilter('All')} 
          label="All Events" 
        />
        <FilterButton 
          active={filter === EventType.RETREAT} 
          onClick={() => setFilter(EventType.RETREAT)} 
          label="Retreats" 
        />
        <FilterButton 
          active={filter === EventType.WORKSHOP} 
          onClick={() => setFilter(EventType.WORKSHOP)} 
          label="Workshops" 
        />
        <FilterButton 
          active={filter === EventType.ONLINE} 
          onClick={() => setFilter(EventType.ONLINE)} 
          label="Online" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <h3 className="text-xl font-medium text-stone-400">No events found in this category yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-semibold transition-all ${
      active 
        ? 'bg-teal-600 text-white shadow-md' 
        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
    }`}
  >
    {label}
  </button>
);

export default Events;
