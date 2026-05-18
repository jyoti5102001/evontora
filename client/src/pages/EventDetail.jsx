import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

const EventDetail = () => {

  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const [showOtpBox, setShowOtpBox] = useState(false);

  const [otp, setOtp] = useState("");

  const [bookingRequested, setBookingRequested] =
    useState(false);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {

    try {

      const { data } = await api.get(
        `/events/${id}`
      );

      setEvent(data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= SEND OTP =================

  const handleRegister = async () => {

    try {

      await api.post(
        "/bookings/send-otp",
        {
          eventId: id,
        }
      );

      alert("OTP sent successfully");

      setShowOtpBox(true);

    } catch (error) {

      console.log(error);

      alert("Failed to send OTP");

    }

  };

  // ================= VERIFY OTP =================

  const handleVerifyOtp = async () => {

    try {

      await api.post(
        "/bookings/verify-otp",
        {
          eventId: id,
          otp,
        }
      );

      // Save booking in localStorage
      const existingBookings =
        JSON.parse(
          localStorage.getItem("myBookings")
        ) || [];

      const newBooking = {
        eventId: event._id,
        title: event.title,
        date: event.date,
        location: event.location,
        imageUrl: event.imageUrl,
        status: "Awaiting Admin Confirmation",
      };

      localStorage.setItem(
        "myBookings",
        JSON.stringify([
          ...existingBookings,
          newBooking,
        ])
      );

      setBookingRequested(true);

    } catch (error) {

      console.log(error);

      alert("Invalid OTP");

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

      <div className="max-w-6xl mx-auto">

        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-[500px] object-cover rounded-3xl mb-10"
        />

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            <h1 className="text-5xl font-bold mb-5">
              {event.title}
            </h1>

            <p className="text-gray-400 mb-3">
              📅 {new Date(event.date).toDateString()}
            </p>

            <p className="text-gray-400 mb-5">
              📍 {event.location}
            </p>

            <p className="text-gray-400 mb-5">
              🎟 Ticket Price:
              <span className="ml-2">
                ₹ {event.ticketPrice}
              </span>
            </p>

            <p className="text-gray-400 mb-8">
              👥 Availability:
              <span className="ml-2">
                {event.availableSeats} Seats Left
              </span>
            </p>

            <p className="text-lg leading-8 text-gray-300">
              {event.description}
            </p>

          </div>

          {/* RIGHT SIDE BOOKING CARD */}
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 h-fit">

            <h2 className="text-3xl font-bold mb-8">
              Booking Details
            </h2>

            <div className="space-y-5 mb-8">

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Event
                </span>

                <span>
                  {event.title}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Date
                </span>

                <span>
                  {new Date(event.date).toDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Location
                </span>

                <span>
                  {event.location}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Ticket Price
                </span>

                <span>
                  ₹ {event.ticketPrice}
                </span>
              </div>

            </div>

            {/* REGISTER BUTTON */}
            {!showOtpBox && !bookingRequested && (

              <button
                onClick={handleRegister}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg"
              >
                Confirm Registration
              </button>

            )}

            {/* OTP Verification */}
            {showOtpBox && !bookingRequested && (

              <div className="mt-6">

                <h3 className="text-2xl font-bold mb-5">
                  Verify OTP
                </h3>

                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                  className="w-full bg-black border border-gray-700 px-5 py-4 rounded-2xl outline-none mb-5"
                />

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-white text-black py-4 rounded-2xl font-bold"
                >
                  Confirm Event
                </button>

              </div>

            )}

            {/* SUCCESS MESSAGE */}
            {bookingRequested && (

              <div className="mt-6 text-center">

                <h3 className="text-3xl font-black mb-4 text-green-400">
                  Booking Requested!
                </h3>

                <p className="text-gray-400 mb-6 leading-7">
                  Awaiting admin confirmation.
                  Your booking request has been submitted successfully.
                </p>

                <button
                  disabled
                  className="w-full bg-gray-700 text-white py-4 rounded-2xl font-bold cursor-not-allowed"
                >
                  Request Sent
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );

};

export default EventDetail;