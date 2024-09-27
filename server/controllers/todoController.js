import todoModel from "../models/todoModel.js";

const getAllTask = async (req, res) => {
    try {
        const data = await todoModel.find({});
        res.status(200).json(data)
    } catch(error) {
        res.status(500).json({message: error.message});
    }
    //res.status(200).send(req.body);
    //console.log(req.body);

};

const getAllActiveTask = async (req, res) => {
    try {
        const data = await todoModel.find({"completed": false});
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const getAllCompletedTask = async (req, res) => {
    try {
        const data = await todoModel.find({"completed": true});
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const addTask = async (req, res) => {
    const data = new todoModel({
        task: req.body.task,
        completed: req.body.completed
    })
    try {
        const dataToCreate = await data.save();
        console.log(dataToCreate);
        res.status(200).json({message: "Task added succesfully!", resData: dataToCreate});
    } catch(error) {
        res.status(400).json({message: error.message});
    }
    //res.status(201).send(req.body);
    //console.log(req.body);
}


const removeTask = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await todoModel.findByIdAndDelete(id);
        console.log(data);
        res.send(`Task: ${data.task} has been deleted`);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Toggle task to be completed or active
const completeTask = async (req, res) => {
    try {
        const id = req.params.id;
        //console.log(id);
        const updatedData = req.body;
        //console.log(req.body);
        //Return updated document
        const options = {new: true};
        const result = await todoModel.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(result);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
    
    //res.status(200).send("Update by ID")
    //console.log(req.body);
}

//Change the task description
const editTask = async (req, res) => {
    try {
        const id = req.params.id;
        //console.log(id);
        const updatedData = req.body;
        //console.log(req.body);
        const options = {new: true};
        const result = await todoModel.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(result);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}

export {getAllTask, getAllActiveTask, getAllCompletedTask, addTask, removeTask, completeTask, editTask}