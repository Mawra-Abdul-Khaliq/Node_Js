const express = require('express');
const router = express.Router();
const Menu_Item = require('../models/Menu_Item')

// Post method for menu items
router.post('/', async(req,res)=>{
    try{
        const menu = req.body
        const NewMenu= new Menu_Item(menu);
        const saved_menu = await NewMenu.save();

        console.log("Data saved sucessfully")
        res.status(200).json(saved_menu)        
    }
    catch(err){
        console.log("Error Saving Menu", err)
        res.status(500).json({error: 'Internal server error'})
    }
})

// GET method for menu items
router.get('/', async(req,res)=>{
    try{
        const menu = await Menu_Item.find()
        console.log("Data send sucessfully")
        res.status(200).json(menu)
    }
    catch(err){
        console.log("Error Fetching Menu", err)
        res.status(500).json({error: 'Internal server error'})
    }
})

// get specific record
router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste
        if(taste == "Sweet" || taste == "Sour" || taste == "Spicy"){
            const response = await Menu_Item.find({taste: taste})
            console.log("Record Found")
            res.status(200).json(response)
        }
        else{
            res.status(404).json("Invalid Taste")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})

// Update data in Menu
router.put('/:id', async(req,res)=>{
    try{
        const item_id = req.params.id
        const update_item_data = req.body

        const response = await Menu_Item.findByIdAndUpdate(item_id,update_item_data,{
            new: true,
            runValidators: true
        })
        if(!response){
            console.log("Item not found")
        }
        console.log("Item updated")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Internal Server error"})
    }
})

// delete data from menu
router.delete('/:id', async(req,res)=>{
    try{
        const item_id = req.params.id
        const response = await Menu_Item.findByIdAndDelete(item_id)

        if(!response){
            console.log("Item not found")
        }
        console.log("Item deleted")
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Internal Server error"})
    }
})

module.exports = router