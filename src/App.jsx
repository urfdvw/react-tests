import { useEffect, useState } from 'react'
import './styles.css'

function App() {
    const [item, setItem] = useState("")
    const [todoList, setTodoList] = useState(() => {
        const localTodoList = localStorage.getItem('todoList')
        return localTodoList ? JSON.parse(localTodoList) : []
    }) // {id, name, done}
    

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }, [todoList])

    function handleSubmit(event) {
        event.preventDefault()
        setTodoList((currentTodoList) => {
            if (item.length === 0) {
                return currentTodoList
            }
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
    }

    function handleToggle(event) {
        setTodoList(
            currentTodoList => currentTodoList.map(
                todo => todo.id !== event.target.closest("li").id ? todo : {
                    ...todo, done: !todo.done
                }
            )
        )
    }

    function handleDelete(event) {
        setTodoList(
            currentTodoList => currentTodoList.filter(
                todo => todo.id !== event.target.closest("li").id
            )
        )
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
                {todoList.length === 0 ? "No Todos" : ""}
                {todoList.map(x => (
                    <li key={x.id} id={x.id}>
                        <label>
                            <input
                                type='checkbox'
                                checked={x.done}
                                onChange={handleToggle}
                            />
                            {x.name}
                        </label>
                        <button className='btn-danger btn' onClick={handleDelete}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
