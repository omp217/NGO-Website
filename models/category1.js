const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category1Schema = new Schema({
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
    ref_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    aadhar_number: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    type_of_disabled: {
        type: String,
        required: true
    },
    percentage_of_disabled: {
        type: String,
        required: true
    },
    help: [{help: String, help_organization: String, date_of_help: String}]
});

const Category1 = mongoose.model('Category1', category1Schema);
module.exports = Category1;