const Trip = require('../models/travlr');

async function tripsList(req, res) {
  try {
    const trips = await Trip.find({}).lean();
    return res.status(200).json(trips);
  } catch (error) {
    console.error('Could not retrieve trips:', error.message);
    return res.status(500).json({ message: 'Could not retrieve trips.' });
  }
}

async function tripsFindByCode(req, res) {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).lean();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.status(200).json(trip);
  } catch (error) {
    console.error('Could not retrieve trip:', error.message);
    return res.status(500).json({ message: 'Could not retrieve trip.' });
  }
}
async function tripsAddTrip(req, res) {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    console.error('Could not create trip:', error.message);
    return res.status(500).json({ message: 'Could not create trip.' });
  }
}
async function tripsUpdateTrip(req, res) {
  const { name, length, start, resort, perPerson, image, description, details } = req.body ?? {};
  const changes = { name, length, start, resort, perPerson, image, description, details };

  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      { $set: changes },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.status(200).json(trip);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }

    console.error('Could not update trip:', error.message);
    return res.status(500).json({ message: 'Could not update trip.' });
  }
}
async function tripsDeleteTrip(req, res) {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.status(204).end();
  } catch (error) {
    console.error('Could not delete trip:', error.message);
    return res.status(500).json({ message: 'Could not delete trip.' });
  }
}
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};