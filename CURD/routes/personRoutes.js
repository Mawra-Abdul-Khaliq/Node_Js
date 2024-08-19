const express = require('express');
const router = express.Router();
const Person= require('../models/Person')

router.post('/',async(req,res)=>{        //Async is used when son=me function take time as db read op, db write op etc
    try{
        const data = req.body  //Assuming request body contain person data
        // Create a new person document using mongoose model
        const newPerson = new Person(data);

        // save the new person to database
        const response = await newPerson.save();        //Await shows it will what here 
        console.log("Data saved sucessfully")
        res.status(200).json(response)
    }
    catch(err){

        console.log("Error Saving Person")
        res.status(500).json({error: 'Internal server error'})
    }
})

// GET method to get person data
router.get('/',async(req,res)=>{
    try{
        const data = await Person.find()
        console.log("Data send sucessfully")
        res.status(200).json(data)
    }
    catch(err){
        console.log("Error Fetching Person")
        res.status(500).json({error: 'Internal server error'})
    }
})

// Get method with parameter to retrive specific data 
router.get('/:workType', async(req,res)=>{
    try{
        workType = req.params.workType   // Assessing the value from URL that was in the variable of workType
        if(workType == 'Chef' || workType == 'Waiter' || workType == 'Manager'){
            response = await Person.find({work: workType});
            if(!response){
                res.status(404).json({error: 'Person not found'})
            }
            console.log("Response Fetched")
            res.status(200).json(response)
        }
        else{
            res.status(404).json('Invalid work type')
        }
    }
    catch(err){
        console.log("Error Fetching Result")
        res.status(500).json({error: 'Internal server error'})
    }
})

// put method to update data
router.put('/:id', async(req,res)=>{
    try{
        const person_id = req.params.id
        const update_person_data = req.body  // json request
        const response = await Person.findByIdAndUpdate(person_id,update_person_data,{
            new: true,    //Return the updated documents
            runValidators: true,    //Run Mongoose Validations
        })
        if(!response){
            res.status(404).json({error: 'Person not found'})
        }
        console.log("Data updated")
        res.status(200).json(response)
    }
    catch(err){
        console.log("Error:",err)
        res.status(500).json({error: 'Internal server error'})
    }
})

// delete method to delete data
router.delete('/:id', async(req,res)=>{
    try{
        const person_id = req.params.id
        const response = await Person.findByIdAndDelete(person_id)
        if(!response){
            res.status(404).json({error: 'Person not found'})
        }
        console.log("Data Deleted")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router