const mockData = [
    {
        id: 'todo',
        title: 'To Do',
        tasks: [
            { id: 'task-1', title: 'Order coffee beans', person: 'Barista' },
            { id: 'task-2', title: 'Clean the espresso machine', person: 'Cleaner' },
            { id: 'task-3', title: 'Restock milk', person: 'Barista' }
        ]
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        tasks: [
            { id: 'task-4', title: 'Prepare espresso shots', person: 'Barista' },
            { id: 'task-5', title: 'Brew drip coffee', person: 'Barista' }
        ]
    },
    {
        id: 'done',
        title: 'Done',
        tasks: [
            { id: 'task-6', title: 'Serve coffee to customers', person: 'Barista' },
            { id: 'task-7', title: 'Clean the coffee shop', person: 'Cleaner' }
        ]
    }
];

export default mockData;
