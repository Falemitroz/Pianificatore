const express = require('express');
const router = express.Router();

const activityController = require('../controllers/activityController');

router.post('/create-activity', activityController.createActivity);
router.get('/user-activitys/:userID', activityController.getActivitiesByTrip);
router.get('/:activityID', activityController.getActivityById);
router.put('/:activityID', activityController.updateActivity);
router.delete('/:activityID', activityController.deleteActivity);


module.exports = router;