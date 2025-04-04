const Order = require("../models/Order");

const createOrder = async (req, res) => {

    const { user_id,items,valid, deliveryDate,notes,paymentMethod,paid} = req.body
    if (!user_id || !items || !deliveryDate || !paymentMethod) {
        return res.status(400).send( 'user_id , items , deliveryDate and paymentMethod are required' )
    }
    const order = await Order.create({user_id,items,valid, deliveryDate,notes,paymentMethod,paid})
    if (order) { 
        return res.status(200).json(await Order.find().lean())
    } else {
        return res.status(400).send( 'Invalid order' )
    }
}

const getAllOrder = async (req, res) => {
    const orders= await Order.find().lean()
    if (!orders?.length) {
        return res.status(400).send( 'No order found' )
    }
    res.json(orders)
}

const updateOrder = async (req, res) => {
    const { _id,user_id,items,valid, deliveryDate,notes,paymentMethod,paid} = req.body

    if (!user_id || !items || !deliveryDate || !paymentMethod ) {
        return res.status(400).send( '_id ,user_id , items , deliveryDate and paymentMethod are required' )
    }

    const order = await Order.findById(_id).exec()
    if (!order) {
        return res.status(400).send('Order not found')
    }

    order.user_id=user_id
    order.items=items
    order.valid=valid
    order.deliveryDate=deliveryDate
    order.notes=notes
    order.paymentMethod=paymentMethod
    order.paid=paid

    const updatedOrder = await order.save()
    res.json(await Order.find().lean())
}



const deleteOrder = async (req, res) => {
    const { _id } = req.body

    const order = await Order.findById(_id).exec()

    if (!order) {
        return res.status(400).send( 'order not found' )
    }

    const result = await order.deleteOne()

    res.json(await Order.find().lean())
}

const getOrderById = async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id).lean()
    if (!order) {
        return res.status(400).send( 'No order found' )
    }
    res.json(order)
}
const getOrderByUser_id = async (req, res) => {
    const { user_id } = req.body
    const order = await Order.find({user_id:user_id}).lean()
    if (!order) {
        return res.status(400).send('No order found')
    }
    res.json(order)
}

module.exports ={
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrderByUser_id
}