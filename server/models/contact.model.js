const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullname: {

        type: String,
        required:true,
        trim:true,

    },
    email:{

        type: String,
        required:true,
        trim:true,
    },
    contact_num:{
        type: Number,
        required:true,
        trim:true,
    },
    location:{
        type: String,
        required:true,
        trim:true,
    },
    reg_date:{
        type:String,
        required:true,
    }
}, {
    
    timestamps: true

});

const Contact = mongoose.model('contact', contactSchema);

module.exports  = Contact;