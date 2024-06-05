const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String, 
        required:[true,'Task title is required']
        
    }, 
    description: {
        type:String, 
        // required:[true,'Task description is required'],

    },
     isCompleted: {
        type:Boolean, 
        required:[true,'is completed is required'],
    }
    ,Date:{
        type:Date, 
        required:[true, 'Date is required'], 

        default:Date(new Date())

    }, 
     user: {type: mongoose.Schema.Types.ObjectId ,ref: 'User', required: true}

})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task;