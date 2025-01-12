require("dotenv").config()

const cors = require("cors")
const express = require("express")


const connect_db = require("./config/dbConection")
const corsOptions = require("./config/corsOptions")

const { default: mongoose } = require("mongoose")
const app = express()
const PORT = process.env.PORT || 2500
connect_db()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/readyDesign", require("./routes/readyDesignRoute"))
app.use("/api/itemInCart", require("./routes/itemInCartRoute"))
app.use("/api/order", require("./routes/orderRoute"))


mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`PORT:${PORT}`)
    })
})

mongoose.connection.on('error', (err) => {
    console.log(`ERROR:${err}`)
})

