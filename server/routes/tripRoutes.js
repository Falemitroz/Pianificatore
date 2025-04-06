const express = require('express');
const router = express.Router();

const tripController = require('../controllers/tripController');

router.post('/create-trip', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:tripID', tripController.getTripById);
router.get('/user-trips/:userID', tripController.getTripsByUser);
router.put('/:tripID', tripController.updateTrip);
router.delete('/:tripID', tripController.deleteTrip);


module.exports = router;