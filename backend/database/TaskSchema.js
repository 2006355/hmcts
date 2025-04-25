//import { identity } from 'lodash';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

const TaskModel = mongoose.model('Task', TaskSchema);
// Removed deprecated createIndexes method
export default TaskModel;