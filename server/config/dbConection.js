const mongoose = require("mongoose")

const connect_db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (err) {
        
        console.log(`ERROR: ${err}`)

    }
}
module.exports = connect_db