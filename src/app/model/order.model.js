import { Schema, model , mongoose} from "mongoose"; 


const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
   
    createdAt: { type: Date, default: Date.now },
});




export const Order = model('Order', orderSchema);


