
import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { EventItem, ContentItem, EventStatus, EventType } from '../types';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'content'>('events');
  const events = dataService.getEvents();
  const content = dataService.getContent();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
          <p className="text-stone-500">Manage your wellness hub assets.</p>
        </div>
        <div className="flex gap-2 p-1 bg-stone-200 rounded-lg">
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${activeTab === 'events' ? 'bg-white shadow-sm text-teal-600' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Events
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${activeTab === 'content' ? 'bg-white shadow-sm text-teal-600' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Content
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        {activeTab === 'events' ? (
          <EventTable events={events} />
        ) : (
          <ContentTable items={content} />
        )}
      </div>
    </div>
  );
};

const EventTable: React.FC<{ events: EventItem[] }> = ({ events }) => {
  const handleToggleStatus = (id: string, current: EventStatus) => {
    const nextStatus = current === EventStatus.PUBLISHED ? EventStatus.SOLD_OUT : EventStatus.PUBLISHED;
    dataService.updateEvent(id, { status: nextStatus });
    window.location.reload(); // Quick refresh for MVP
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-stone-50 border-b border-stone-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Event</th>
            <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Capacity</th>
            <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {events.map(event => (
            <tr key={event.id} className="hover:bg-stone-50 transition">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <img src={event.coverImage} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <div className="font-bold text-stone-900">{event.title}</div>
                    <div className="text-xs text-stone-500">{event.location}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-stone-600">{event.type}</td>
              <td className="px-6 py-4 text-sm text-stone-600">{new Date(event.startDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-stone-600">
                <div className="flex flex-col">
                  <span>{event.currentRegistrations} / {event.capacity}</span>
                  <div className="w-24 h-1.5 bg-stone-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 rounded-full" 
                      style={{ width: `${(event.currentRegistrations / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  event.status === EventStatus.PUBLISHED ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-700'
                }`}>
                  {event.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <button 
                  onClick={() => handleToggleStatus(event.id, event.status)}
                  className="text-teal-600 font-semibold hover:text-teal-700"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ContentTable: React.FC<{ items: ContentItem[] }> = ({ items }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-stone-50 border-b border-stone-200">
        <tr>
          <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Title</th>
          <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Author</th>
          <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Tags</th>
          <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Date</th>
          <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-stone-100">
        {items.map(item => (
          <tr key={item.id} className="hover:bg-stone-50 transition">
            <td className="px-6 py-4 font-bold text-stone-900">{item.title}</td>
            <td className="px-6 py-4 text-sm text-stone-600">{item.author}</td>
            <td className="px-6 py-4">
              <div className="flex gap-1">
                {item.tags.map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] text-stone-600">{tag}</span>
                ))}
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-stone-600">{item.publishedAt}</td>
            <td className="px-6 py-4 text-sm">
              <button className="text-teal-600 font-semibold hover:text-teal-700">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Admin;
