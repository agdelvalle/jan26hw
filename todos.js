const fs = require('fs/promises');
const express = require('express');
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toLocaleString()}`);
    next();
  };

app.use(loggerMiddleware);
app.use(express.json());

const todos = []

app.get('/todos', (req, res) => res.json(todos));

app.post('/todo', (req, res) => {
    let _id = 1;
    let task_date = new Date()

    const {taskname, description} = req.body; 

    const newTask = {
        id: _id++,
        date: task_date,
        taskname,
        description,
    };
    
    todos.push(newTask);
    return res.status(201).json(newTask);
})

app.delete('/todo/:id', (req, res) => {
    const {id} = req.body;

    let deleteIndex = todos.findIndex(task => task.id == id);
    todos.splice(deleteIndex, 1)

    return res.status(201).json(todos);
})

app.patch('/todo/:id', (req, res) => {
    const {id, editedTaskname, editedDesc} = req.body;

    todos.map((task) => {
        if(task.id == id){
            task.taskname = editedTaskname;
            task.description = editedDesc;
        }
    })

    return res.status(201).json(todos);
})

app.all('*', (req, res) =>
  res.status(404).json({
    message: 'Not found',
  })
);

// app.use(express.json());

// app.use('/todos', todoController)

app.listen(8999, () =>
  console.log('To-do api started at http://localhost:8999')
);
