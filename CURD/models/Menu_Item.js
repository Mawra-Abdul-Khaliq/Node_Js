const mongoose = require('mongoose')

const menu_schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ["Spicy", "Sweet", "Sour"],
        required: true
    },
    is_drink:{
        type: Boolean,
        default: false,
    },
    ingredients:{
        type: [String],
        default: [],
        required: true
    },
    num_sales:{
        type: Number,
        default: 0
    }
})

const Menu_Item = mongoose.model('Menu_Item',menu_schema)

module.exports = Menu_Item;