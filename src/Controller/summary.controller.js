const SummaryModel = require('../Models/summary.model');
const MenuModel = require('../Models/menu.model');

//create new bill

const addBill = async (req,res) => {
    try{
        const { menu, category, qty, cost, price, date, amount} = req.body;
        const order = new SummaryModel ({
            menu : menu,
            category : category,
            qty : qty,
            cost : cost,
            price : price,
            date : date,
            amount : amount
        });
        await order.save();
        res.json({
            message: 'order added successfully',
            order : order
        })

    }catch (error) { 
        res.status(500).send(error.message);
    }
}

//edit order each bill

const editBill = async (req, res) => {
    try {
        const { id } = req.params;
        const { menuId, categoryId, qty, cost, price, date, amount } = req.body;

        const updatedBill = await SummaryModel.findByIdAndUpdate(
            id,
            { menuId, categoryId, qty, cost, price, date, amount },
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

//delete each bill

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

//ดูบิลทั้งหมด

const getAllBill = async (req, res) => {
    try {
        const bill = await SummaryModel.find();
    
        res.json(bill);
  
      } catch (err) {
          res.status(500).send(err.message);
      }
}
//ดูบิลแต่ละอัน

const getBillById = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await SummaryModel.findById(id)
            .populate("menu")
            .populate("category");

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(200).json(bill);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

//search menu
const searchMenu = async (req,res) => {
    try {
        const menu = await MenuModel.find();
        const {name} = req.query

        const selectedIndex = menu.findIndex(menu => menu.menuName == name)

        res.json(menu[selectedIndex])


    }catch (err) {
        res.status(500).send(err.message);
    }
}

//search date
const searchDate = async (req,res) => {
    try {
        const billDate = await SummaryModel.find();
        const {date} = req.query

        const selectedIndex = billDate.findIndex(billDate => billDate.date == date)

        res.json(menu[selectedIndex])

    }catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { addBill, editBill, deleteBill, getAllBill, getBillById, searchMenu, searchDate };