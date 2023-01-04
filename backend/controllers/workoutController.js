const Workout = require('../models/workoutModel');

//get all workouts
const getAll = async(req,res) => {
    try{
         const workouts = await Workout.find({}).sort({createdAt: -1});
         res.status(200).send(workouts);
    }catch(e){
        res.status(400).send(e);
    }
}

//get a single workout
const workoutOne = async (req,res) => {
    const id = req.params.id;
    try{
        const workout = await Workout.findById({_id:id});
        if(!workout)
        {
            res.status(404).send("Not found");
        }
        res.status(200).send(workout);
   }catch(e){
       res.status(400).send(e);
   }
}

//create a new workout
const createWorkout = async (req,res) => {
    const {title,reps,load} = req.body;
    
    try{
        const workout = await Workout.create({
            title: title,
            load : load,
            reps: reps
        });
        res.status(200).send(workout);
    }catch(e){
        res.status(400).send(e);
    }
}

//delete a workout
const workoutDelOne = async (req,res) => {
    const id = req.params.id;
    try{
        const workout = await Workout.findOneAndDelete({_id:id});
        if(!workout)
        {
            res.status(400).send("Not found");
        }
        res.status(200).send("Deleted");
   }catch(e){
       res.status(400).send(e);
   }
}

//update a workout
const updateWorkout = async(req,res) => {
    const id = req.params.id;
    try{
        const workout = await Workout.findOneAndUpdate({_id:id}, {
            ...req.body
        });
        res.status(200).send(workout);

   }catch(e){
       res.status(400).send(e);
   }
}


module.exports  = {
    createWorkout, workoutDelOne, workoutOne, getAll, updateWorkout
}