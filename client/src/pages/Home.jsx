import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/events");

      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="py-24 px-6 border-b border-gray-800">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-6xl md:text-7xl font-black mb-6">
            Welcome to
            <span className="block text-gray-400">
              Eventora
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Discover amazing events near you
          </p>

          {/* SEARCH */}
          <div className="max-w-2xl mx-auto flex gap-4">

            <input
              type="text"
              placeholder="Search events by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-[#111111] border border-gray-700 px-5 py-4 rounded-2xl outline-none"
            />

            <button className="bg-white text-black px-8 rounded-2xl font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold mb-10">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-[#111111] border border-gray-800 rounded-3xl overflow-hidden"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold mb-3">
                  {event.title}
                </h3>

                <p className="text-gray-400 mb-2">
                  📅 {new Date(event.date).toDateString()}
                </p>

                <p className="text-gray-400 mb-5">
                  📍 {event.location}
                </p>

                <Link
                  to={`/event/${event._id}`}
                  className="block text-center w-full bg-white text-black py-3 rounded-xl font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;