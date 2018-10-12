const mongoose = require('mongoose')

var schema = new mongoose.Schema({ 
    num:Number, 
    name: String, 
    size: String
})

module.exports = mongoose.model('MyModel', schema)