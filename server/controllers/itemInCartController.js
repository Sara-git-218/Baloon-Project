const ItemInCart = require("../models/ItemInCart");

const createItemInCart = async (req, res) => {

    const { user_id, readyDesign_id, colors, cnt, captionType, CaptionContent,isDefaultColors,colorsIfNotDefault } = req.body
    if (!user_id) {
        return res.status(400).send('user_id is required')
    }
console.log(CaptionContent);
    const itemInCart = await ItemInCart.create({ user_id, readyDesign_id, colors, cnt, captionType, CaptionContent ,isDefaultColors,colorsIfNotDefault})
    if (itemInCart) {
        console.log(itemInCart);
        return res.status(200).json(await ItemInCart.find().lean())
    } else {
        return res.status(400).send('Invalid itemInCart')
    }
}

const getAllItemInCart = async (req, res) => {
    const itemInCarts = await ItemInCart.find().lean()
    if (!itemInCarts?.length) {
        return res.status(400).send('No itemInCart found')
    }
    res.json(itemInCarts)
}

const updateItemInCart = async (req, res) => {
    const { _id, user_id, readyDesign_id, colors, cnt, captionType, CaptionContent } = req.body

    if (!_id || !user_id) {
        return res.status(400).send('_id and user_id fields are required')
    }

    const itemInCart = await ItemInCart.findById(_id).exec()
    if (!itemInCart) {
        return res.status(400).send('ItemInCart not found')
    }

    itemInCart.user_id = user_id
    itemInCart.readyDesign_id = readyDesign_id
    itemInCart.colors = colors
    itemInCart.cnt = cnt
    itemInCart.captionType = captionType
    itemInCart.CaptionContent = CaptionContent

    const updatedItemInCart = await itemInCart.save()
    res.json(await ItemInCart.find().lean())
}



const deleteItemInCart = async (req, res) => {
    const { _id } = req.body

    const itemInCart = await ItemInCart.findById(_id).exec()

    if (!itemInCart) {
        return res.status(400).send('itemInCart not found')
    }

    const result = await itemInCart.deleteOne()

    res.json(await ItemInCart.find().lean())
}

const getItemInCartById = async (req, res) => {
    const { id } = req.params
    const itemInCart = await ItemInCart.findById(id).lean()
    if (!itemInCart) {
        return res.status(400).send('No itemInCart found')
    }
    res.json(itemInCart)
}

const getItemInCartByUser_id = async (req, res) => {
    const user_id = req.user._id
    const itemInCart = await ItemInCart.find({ user_id: user_id }).populate('readyDesign_id').lean()
    if (!itemInCart) {
        return res.status(400).send('No itemInCart found')
    }
    res.json(itemInCart)
}
const deleteAllItemsForUser = async (req, res) => {

    try {
        const userId = req.user._id; // יוצא מהטוקן, דרך המידלוור

        const result = await ItemInCart.deleteMany({ user_id: userId });

        res.status(200).json({ message: 'כל הפריטים נמחקו מהעגלה', deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאה במחיקת כל הפריטים מהעגלה' });
    }
}

module.exports = {
    createItemInCart,
    getAllItemInCart,
    updateItemInCart,
    deleteItemInCart,
    getItemInCartById,
    getItemInCartByUser_id,
    deleteAllItemsForUser
}