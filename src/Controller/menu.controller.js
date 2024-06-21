const MenuModel = require("../Models/menu.model");

const createMenu = async (req, res) => {
  try {
    const { menuName, menuCategory, price, cost, image } = req.body;
    const menuData = { menuName, menuCategory, price, cost, image };

    // Check for existing menu
    const existingMenu = await MenuModel.findOne({ menuName });
    if (existingMenu) {
      return res.status(400).json({ message: 'Already have this menu in database' });
    }

    const menu = new MenuModel(menuData);
    await menu.save();

    res.json({ message: 'Add menu complete', menu });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const allMenu = async (req, res) => {
  try {
    const menus = await MenuModel.find();
    res.json(menus);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const searchMenu = async (req, res) => {
  try {
    const { name } = req.query;
    const menu = await MenuModel.findOne({ menuName: name });
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(menu);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const updateMenu = req.body;

    const existingMenu = await MenuModel.findById(id);
    if (!existingMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    const duplicateMenu = await MenuModel.findOne({ menuName: updateMenu.menuName, _id: { $ne: id } });
    if (duplicateMenu) {
      return res.status(400).json({ message: 'Already have this menu in database' });
    }

    const updatedMenu = await MenuModel.findByIdAndUpdate(
      id,
      updateMenu,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Update Menu complete!', menu: updatedMenu });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMenu = await MenuModel.findByIdAndDelete(id);
    if (!deletedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json({ message: 'Menu deleted successfully', menu: deletedMenu });
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
