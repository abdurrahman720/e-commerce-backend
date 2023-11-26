import { Schema, model , mongoose} from "mongoose"; 


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product must have a name"],
    },
    description: {
        type: String,
        required: [true, "Product must have a description"],
    },
    price: {
        type: Number,
        required: [true, "Product must have a price"],
    },
    brand: {
        type: String,
        required: [true, "Product must have a brand"],
    },
    category: {
        type: String,
        required: [true, "Product must have a category"]
    },
    inStock: {
        type: Boolean,
        default: true
    },
    images: [{
        colorCode: String, //need to clarification how images will be stored. colorCode or variant
        image: String //base64
    }],
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'review'
        }
    ],
    thumbnail: String //base64


}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
      },
});

productSchema.pre('save', function (next) {
    if (!this.thumbnail && this.images.length > 0) {
        this.thumbnail = this.images[0];
    }
    next();
})


export const Product = model('Product', productSchema);


