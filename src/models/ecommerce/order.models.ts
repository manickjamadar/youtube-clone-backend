import mongoose, { Model } from 'mongoose';
import Product from './product.models';
import User from './user.models';
export interface IOrderAddress {
    state: string;
    country: string;
    zipcode: number;
    location: string;
    landmark: string;
    city: string;
    contactNumber: number;
}
const orderAddressSchema = new mongoose.Schema<IOrderAddress>({
    city: { type: String },
    state: { type: String },
    country: { type: String, required: true },
    zipcode: { type: Number },
    location: { type: String, required: true },
    landmark: { type: String },
    contactNumber: { type: Number, required: true },
}, { _id: false })
export interface OrderItemProperties {
    totalPrice: number;
}
export interface IRawOrderItem {
    quantity: number;
    productId: mongoose.Types.ObjectId,
    productPrice: number;
}
export interface IOrderItem extends IRawOrderItem, OrderItemProperties { }
const orderItemSchema = new mongoose.Schema<IRawOrderItem, {}, {}, {}, OrderItemProperties>({
    quantity: { type: Number, default: 1, min: 1 },
    productPrice: { type: Number, required: true, min: 0 },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: Product.modelName },
}, {
    _id: false,
    virtuals: {
        totalPrice: {
            get: function () {
                return this.productPrice * this.quantity;
            }
        }
    }
})
export enum OrderStatus {
    Placed = "PLACED",
    Dispatched = "DISPATCHED",
    Shipped = "SHIPPED",
    outForDevlivery = "OUT_FOR_DELIVERY",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED",
}
export enum OrderPaymentMode {
    UPI = "UPI",
    Cash = "CASH",
    NetBanking = "NET_BANKING",
    Card = "CARD"
}
export interface IOrder {
    items: IOrderItem[];
    status: OrderStatus;
    paymentMode: OrderPaymentMode;
    customerId: mongoose.Types.ObjectId,
    address: IOrderAddress;
}
export interface OrderProperties {
    totalPrice: number;
}
export interface OrderModel extends Model<IOrder, {}, {}, OrderProperties> { }

const orderSchema = new mongoose.Schema<IOrder, OrderModel, {}, {}, OrderProperties>({
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Placed,
    },
    paymentMode: {
        type: String,
        enum: Object.values(OrderPaymentMode),
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.modelName,
    },
    address: {
        type: orderAddressSchema
    },
    items: [orderItemSchema]
}, {
    timestamps: true, virtuals: {
        totalPrice: {
            get: function () {
                return this.items.reduce((prev, item) => prev + item.totalPrice, 0)
            }
        }
    }
});
const Order = mongoose.model<IOrder, OrderModel>("Order", orderSchema);
export default Order;
