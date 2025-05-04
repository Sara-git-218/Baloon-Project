const Order = require("../models/Order");

const createOrder = async (req, res) => {

    const { user_id, items, valid, deliveryDate, notes, paymentMethod, paid } = req.body
    if (!user_id || !items || !deliveryDate || !paymentMethod) {
        return res.status(400).send('user_id , items , deliveryDate and paymentMethod are required')
    }
    const order = await Order.create({ user_id, items, valid, deliveryDate, notes, paymentMethod, paid })
    if (order) {
        return res.status(200).json(await Order.find().lean())
    } else {
        return res.status(400).send('Invalid order')
    }
}

const getAllOrder = async (req, res) => {
    const orders = await Order.find().lean()
    if (!orders?.length) {
        return res.status(400).send('No order found')
    }
    res.json(orders)
}
const getOrdersByStatus = async (req, res) => {
    const status = req.params.status;
    console.log(status)
    const orders = await Order.find({ status: status }).populate('user_id')
        .populate({
            path: 'items'
        })
        .lean();
    // if (!orders?.length) {
    //     console.log("אין מוצרים")
    //     return res.status(400).send( 'No order found' )
    // }
    console.log("Populated Orders:", orders);
    res.json(orders)
}

const updateOrder = async (req, res) => {
    const { _id, user_id, items, valid, deliveryDate, notes, paymentMethod, paid } = req.body

    if (!user_id || !items || !deliveryDate || !paymentMethod) {
        return res.status(400).send('_id ,user_id , items , deliveryDate and paymentMethod are required')
    }

    const order = await Order.findById(_id).exec()
    if (!order) {
        return res.status(400).send('Order not found')
    }

    order.user_id = user_id
    order.items = items
    order.valid = valid
    order.deliveryDate = deliveryDate
    order.notes = notes
    order.paymentMethod = paymentMethod
    order.paid = paid

    const updatedOrder = await order.save()
    res.json(await Order.find().lean())
}

const updateStatus = async (req, res) => {
    const { _id, status } = req.body;
    if (!_id || !status) {
        return res.status0(400).send('are requierd')
    }
    const order = await Order.findById(_id).exec();
    if (!order) {
        return res.status(400).send('Order not found')
    }
    order.status = status;
    const updatedOrder = await order.save()
    res.json(updateOrder)

}

const deleteOrder = async (req, res) => {
    const { _id } = req.body

    const order = await Order.findById(_id).exec()

    if (!order) {
        return res.status(400).send('order not found')
    }

    const result = await order.deleteOne()

    res.json(await Order.find().lean())
}

const getOrderById = async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id).lean()
    if (!order) {
        return res.status(400).send('No order found')
    }
    res.json(order)
}
const getOrderByUser_id = async (req, res) => {
    const { user_id } = req.body
    const order = await Order.find({ user_id: user_id }).lean()
    if (!order) {
        return res.status(400).send('No order found')
    }
    res.json(order)
}

// const getOrdersByDate=async (req,res)=>{
//     const date=req.params.date;
//     console.log(date)
//     const orders=await Order.find({date:date}).populate('user_id')  
//     .populate({
//         path: 'items'
//       })
//       .lean();
//     // if (!orders?.length) {
//     //     console.log("אין מוצרים")
//     //     return res.status(400).send( 'No order found' )
//     // }
//     console.log("Populated Orders:", orders);
//     res.json(orders)
//     }
const getOrdersByDate = async (req, res) => {
    const dateParam = req.params.date; // מקבלים את התאריך כפרמטר

    try {
        // ממירים את התאריך שהתקבל לתחילת היום
        const startDate = new Date(dateParam);
        startDate.setHours(0, 0, 0, 0);

        // יוצרים את סוף היום
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);

        // חיפוש לפי טווח תאריכים
        const orders = await Order.find({
            deliveryDate: {
                $gte: startDate, // תאריך גדול או שווה לתחילת היום
                $lte: endDate    // תאריך קטן או שווה לסוף היום
            }
        }).populate('user_id') // מילוי המידע על המשתמש
          .populate('items')   // מילוי מידע על הפריטים
          .lean();

        if (!orders.length) {
            return res.status(404).send('No orders found for the selected date');
        }

        res.json(orders); // מחזירים את ההזמנות
    } catch (error) {
        console.error("Error fetching orders by date:", error);
        res.status(500).send('An error occurred while fetching orders');
    }
};
module.exports = {
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrderByUser_id,
    getOrdersByStatus,
    updateStatus,
    getOrdersByDate
}