const express = require('express');
const { createWorkout, workoutOne, getAll, workoutDelOne, updateWorkout } = require('../controllers/workoutController');

const router = express.Router();


//GET all workouts
router.get('/', getAll);

//GET a single workout
router.get('/:id', workoutOne);

//POST a new workout
router.post('/', createWorkout);

//DELETE a workout
router.delete('/:id', workoutDelOne);

//PATCH
router.patch('/:id', updateWorkout);



module.exports = router;