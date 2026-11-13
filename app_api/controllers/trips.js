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

module.exports = { tripsList, tripsFindByCode };