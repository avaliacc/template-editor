import './App.css';
import Editor from './pages/editor'
import EditorOrigin from './pages/editorOrigin'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        monaco模板编辑器
      </header>
      <EditorOrigin></EditorOrigin>
    </div>
  );
}

export default App;
