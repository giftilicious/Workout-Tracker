const router = require('express').Router()
const { Workout } = require('../../models');


// create routes to each fetch in api.js
router.get('/', async (req, res) => {
  try {
    const workoutData = await Workout.aggregate([
      { $addFields: { totalDuration: { $sum: '$exercises.duration' } } },
    ]);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put /:id
router.put('/:id', async (req, res) => {
  try {
    const workoutData = await Workout.findByIdAndUpdate(
      req.params.id, 
      { $push: { exercises: req.body } }, 
      { new: true }
    );
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post
router.post('/', async (req, res) => {
  try {
    const workoutData = await Workout.create(
      { exercises: req.body }
    );
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get /range
router.get('/range', async (req, res) => {
  try {
    const workoutData = await Workout.aggregate([
      { $addFields: { totalDuration: { $sum: '$exercises.duration' } } },
      { $sort: { day: -1 } },
      { $limit: 7 }
    ]);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router