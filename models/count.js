import mongoose, {Schema} from "mongoose";

const  countSchema = new Schema (
    {
        count: {
            type: Number,
            default: 0,
        }
       
    },
    {timestamps: true}
)

const CountModel = mongoose.models.Count || mongoose.model("Count", countSchema);
export default CountModel;