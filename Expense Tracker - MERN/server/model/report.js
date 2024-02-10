const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
