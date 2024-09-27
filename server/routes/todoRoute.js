//import express
import express from "express";
import {getAllTask, getAllActiveTask, getAllCompletedTask, addTask, removeTask, completeTask, editTask} from "../controllers/todoController.js"

//Create an instance of router
const router = express.Router();

//GET - List all todo task
router.get("/getAllTask", getAllTask);

//GET - List all active task
router.get("/getAllActiveTask", getAllActiveTask);

//GET - List all completed task
router.get("/getAllCompletedTask", getAllCompletedTask);

//Create - Add a todo task
router.post("/addTask", addTask);

//Delete - Remove a todo task
router.delete("/removeTask/:id", removeTask);

//Patch - Complete a task
router.patch("/completeTask/:id", completeTask);

//Patch - Edit a task
router.patch("/editTask/:id", editTask);



export default router;