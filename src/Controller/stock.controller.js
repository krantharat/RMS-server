const mongoose = require('mongoose');

// Ingredient data part
const IngredientModel = require("../Models/stock.model")

// สร้างข้อมูล Ingredient
const createIngredient = async (req, res) => {
    try {
        const ingredientData = req.body
        const ingredient = new IngredientModel(ingredientData)
        await ingredient.save()

        res.json({
            message: 'add ingredient complete',
            ingredient: ingredient
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// ดูข้อมูล Ingredient ทั้งหมด
const allIngredient = async (req, res) => {
    try {
        const ingredient = await IngredientModel.find()
        .populate('ingredientCategory')
        .populate('uomType')
    
        res.json(ingredient);
  
      } catch (err) {
          res.status(500).send(err.message);
      }
}

// ดู Ingredient รายอัน by name
const searchIngredient = async (req, res) => {
    try {
        const ingredient = await IngredientModel.find()
        .populate('ingredientCategory')
        .populate('uomType')
        
        const {name} = req.query
    
        // หา ingredient จาก name ที่ส่งมา 
        const selectedIndex = ingredient.findIndex(ingredient => ingredient.ingredientName == name)
    
        res.json(ingredient[selectedIndex])

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// ดู Ingredient by date
const searchIngredientByDate = async (req, res) => {
    try {
        const { date } = req.query;

        const ingredient = await IngredientModel.find({date})
        .populate('ingredientCategory')
        .populate('uomType')
        
        if (ingredient.length === 0) {
            return res.status(404).send("No ingredients found for the specified date.");
        }

        res.json(ingredient)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// แก้ไขข้อมูล Ingredient
const editIngredient = async (req, res) => {
    try {
        const id = req.params.id;
        const editIngredient = req.body;

        console.log(`Received ID: ${id}`);

        const existingIngredient = await IngredientModel.findById(id);
        if (!existingIngredient) {
            console.error('Ingredient not found with ID:', id);
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        console.log('Existing Ingredient:', existingIngredient);

        const editedIngredient = await IngredientModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ingredientName: editIngredient.ingredientName,
                    ingredientCategory: editIngredient.ingredientCategory,
                    date: editIngredient.date,
                    inStock: editIngredient.inStock,
                    uomType: editIngredient.uomType,
                    cost: editIngredient.cost,
                    notiAmount: editIngredient.notiAmount
                }
            },
            { new: true, runValidators: true }
        );

        if (!editedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.json({
            message: 'Edit Ingredient complete!',
            ingredient: editedIngredient
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ลบ Ingredient
const deleteIngredient = async (req, res) => {
    try {
        const id = req.params.id; // รับข้อมูลมาเป็น String
        const deletedIngredient = await IngredientModel.findByIdAndDelete(id) // fundById จะแปลง String -> ObjectId ให้อัตโนมัติ
        if (!deletedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json({
            message: 'Ingredient deleted successfully',
            ingredient: deletedIngredient
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Ingredient stock part

// Update amount and date in stock
const updateIngredient = async (req, res) => {
    try {
        const id = req.params.id;
        const updateIngredient = req.body;

        const updatedIngredient = await IngredientModel.findOneAndUpdate(
            { _id: id }, // ใช้ _id เพราะเป็น key ของ MongoDB
            {
                $set: {
                    date: new Date(), // Set date to current date
                    inStock: inStock,
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.json({
            message: 'Update Ingredient complete!',
            ingredient: updatedIngredient
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
};
module.exports = {
    createIngredient,
    allIngredient,
    searchIngredient,
    editIngredient,
    deleteIngredient,
    updateIngredient,
    searchIngredientByDate
  };