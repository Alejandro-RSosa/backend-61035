import { Schema, model } from "mongoose";

const cartCollectionName = "carts";

const cartSchema = new Schema ({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            default: []
        }
    ]
});

cartSchema.pre('find', function(){
    this.populate('products')
})

export const CartModel = model(cartCollectionName, cartSchema);
