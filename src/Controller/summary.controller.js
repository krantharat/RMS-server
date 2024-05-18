const SummaryModel = require('../Models/summary.model');

//สร้างบิลใหม่
const addBill = async (req,res) => {
    try{
        const {orderId, menuId, categoryId, qty} = req.body;
        const order = new SummaryModel ({
            orderId : orderId,
            menuId : menuId,
            categoryId : categoryId,
            qty : qty
        });
        await order.save();
        res.json({
            message: 'order added success',
            order : order
        })

    }catch (error) { 
        res.status(500).send(error.message);
    }
}

//แก้ไขออเดอร์ในบิล

const editBill = async (req,res) => {
    try{
        const orderId = new mongoose.Types.ObjectId(req.params.orderId);
        const { menuId, categoryId, qty} = req.body;
        await SummaryModel.updateOne({ _id : orderId}, {$set: {
            menuId: menuId,
            categoryId: categoryId,
            qty:qty
        }});
        res.status(200).json({ message: "bill Updated Successfully" });

    }catch (error) { 
        res.status(500).send(error.message);
    }
}
//ลบบิล
//ดูบิล

module.exports = { addBill };