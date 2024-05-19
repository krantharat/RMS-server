const mongoose = require('mongoose');

// Menu category part
const MenuCategoryModel = require("../Models/menu.model")
const createMenuCategory = async (req, res) => {
    try {
        const menuCategoryData = req.body
        const menuCategory = new MenuCategoryModel({
            menuCategoryName: menuCategoryData.menuCategoryName,
        })
        await menuCategory.save()

        res.json({
            message: 'add menu category complete',
            menuCategory: menuCategory
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}


// Menu part
const MenuModel = require("../Models/menu.model")
const createMenu = async (req, res) => {
    try {
        const menuData = req.body
        const menu = new MenuModel({
            menuName: menuData.menuName,
            menuCategory: menuData.menuCategory,
            price: menuData.price,
            cost: menuData.cost,
        })
        await menu.save()

        res.json({
            message: 'add menu complete',
            menu: menu
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// ดู Menu ทั้งหมด
const allMenu = async (req, res) => {
    try {
        const menu = await MenuModel.find()
        .populate('menuCategory')
    
        res.json(menu);
  
      } catch (err) {
          res.status(500).send(err.message);
      }
}
    
// ดู Menu รายอัน by name
const searchMenu = async (req, res) => {
    try {
        const menu = await MenuModel.find()
        .populate('menuCategory')
        
        const {name} = req.query
    
        // หา menu จาก id ที่ส่งมา 
        const selectedIndex = menu.findIndex(menu => menu.menuName == name)
    
        res.json(menu[selectedIndex])

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// แก้ไขข้อมูล Menu
const editMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const updateMenu = req.body;

        // Find the menu by id and update with the new data
        const updatedMenu = await MenuModel.findOneAndUpdate(
            { _id: id }, // ใช้ _id เพราะเป็น key ของ MongoDB
            {
                $set: {
                    menuName: updateMenu.menuName,
                    menuCategory: updateMenu.menuCategory,
                    price: updateMenu.price,
                    cost: updateMenu.cost,
                }
            },
            { new: true, runValidators: true }
        );

        // If menu not found, return an error
        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        // Respond with the updated menu
        res.json({
            message: 'Update menu complete!',
            menu: updatedMenu // Use consistent key name
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ลบ Menu
const deleteMenu = async (req, res) => {
    try {
        const id = req.params.id; // รับข้อมูลมาเป็น String
        const deletedMenu = await MenuModel.findByIdAndDelete(id) // fundById จะแปลง String -> ObjectId ให้อัตโนมัติ
        if (!deletedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json({
            message: 'Menu deleted successfully',
            menu: deletedMenu
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    createMenuCategory,
    createMenu,
    allMenu,
    searchMenu,
    editMenu,
    deleteMenu
  };