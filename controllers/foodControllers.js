import fs from 'fs';
import foodModel from '../models/foodModel.js';
import mongoose from 'mongoose';


//add food items
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({

        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Succesfully Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: true, message: " An arror occured " })
    }
}

// all food list 
const listfood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "An error oocured " })
    }
}

//remove food items

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food succesfully removed " })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "An error occoured" })
    }
}


export { addFood, listfood, removeFood }