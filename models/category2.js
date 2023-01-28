const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category2Schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_visit: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    whatsApp_number: {
        type: String,
        required: true
    },
    info_of_donation: {
        type: String,
        required: true
    },
    review_of_visit: {
        type: String,
        required: true
    }
});

const Category2 = mongoose.model('Category2', category2Schema);
module.exports = Category2;