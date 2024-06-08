const SummaryModel = require('../Models/summary.model');
const MenuModel = require('../Models/menu.model');

//create new bill
const addBill = async (req, res) => {
    try {
        const {
            billNumber,
            date,
            totalCosteEachBill,
            totalAmount,
            menuitem
        } = req.body;

        const newBill = new SummaryModel({
            billNumber,
            date,
            totalCosteEachBill,
            totalAmount,
            menuitem
        });

        await newBill.save();

        res.status(201).json({
            message: 'Bill added Successfully',
            bill: newBill,
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

//edit order each bill by id
const editBill = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBill = req.body;
        const updatedBill = await SummaryModel.findByIdAndUpdate(
            { _id: id },{
                $set: {
                    totalAmount: updateBill.totalAmount,
                    totalCosteEachBill: updateBill.totalCosteEachBill,
                    menuitem: updateBill.menuitem
                }
            },
            
            { new: true, runValidators: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.json({
            message: 'Bill updated successfully',
            bill: updatedBill
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//delete each bill by id
const deleteBill = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteBill = await SummaryModel.findByIdAndDelete(id)
        if (!deleteBill) {
            return res.status(404).json({ message: 'Bill not found'})
        }
        res.json({
            message: 'Bill deleted successfully',
            bill : deleteBill
        });
    }catch (error) { 
        res.status(500).send(error.message);
    }
}

//get all bill
const getAllBill = async (req, res) => {
    try {
        const bill = await SummaryModel.find();

        res.json(bill);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

//get each bill by id
const getBillById = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await SummaryModel.findById(id)
            .populate('menuitem.menu')
            .populate('menuitem.menuCategory');

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(200).json(bill);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

//search menu
const searchMenu = async (req, res) => {
    try {
        const menu = await MenuModel.find();
        const { name } = req.query;

        const selectedIndex = menu.findIndex(menu => menu.menuName == name)

        res.json(menu[selectedIndex])

    } catch (err) {
        res.status(500).send(err.message);
    }
}

//search date
const searchDate = async (req, res) => {
    try {
        const billDate = await SummaryModel.find();
        const { date } = req.query;

        const selectedIndex = billDate.findIndex(billDate => billDate.date == date)

        res.json(date[selectedIndex])

    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { addBill, editBill, deleteBill, getAllBill, getBillById, searchMenu, searchDate };
