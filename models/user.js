import mongoose, {Schema} from "mongoose";

const  userSchema = new Schema (
    {   
      
       
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
        },
        resetToken: {
            type: String,
            required: true,
        },
        resetTokenExpiry: {
            type: Date,
            required: true,
        },
    },
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;