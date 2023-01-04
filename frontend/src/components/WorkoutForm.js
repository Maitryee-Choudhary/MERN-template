import { useState } from "react";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext';

const WorkoutForm = () =>{

    const [title,setTitle] = useState();
    const [load,setLoad] = useState();
    const [reps, setReps] = useState();
    const [error, setError] = useState(null);
    const {workouts, dispatch} = useWorkoutsContext();

    const handleSubmit = async(e) => {
        //preventDefault Refreshing page
        e.preventDefault();

        const workout = {title,load,reps};
        const response = await fetch('api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers:{
                'Content-Type' : 'application/json'
            }
        });

       console.log('From Form', response);
       
       const json = await response.json();
       console.log('From form', json);
       
       if(!response.ok)
       {
          setError(json.message);
       }
       if(response.ok)
       {
        setError(null);
        console.log('new workout added');
        setTitle('');
        setLoad('');
        setReps('');
        dispatch({type:'CREATE_WORKOUT', payload:json});
       
       }
    }

   return(
    <form className="create" onSubmit={handleSubmit}>
        <h2>Add a New Workout</h2>

        <label>Exercise Title: </label>
        <input 
           type="text"
           onChange={(e)=> setTitle(e.target.value)}
           value={title}
           
        />
        
        <label>Load (in Kg): </label>
        <input 
           type="number"
           onChange={(e)=> setLoad(e.target.value)}
           value={load}
           
        />
        
        <label>Reps: </label>
        <input 
           type="number"
           onChange={(e)=> setReps(e.target.value)}
           value={reps}
           
        />
        <button> Add Workout </button>
        {error && <div className="error">{error}</div>}
    </form>

   )
}

export default WorkoutForm;