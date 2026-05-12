import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-600">
            Eventora
          </h1>

          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">

          {/* Left Text */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Discover Amazing Events Near You
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Find concerts, workshops, conferences, and unforgettable
              experiences happening around you.
            </p>

            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Explore Events
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
              alt="Events"
              className="rounded-3xl shadow-2xl w-full max-w-lg object-cover mx-auto"
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

          <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition">
            Create Event
          </button>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
              alt="Music Festival"
              className="w-full h-52 object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                Music Festival
              </h3>

              <p className="text-gray-600 mb-4">
                Join us for a weekend of live music, food trucks,
                and unforgettable experiences.
              </p>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
              alt="Conference"
              className="w-full h-52 object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                Tech Conference
              </h3>

              <p className="text-gray-600 mb-4">
                Meet innovators, developers, and entrepreneurs
                from around the world.
              </p>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop"
              alt="Workshop"
              className="w-full h-52 object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                Creative Workshop
              </h3>

              <p className="text-gray-600 mb-4">
                Learn photography, design, and creative storytelling
                with experts.
              </p>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;