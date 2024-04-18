import mongoose, {Schema} from "mongoose";

const  bookingSchema = new Schema (
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        numbers: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false,
            default: "user"
        }
    },
    {timestamps: true}
)

const Booking = mongoose.Nbooking.User || mongoose.Nbooking("Booking", bookingSchema);
export default Booking;