const express = require('express');
const router = express.Router();

const activityController = require('../controllers/activityController');

router.post('/create-activity', activityController.createActivity);
router.get('/user-activitys', activityController.getAllActivities); // chiedere conferma ad ale
router.get('/user-activitys/:tripId', activityController.getActivitiesByTrip); //chiedere conferma ale
router.get('/:activityID', activityController.getActivityById);
router.put('/:activityID', activityController.updateActivity);
router.delete('/:activityID', activityController.deleteActivity);


module.exports = router;