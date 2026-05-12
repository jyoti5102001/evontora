import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/events?search=${search}`);

      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Discover Amazing Events Near You
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Find concerts, workshops, conferences, and unforgettable
              experiences happening around you.
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-5 py-3 rounded-xl text-black w-full outline-none"
              />

              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                Search
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
              alt="Events"
              className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Upcoming Events
          </h2>

          <Link
            to="/create"
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Create Event
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No events found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    event.image ||
                    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
                  }
                  alt={event.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-2 text-indigo-500" />
                    {event.date}
                  </div>

                  <div className="flex items-center text-gray-500 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                    {event.location}
                  </div>

                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {event.description}
                  </p>

                  <Link
                    to={`/event/${event._id}`}
                    className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};