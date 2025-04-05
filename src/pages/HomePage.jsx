import { useState, useEffect } from "react"

import { Badge, Container, Button } from "react-bootstrap"

export const HomePage = () => {
    const [inputValue, setInputValue] = useState("")
    const [todos, setTodos] = useState([]);

    const getTodosList = () => {
        fetch("https://playground.4geeks.com/todo/users/Joan", {
            method: "GET",
        }).then((res) => {
            return res.json()
        }).then((response) => {
            setTodos(response.todos)
        })
    }

    useEffect(() => {
        getTodosList()
    }, [])

    const addNewTask =(text) => {
        const task = {
            label: text,
            is_done: false
        }
        fetch('https://playground.4geeks.com/todo/todos/Joan', {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => getTodosList())
    }

    const removeElements = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
            .then(() => getTodosList())
    }

    return (
        <Container className="mt-5">
            <Badge className="py-3 px-3 bg-success border rounded" style={{
                width: '100%',
            }}>
                <h1 className="mb-3 bg-success text-light d-flex align-items-center justify-content-start">To Do List</h1>
                <input
                    type="text"
                    placeholder="Write a new task"
                    value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                        if (e.code === "Enter" && inputValue.trim() !== "") {
                            addNewTask(inputValue);
                            setInputValue("");
                        };
                    }}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        width: '100%',
                    }}
                />
            </Badge>
            {todos.map((element) => {
                return (
                    <Container className="d-flex align-items-center">
                        <Container className="text-light mt-1 py-2 bg-success border rounded">{element.label}<Button
                            className="text-success float-end"
                            variant="light"
                            size="sm"
                            onClick={() => removeElements(element.id)}
                        ><strong>X</strong></Button></Container>
                    </Container>
                )
            })}
        </Container>

    );

};