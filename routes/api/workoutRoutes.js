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
router.put('/:id', async (req, res) => {
  try {
      const workoutData = await Workout.update(req.body, {
      where: {
          id: req.params.id,
      },
      });
      // if (!workoutData[0]) {
      // res.status(404).json({ message: 'No indoor activity with this ID' });
      // }
      res.status(200).json(workoutData);
  } catch (err) {
      res.status(500).json(err);
  }
  });

// router.post
router.post('/', async (req, res) => {
  try {
    const workoutData = await Workout.create(
      req.body
    );
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get /api/workouts/range


module.exports = router
