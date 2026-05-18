import React from "react";

const Dashboard = () => {

  const upcomingEvents = [
    {
      title: "Tech Conference 2026",
      date: "20 May 2026",
      location: "New Delhi",
    },
    {
      title: "Startup Meetup",
      date: "25 May 2026",
      location: "Gurgaon",
    },
    {
      title: "Music Festival",
      date: "30 May 2026",
      location: "Mumbai",
    },
  ];

  const myBookings = [
    {
      event: "AI Workshop",
      status: "Confirmed",
    },
    {
      event: "React Summit",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Explore upcoming events and manage your bookings.
          </p>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition">
          Explore Events
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Events Joined
          </p>

          <h2 className="text-3xl font-bold mt-3 text-gray-800">
            12
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Upcoming Events
          </p>

          <h2 className="text-3xl font-bold mt-3 text-gray-800">
            8
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Saved Events
          </p>

          <h2 className="text-3xl font-bold mt-3 text-gray-800">
            5
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            My Bookings
          </p>

          <h2 className="text-3xl font-bold mt-3 text-gray-800">
            7
          </h2>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upcoming Events */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold text-gray-800">
              Upcoming Events
            </h2>

            <button className="text-sm bg-black text-white px-4 py-2 rounded-lg">
              View All
            </button>

          </div>

          <div className="space-y-5">

            {upcomingEvents.map((event, index) => (

              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-5 rounded-2xl border hover:bg-gray-100 transition"
              >

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {event.date} • {event.location}
                  </p>
                </div>

                <button className="mt-4 md:mt-0 bg-black text-white px-5 py-2 rounded-lg">
                  Book Now
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <div className="flex flex-col items-center text-center">

            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-24 h-24 rounded-full mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              John Doe
            </h2>

            <p className="text-gray-500 mt-1">
              johndoe@gmail.com
            </p>

            <button className="mt-6 bg-black text-white px-5 py-2 rounded-xl w-full">
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      {/* My Bookings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            My Recent Bookings
          </h2>

          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg">
            See More
          </button>

        </div>

        <div className="space-y-4">

          {myBookings.map((booking, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 border p-4 rounded-xl"
            >

              <div>
                <h3 className="font-semibold text-gray-800">
                  {booking.event}
                </h3>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm ${
                  booking.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;