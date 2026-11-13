const mongoose = require('mongoose');
const connect = require('./db');
const Trip = require('./travlr');
const trips = require('../../app_server/data/trips.json');

async function seedTrips() {
  try {
    const tripDocuments = trips.map((trip) => new Trip(trip));
    await Promise.all(tripDocuments.map((trip) => trip.validate()));

    await connect();

    for (const trip of trips) {
      await Trip.updateOne(
        { code: trip.code },
        { $set: trip },
        { upsert: true, runValidators: true }
      );
    }

    console.log(`Seeded ${trips.length} trips.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedTrips().catch((error) => {
  console.error('Could not seed trips:', error.message);
  process.exitCode = 1;
});