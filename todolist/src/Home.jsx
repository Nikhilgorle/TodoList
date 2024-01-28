import React, { useEffect, useState } from 'react'
import { BsCircleFill, BsFillCCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './create'
import './App.css'
import axios from 'axios'

function Home() {
    const [todos,setTodos]=useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/get")
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))

    }, [todos])

    const handleEdit = (id) => {
        axios.put(`http://localhost:5000/update/${id}`)
        .then(result => {location.reload()
        })
        .catch(err => console.log(err))
    }

    const HandleDelete = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then(result => {location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create/>
            {
                todos.length === 0
                ?
                <div><h2>No record</h2></div>
                :
                todos.reverse().map(todo => (
                    <div className='task' key={todo._id}> 
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? <BsFillCheckCircleFill></BsFillCheckCircleFill>
                            : <BsCircleFill className='icon' />
                            }
                            
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon' onClick={() => HandleDelete(todo._id)}/></span>   
                        </div>
                    </div>
                ))
            }
        </div>
    );
    
}

export default Home
