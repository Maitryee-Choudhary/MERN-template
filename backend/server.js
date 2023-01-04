require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//middleware
app.use((req,res,next)=>{
   console.log(req.path, req.method);
   next()
})

app.use('/api/workouts',workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB");
        app.listen(process.env.PORT, (req,res) => {
            console.log("Listening at Port 4000" )
        });
    })
    .catch( (err) => {
        console.log(err);
    } )





