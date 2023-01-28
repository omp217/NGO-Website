const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category3Schema = new Schema({
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
    mobile_number: {
        type: String,
        required: true
    },
    reason_of_visit: {
        type: String,
        required: true
    }
});

const Category3 = mongoose.model('Category3', category3Schema);
module.exports = Category3;