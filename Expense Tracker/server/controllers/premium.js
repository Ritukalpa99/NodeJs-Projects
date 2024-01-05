require('dotenv').config();
const Razorpay = require('razorpay')

exports.purchasePremium = async (req,res) => {
    try {
        let rzp = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET,
        });
        const amount = 2500;

        rzp.orders.create({amount,currency : 'INR'}, (err,order) => {
            if(err) {
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderId : order.id, status : 'PENDING'}).then(() => {
                return res.status(201).json({order, key_id : rzp.key_id});
            }).catch(err => {
                throw new Error(err)
            })
        })
    }catch(err) {
        console.log(err);
    }
}