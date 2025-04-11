const express = require('express');
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");

const activityController = require('../controllers/activityController');

router.post('/create-activity', authMiddleware, activityController.createActivity);
router.get('/trip-activities', activityController.getActivitiesByTrip);
router.get('/:activityID', activityController.getActivityById);
router.put('/:activityID', authMiddleware, activityController.updateActivity);
router.delete('/:activityID', authMiddleware, activityController.deleteActivity);


module.exports = router;