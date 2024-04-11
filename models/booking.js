import mongoose, {Schema} from "mongoose";

const  bookingSchema = new Schema (
    {
        
        day: {
            type: Date,
            required: true
        },
        status: {
            type: Boolean,
            required: false
        },
        adult: {
            type: int,
            required: true
        },
        child:{  type: int,
            required: true
        }
    },
    {timestamps: true}
)

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;