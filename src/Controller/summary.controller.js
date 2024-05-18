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

//แก้ไขออเดอร์ในบิลแต่ละบิล

const editBill = async (req,res) => {
    try{
        const id = new mongoose.Types.ObjectId(req.params.id);
        const { menuId, categoryId, qty} = req.body;
        await SummaryModel.updateOne({ _id : id}, {$set: {
            menuId: menuId,
            categoryId: categoryId,
            qty:qty
        }});
        res.status(200).json({ message: "bill Updated Successfully" });

    }catch (error) { 
        res.status(500).send(error.message);
    }
}

// or use findOneAndUpdate
// const editBill = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { menuId, categoryId, qty } = req.body;

//         const updatedBill = await SummaryModel.findOneAndUpdate(
//             { _id: mongoose.Types.ObjectId(id) },
//             {
//                 $set: {
//                     menuId: menuId,
//                     categoryId: categoryId,
//                     qty: qty
//                 }
//             },
//             { new: true }  **returns the updated document**
//         );

//         if (!updatedBill) {
//             return res.status(404).json({ message: "Bill not found" });
//         }

//         res.status(200).json({ message: "Bill updated successfully", updatedBill });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };
// example RAW {
//     "menuId": "60d21b4667d0d8992e610c86",
//     "categoryId": "60d21b4667d0d8992e610c87",
//     "qty": 3
// }

//ลบบิลแต่ละบิล

const deleteBill = async (req,res) => {
    try{

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
        const { billId } = req.params;
        const bill = await SummaryModel.findById(billId)
        //populate ดึงข้อมูล
            // .populate("OwnerID")
            // .populate({ path: "Comments", populate: { path: "OwnerID" } });
        res.status(200).json(bill);
 

    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { addBill, editBill, deleteBill, getAllBill, getBillById };