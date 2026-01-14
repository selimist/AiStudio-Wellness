
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { EventStatus, User } from '../types';

interface EventDetailProps {
  user: User | null;
}

const EventDetail: React.FC<EventDetailProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const event = dataService.getEventById(id || '');

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Event not found</h2>
        <Link to="/events" className="text-teal-600 hover:underline mt-4 inline-block">Return to all events</Link>
      </div>
    );
  }

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const success = dataService.registerForEvent(user.id, event.id);
    if (success) {
      setIsRegistered(true);
      setError(null);
    } else {
      setError("Registration failed. Maybe it's sold out or you're already registered.");
    }
  };

  const isSoldOut = event.status === EventStatus.SOLD_OUT || event.currentRegistrations >= event.capacity;

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={event.coverImage} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-7xl mx-auto">
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-teal-500 text-xs font-bold rounded-full uppercase tracking-wider">
              {event.type}
            </span>
            <span className={`px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold rounded-full uppercase tracking-wider ${isSoldOut ? 'text-red-300' : 'text-teal-200'}`}>
              {isSoldOut ? 'Sold Out' : `${event.capacity - event.currentRegistrations} Spots Left`}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{event.title}</h1>
          <p className="text-lg text-stone-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
            {event.venue}, {event.location}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">About the Experience</h2>
            <p className="text-stone-600 text-lg leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
            <div className="mt-8 p-6 bg-stone-100 rounded-2xl border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-4">What to Expect</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-600">
                <li className="flex items-center"><svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Guided sessions</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Community circle</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Healthy snacks & tea</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Mindful equipment</li>
              </ul>
            </div>
          </section>

          <section className="border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Organizer</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-500 text-xl">
                {event.organizer[0]}
              </div>
              <div>
                <h4 className="font-bold text-stone-900">{event.organizer}</h4>
                <p className="text-stone-500 text-sm">Wellness Expert & Certified Coach</p>
                <button className="text-teal-600 text-sm font-semibold hover:underline mt-1">View Profile</button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 sticky top-24">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-stone-100">
              <span className="text-stone-500 font-medium">Starting from</span>
              <span className="text-3xl font-bold text-stone-900">${event.price}</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-stone-50 rounded-lg text-teal-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm">Date & Time</div>
                  <div className="text-stone-500 text-sm">
                    {new Date(event.startDate).toLocaleDateString()}
                    {event.startDate !== event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-stone-50 rounded-lg text-teal-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm">Duration</div>
                  <div className="text-stone-500 text-sm">{event.type === 'Retreat' ? 'Multi-day' : 'Daily Experience'}</div>
                </div>
              </div>
            </div>

            {isRegistered ? (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-center font-bold">
                ✓ Pre-registered! Check your email for payment instructions.
              </div>
            ) : isSoldOut ? (
              <button disabled className="w-full py-4 bg-stone-200 text-stone-500 rounded-2xl font-bold cursor-not-allowed">
                Sold Out
              </button>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={handleRegister}
                  className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-600/20"
                >
                  Join Experience (Katıl)
                </button>
                <p className="text-center text-xs text-stone-400">
                  No payment required now. This is a pre-registration for the organizer to contact you.
                </p>
              </div>
            )}
            
            {error && <p className="mt-4 text-red-500 text-sm text-center font-medium">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
