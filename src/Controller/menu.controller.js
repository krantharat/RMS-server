const mongoose = require('mongoose');
const fs = require('fs');

// Menu part
const MenuModel = require("../Models/menu.model");

const createMenu = async (req, res) => {
    try {
        const { menuName, menuCategory, price, cost } = req.body;
        const menuData = { menuName, menuCategory, price, cost };

        if (req.file) {
            menuData.file = req.file.filename;
        }

        // ตรวจสอบว่ามีเมนูที่ชื่อเดียวกันอยู่ในฐานข้อมูลหรือไม่
        const existingMenu = await MenuModel.findOne({ menuName });
        if (existingMenu) {
            return res.status(400).json({ message: 'Already have this menu in database' });
        }

        console.log(menuData);

        const menu = new MenuModel(menuData);
        await menu.save();

        res.json({ message: 'Add menu complete', menu });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ดู Menu ทั้งหมด
const allMenu = async (req, res) => {
    try {
        const menu = await MenuModel.find().populate('menuCategory');
        res.json(menu);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ดู Menu รายอัน by name
const searchMenu = async (req, res) => {
    try {
        const menu = await MenuModel.find().populate('menuCategory');
        const { name } = req.query;

        // หา menu จาก id ที่ส่งมา
        const selectedIndex = menu.findIndex(menu => menu.menuName == name);
        res.json(menu[selectedIndex]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const editMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const updateMenu = req.body;

        console.log(`Received ID: ${id}`);

        const existingMenu = await MenuModel.findById(id);
        if (!existingMenu) {
            console.error('Menu not found with ID:', id);
            return res.status(404).json({ message: 'Menu not found' });
        }

        // ตรวจสอบว่ามีเมนูที่ชื่อเดียวกันอยู่ในฐานข้อมูลหรือไม่ (ยกเว้นเมนูปัจจุบันที่กำลังแก้ไข)
        const duplicateMenu = await MenuModel.findOne({ menuName: updateMenu.menuName, _id: { $ne: id } });
        if (duplicateMenu) {
            return res.status(400).json({ message: 'Already have this menu in database' });
        }

        console.log('Existing Menu:', existingMenu);

        const updatedMenu = await MenuModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    menuName: updateMenu.menuName,
                    menuCategory: updateMenu.menuCategory,
                    price: updateMenu.price,
                    cost: updateMenu.cost,
                    file: updateMenu.file
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedMenu) {
            console.error('Menu not found after update attempt with ID:', id);
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.json({
            message: 'Update Menu complete!',
            menu: updatedMenu
        });

    } catch (err) {
        console.error('Error updating menu:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// ลบ Menu
const deleteMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMenu = await MenuModel.findByIdAndDelete(id);
        if (!deletedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        if (deletedMenu.file) {
            fs.unlink('./uploads/' + deletedMenu.file, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Menu image deleted successfully');
                }
            });
        }
        res.json({
            message: 'Menu deleted successfully',
            menu: deletedMenu
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    createMenu,
    allMenu,
    searchMenu,
    editMenu,
    deleteMenu
};
