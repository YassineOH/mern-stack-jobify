import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        require: [true, "please provide company name"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "please provide position"],
        maxlength: 200
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "remote", "internship"],
        default: "full-time"
    },
    jobLocation: {
        type: String,
        default: "my city",
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "please provide User"]
    }
}, { timestamps: true })


export default mongoose.model("Job", JobSchema)