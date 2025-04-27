
import React, { useState, useEffect } from "react";

function Card() {
    const [tasks, setTasks] = useState([]); // State to store all tasks
    const [task, setTask] = useState({
        _id: "",
        title: "",
        description: "",
        status: "",
        dueDate: ""
    });
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [isCreating, setIsCreating] = useState(false); // State to toggle create mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/task');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched tasks:", data);
                //get the last callback
                
                setTasks(data); // Store all tasks in the `tasks` state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/task/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Task deleted successfully');
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove the deleted task from the state
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    };

    const handleEditToggle = (task) => {
        setIsEditing(true);
        setTask(task); // Set the selected task for editing
    };

    const handleCreateToggle = () => {
        setIsCreating(!isCreating); // Toggle create mode
        setTask({ title: "", description: "", status: "", dueDate:""}); // Reset task fields for new task
    };

    const handleCreate = () => {
        const { _id, ...taskWithoutId } = task; // Exclude _id from the task object
        fetch('http://localhost:8000/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskWithoutId) // Send task without _id
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task created successfully:', data);
            setTasks((prevTasks) => [...prevTasks, data]); // Add the new task to the state
            setIsCreating(false); // Exit create mode after successful creation
        })
        .catch(error => {
            console.error('Error creating task:', error);
        });
    };

    const handleSave = () => {
        fetch(`http://localhost:8000/task/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task updated successfully:', data);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t._id === data._id ? data : t)) // Update the task in the state
            );
            setIsEditing(false); // Exit edit mode after successful save
        })
        .catch((error) => {
            console.error('Error updating task:', error);
        });
    };

    return (
        <>
            {isCreating ? (
                // Create mode: Render input fields for new task
                <>
                    <h2>Create New Task</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={task.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={task.description}
                        onChange={handleInputChange}
                    />
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input type="date" name="dueDate" onChange={handleInputChange} />
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={handleCreateToggle}>Cancel</button>
                </>
            ) : isEditing ? (
                // Edit mode: Render input fields for editing task
                <>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleInputChange}
                    />
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleInputChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input type="date" name="dueDate" value={task.dueDate} onChange={handleInputChange} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                // View mode: Render all tasks
                <>
                    <h1>Tasks</h1>
                    {tasks.map((task) => (
                        <div key={task._id} className="task-card">
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <button onClick={() => handleEditToggle(task)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={handleCreateToggle}>Create New Task</button>
                </>
            )}
        </>
    );
}

export default Card;
