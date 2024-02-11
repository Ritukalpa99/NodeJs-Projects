const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    passwordId : String,
    active: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
