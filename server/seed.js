// seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Event = require('./models/Event');

dotenv.config();

const MONGO_URI =
  'mongodb+srv://jyotidev:Jyoti12345@cluster0.7bht3co.mongodb.net/eventora';

console.log('Seeder started...');

async function seedData() {
  try {
    console.log('Connecting MongoDB...');

    await mongoose.connect(MONGO_URI);

    console.log('MongoDB Connected');

    // Delete old data
    await User.deleteMany();
    await Event.deleteMany();

    console.log('Old data deleted');

    // Hash password
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Insert Users
    const users = await User.insertMany([
      {
        name: 'Aman Sharma',
        email: 'aman@example.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'Priya Verma',
        email: 'priya@example.com',
        password: hashedPassword,
        role: 'user',
      },
      {
        name: 'Rahul Mehta',
        email: 'rahul@example.com',
        password: hashedPassword,
        role: 'user',
      },
      {
        name: 'Sneha Kapoor',
        email: 'sneha@example.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'Karan Malhotra',
        email: 'karan@example.com',
        password: hashedPassword,
        role: 'user',
      },
    ]);

    console.log('Users inserted');

    // Insert Events
    await Event.insertMany([
      {
        title: 'Music Concert',
        description: 'Live concert with famous singers',
        date: new Date('2026-06-15'),
        location: 'Delhi',
        category: 'Music',
        totalSeats: 100,
        availableSeats: 80,
        ticketPrice: 999,
        imageUrl:
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
        createdBy: users[0]._id,
      },
      {
        title: 'Tech Conference',
        description: 'AI and Web Development conference',
        date: new Date('2026-07-10'),
        location: 'Gurgaon',
        category: 'Technology',
        totalSeats: 200,
        availableSeats: 150,
        ticketPrice: 1499,
        imageUrl:
          'https://images.unsplash.com/photo-1511578314322-379afb476865',
        createdBy: users[0]._id,
      },
      {
        title: 'Startup Meetup',
        description: 'Networking for entrepreneurs',
        date: new Date('2026-08-05'),
        location: 'Bangalore',
        category: 'Business',
        totalSeats: 120,
        availableSeats: 95,
        ticketPrice: 499,
        imageUrl:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        createdBy: users[3]._id,
      },
      {
        title: 'Food Festival',
        description: 'Street food and cuisines festival',
        date: new Date('2026-09-12'),
        location: 'Mumbai',
        category: 'Food',
        totalSeats: 300,
        availableSeats: 220,
        ticketPrice: 799,
        imageUrl:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        createdBy: users[3]._id,
      },
      {
        title: 'Gaming Tournament',
        description: 'Esports championship event',
        date: new Date('2026-10-20'),
        location: 'Hyderabad',
        category: 'Gaming',
        totalSeats: 180,
        availableSeats: 140,
        ticketPrice: 599,
        imageUrl:
          'https://images.unsplash.com/photo-1542751110-97427bbecf20',
        createdBy: users[0]._id,
      },
      {
        title: 'Photography Workshop',
        description: 'Professional photography learning',
        date: new Date('2026-11-08'),
        location: 'Jaipur',
        category: 'Workshop',
        totalSeats: 60,
        availableSeats: 40,
        ticketPrice: 1299,
        imageUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        createdBy: users[0]._id,
      },
      {
        title: 'Fitness Bootcamp',
        description: 'Health and fitness training camp',
        date: new Date('2026-12-01'),
        location: 'Chandigarh',
        category: 'Fitness',
        totalSeats: 90,
        availableSeats: 70,
        ticketPrice: 699,
        imageUrl:
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        createdBy: users[3]._id,
      },
      {
        title: 'Business Summit',
        description: 'Meet investors and founders',
        date: new Date('2027-01-15'),
        location: 'Pune',
        category: 'Business',
        totalSeats: 250,
        availableSeats: 200,
        ticketPrice: 1999,
        imageUrl:
          'https://images.unsplash.com/photo-1515169067868-5387ec356754',
        createdBy: users[0]._id,
      },
    ]);

    console.log('Events inserted');

    await mongoose.connection.close();

    console.log('Seeder completed successfully');
  } catch (err) {
    console.log('ERROR:', err);
  }
}

seedData();