const SummaryModel = require('../Models/summary.model');
const MenuModel = require('../Models/menu.model');

//create new bill
const addBill = async (req,res) => {
    try{
            const { menu, category, qty, date, amount, totalCostEachBill, totalAmount, profit, saleTotal, totalCost } = req.body;
    
            // Fetch the menu document to get the price and cost
            const menuDoc = await MenuModel.findById(menu);
            if (!menuDoc) {
                return res.status(404).json({ message: 'Menu not found' });
            }
    
            // Fetch price and cost from the menu document
            const price = menuDoc.price;
            const cost = menuDoc.cost;
    
            const order = new SummaryModel({
                menu: menu,
                category: category,
                qty: qty,
                cost: cost,
                price: price,
                date: date,
                // amount: amount,
                // totalCostEachBill: totalCostEachBill,
                // totalAmount: totalAmount,
                // profit: profit,
                // saleTotal: saleTotal,
                // totalCost: totalCost
            });
    
            await order.save();
    
            res.json({
                message: 'Order added successfully',
                order: order
            });

    }catch (error) { 
        res.status(500).send(error.message);
    }
}

//edit order each bill by billNumber
const editBill = async (req, res) => {
    try {
        const { billNumber } = req.params;
        const updateBill = req.body;
        const updatedBill = await SummaryModel.findOneAndUpdate(
            { billNumber },
            {
                $set: {
                    menu: updateBill.menu,
                    category: updateBill.category,
                    qty: updateBill.qty,
                    cost: updateBill.cost,
                    price: updateBill.price,
                    date: updateBill.date,
                    amount: updateBill.amount
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

//delete each bill by billNumber
const deleteBill = async (req,res) => {
    try {
        const { billNumber } = req.params;
        const deleteBill = await SummaryModel.findOneAndDelete({ billNumber });
        if (!deleteBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json({
            message: 'Bill deleted successfully',
            bill: deleteBill
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

//get each bill by billNumber
const getBillByNumber = async (req, res) => {
    try {
        const { billNumber } = req.params;
        const bill = await SummaryModel.findOne({ billNumber })
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

        res.json(date[selectedIndex])

    }catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { addBill, editBill, deleteBill, getAllBill, getBillByNumber, searchMenu, searchDate };