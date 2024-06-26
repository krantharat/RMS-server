const mongoose = require('mongoose');

// Ingredient data part
const IngredientModel = require("../Models/stock.model")

// สร้างข้อมูล Ingredient
const createIngredient = async (req, res) => {
    try {

        const { ingredientName } = req.body;
        
        // Check ชื่อ ingredient ว่ามีใน database อยู่แล้วมั้ย
        const existingIngredient = await IngredientModel.findOne({ ingredientName });
        if (existingIngredient) {
            return res.status(400).json({ message: 'Already have this ingredient in stock' });
        }

        const ingredientData = req.body;
        const ingredient = new IngredientModel(ingredientData);
        await ingredient.save();
        res.json({ message: 'Add ingredient complete', ingredient });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


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
        const ingredients = await IngredientModel.find()
            .populate('ingredientCategory')
            .populate('uomType');
        
        const { name } = req.query;
    
        // Find ingredient by name
        const selectedIndex = ingredients.findIndex(ingredient => ingredient.ingredientName === name);

        if (selectedIndex === -1) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.json(ingredients[selectedIndex]);

    } catch (err) {
        res.status(500).json({ message: 'An error occurred while fetching the ingredient', error: err.message });
    }
};


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
      const { ingredientName } = req.body;
  
      // Find the current ingredient details
      const currentIngredient = await IngredientModel.findById(id);
      if (!currentIngredient) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }
  
      if (ingredientName.trim() !== currentIngredient.ingredientName.trim()) {
        const existingIngredient = await IngredientModel.findOne({ ingredientName: ingredientName.trim() });
        if (existingIngredient) {
          return res.status(400).json({ message: 'Already have this ingredient in stock' });
        }
      }
  
      const editData = req.body;
  
      const ingredient = await IngredientModel.findByIdAndUpdate(
        id,
        { $set: editData },
        { new: true, runValidators: true }
      );
  
      res.json({ message: 'Edit Ingredient complete!', ingredient });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

// Delete Ingredient
const deleteIngredient = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredient = await IngredientModel.findByIdAndDelete(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json
        ({ 
            message: 'Ingredient deleted successfully', 
            ingredient: deleteIngredient 

        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Ingredient stock part

// Update amount and date in stock
const updateIngredient = async (req, res) => {
    try {
        const id = req.params.id;
        const { inStock } = req.body;
        console.log(`Request received to update ingredient ${id} with inStock: ${inStock}`);

        const ingredient = await IngredientModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    date: new Date(),
                    inStock,
                }
            },
            { new: true, runValidators: true }
        );

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        console.log(`Ingredient ${id} updated successfully to inStock: ${inStock}`);
        res.json({ message: 'Update Ingredient complete!', ingredient });
    } catch (err) {
        console.error(`Error updating ingredient ${id}:`, err.message);
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