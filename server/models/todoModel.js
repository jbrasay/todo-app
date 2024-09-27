//import mongoose
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: {
        required: true,
        type: String
    },
    completed: {
        required: true,
        type: Boolean
    }
});

const todoModel = mongoose.model("Task", todoSchema);

export default todoModel;