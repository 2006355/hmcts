import React, { useState, useEffect } from "react";

function Card() {
    const [task, setTask] = useState({
        _id: "",
        title: "",
        description: "",
        status: ""
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
                console.log(data);
                const firstTask = data[0]; // Assuming you want to display the first task
                setTask({
                    _id: firstTask._id,
                    title: firstTask.title,
                    description: firstTask.description,
                    status: firstTask.status
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleDelete = () => {
        fetch(`http://localhost:8000/task/${task._id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Task deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // Toggle between view and edit mode
    };

    const handleCreateToggle = () => {
        setIsCreating(!isCreating); // Toggle create mode
        setTask({ title: "", description: "", status: "" }); // Reset task fields for new task
    };

    const handleCreate = () => {
        fetch('http://localhost:8000/task', {
            method: 'POST',
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
            console.log('Task created successfully:', data);
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
            setIsEditing(false); // Exit edit mode after successful save
        })
        .catch((error) => {
            console.error('Error updating task:', error);
        });
    };

    return (
        isCreating ? (
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
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </>
        ) : (
            // View mode: Render static elements
            <>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <button onClick={handleEditToggle}>Edit</button>
                <button onClick={handleCreateToggle}>Create New Task</button>
            </>
        )
    );
}

export default Card;
