// App.jsx
import './App.scss';
import Kanban from './components/kanban';

function App() {
    return (
        <div className="notion-board" style={{ padding: '50px' }}>
            <h1 style={{ marginBottom: '20px', color: '#000' }}>
                Notion Board
            </h1>
            <Kanban />
        </div>
    );
}

export default App;
