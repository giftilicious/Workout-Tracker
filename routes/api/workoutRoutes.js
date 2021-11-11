const router = require('express').Router()
const Workout = require('../../models'); 

// create routes for each fetch in api.js

router.get('/', async (req, res) => {
  try {
    const workoutData = await Workout.findAll().aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } }
  ]);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put

// router.post

// router.get /api/workouts/range

