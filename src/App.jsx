import { useState } from 'react'
import './styles.css'

function App() {
    const [item, setItem] = useState("")
    const [todoList, setTodoList] = useState([])
    // {id, name, done}

    function handleSubmit (event) {
        event.preventDefault()
        setTodoList((currentTodoList) => {
            const newTodoList = [
                ...currentTodoList,
                {
                    id: crypto.randomUUID(),
                    name: item,
                    done: false
                }
            ]
            setItem('')
            return newTodoList
        })
        console.log(todoList)
    }

    return (
        <>
            <form className='new-item-form' onSubmit={handleSubmit}>
                <label htmlFor='item'>New Item</label>
                <input
                    type='text'
                    id='item'
                    value={item}
                    onChange={event => {
                        setItem(event.target.value)
                    }}
                />
                <button
                    type='submit'
                    className='btn'
                >Add</button>
            </form>
            <h1>Todo List</h1>
            <ul className='list'>
                <li>
                    <label>
                        <input type='checkbox' />
                        Item 1
                    </label>
                    <button className='btn-danger btn'>Delete</button>
                </li>
            </ul>
        </>
    )
}

export default App
