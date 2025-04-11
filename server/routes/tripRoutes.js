const express = require('express');
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");

const tripController = require('../controllers/tripController');

router.post('/create-trip', authMiddleware, tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:tripID', tripController.getTripById);
router.get('/user-trips/:userID', authMiddleware, tripController.getTripsByUser);
router.put('/:tripID', authMiddleware, tripController.updateTrip);
router.delete('/:tripID', authMiddleware, tripController.deleteTrip);


module.exports = router;