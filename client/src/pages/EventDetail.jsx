import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

const EventDetail = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const { data } = await api.get(`/events/${id}`);

      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!event) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-[500px] object-cover rounded-3xl mb-10"
        />

        <h1 className="text-5xl font-bold mb-5">
          {event.title}
        </h1>

        <p className="text-gray-400 mb-3">
          📅 {new Date(event.date).toDateString()}
        </p>

        <p className="text-gray-400 mb-8">
          📍 {event.location}
        </p>

        <p className="text-lg leading-8 text-gray-300">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;