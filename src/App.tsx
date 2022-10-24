import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

// Read => part, pagination, filtration, sort

function App() {
    //BLL:
    const todoListTitle: string = 'What to learn'

    const result = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS & ES6', isDone: true},
        {id: 3, title: 'React & TS', isDone: false},
    ])

    console.log(result)
    const tasksForTodoList = result[0]
    const setTasksForTodoList = result[1]

    const removeTask = (taskId: number) => {
        setTasksForTodoList(tasksForTodoList.filter(task => task.id !== taskId))
        //console.log(tasksForTodoList)
    }
    const [filter, setFilter] = useState<FilterValueType>('completed')
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    let filteredTasks = tasksForTodoList;
    if (filter === 'active') {
        filteredTasks = tasksForTodoList.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasksForTodoList.filter(t => t.isDone === true)
    }

    //GUI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


