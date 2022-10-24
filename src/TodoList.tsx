import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id)
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>


    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        }
        setTitle('')
    }
    const onChangeSetLocalTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    const onKeyDownEnterAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onClickAddTask()

    /* const onClickChangeFilterAll = () => () => props.changeFilter('all')
     const onClickChangeFilterActive = () => () => props.changeFilter('active')
     const onClickChangeFilterCompleted = () => () => props.changeFilter('completed')*/


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onKeyDownEnterAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            {tasksJSXItemsList}
            <div>
                <button
                    onClick={changeFilterHandlerCreator('all')}
                >All
                </button>
                <button
                    onClick={changeFilterHandlerCreator('active')}
                >Active
                </button>
                <button
                    onClick={changeFilterHandlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;