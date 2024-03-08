import React, { useState } from 'react';
import './kanban.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import mockData from '../../mockData';
import Card from '../card';

const Kanban = () => {
    const [data, setData] = useState(mockData);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDeadline, setNewTaskDeadline] = useState('');

    const onDragEnd = result => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const newData = [...data];
            const sourceColIndex = newData.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = newData.findIndex(e => e.id === destination.droppableId);

            const sourceCol = newData[sourceColIndex];
            const destinationCol = newData[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            const [removed] = sourceTask.splice(source.index, 1);
            destinationTask.splice(destination.index, 0, removed);

            newData[sourceColIndex].tasks = sourceTask;
            newData[destinationColIndex].tasks = destinationTask;

            setData(newData);
        }
    };

    const addTask = (sectionId) => {
        if (!newTaskTitle.trim()) {
            alert("Task title cannot be empty!");
            return;
        }

        const newData = [...data];
        const sectionIndex = newData.findIndex(e => e.id === sectionId);
        const newTask = {
            id: `task-${Date.now()}`,
            title: newTaskTitle,
            deadline: newTaskDeadline 
        };
        newData[sectionIndex].tasks.push(newTask);
        setData(newData);
        setNewTaskTitle('');
        setNewTaskDeadline('');
    };

    const deleteTask = (sectionId, taskId) => {
        const newData = [...data];
        const sectionIndex = newData.findIndex(e => e.id === sectionId);
        const updatedTasks = newData[sectionIndex].tasks.filter(task => task.id !== taskId);
        newData[sectionIndex].tasks = updatedTasks;
        setData(newData);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    <div className="kanban__section__title">
                                        {section.title} ({section.tasks.length})
                                    </div>
                                    <div className="kanban__section__content">
                                        {
                                            section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <Card>
                                                                <div className="task-container">
                                                                    <div>{task.title}</div>
                                                                    <div className="task-deadline">{task.deadline}</div> {/* Display deadline */}
                                                                    <button className="delete-button" onClick={() => deleteTask(section.id, task.id)}>Delete</button>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        <input
                                            type="text"
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                            placeholder="Enter task title"
                                        />
                                        <input
                                            type="date"
                                            value={newTaskDeadline}
                                            onChange={(e) => setNewTaskDeadline(e.target.value)}
                                            placeholder="Select deadline" // Use a date input for selecting the deadline
                                        />
                                        <button className="add-button" onClick={() => addTask(section.id)}>Add Task</button>

                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
};

export default Kanban;
