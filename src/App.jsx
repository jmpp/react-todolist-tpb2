import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const data = JSON.parse(localStorage.getItem('reacttodo:taches')) || [];

  function saveToLocalStorage(taches) {
      localStorage.setItem('reacttodo:taches', JSON.stringify(taches));
  }

  const [taches, setTaches] = React.useState(data);

  function ajouterTache(nouvelleTache) {
      if (nouvelleTache.intitule.trim() === '') {
          return; // On s'arrête là
      }
      const stateTasks = [...taches, nouvelleTache];
      setTaches(stateTasks);
      saveToLocalStorage(stateTasks);
  }

  function onCheck(tacheCliquee) {
      setTaches([...taches]);
      tacheCliquee.faite = !tacheCliquee.faite;
      saveToLocalStorage(taches);
  }

  const restantes = taches.filter(t => t.faite === false).length;

  return (
      <div>
          <h1>Todolist React</h1>
          <p>Une todolist avec React JS</p>

          <p>{restantes}/{taches.length} tâches restantes</p>
                      
          <TodoForm nouvelleTache={ajouterTache} />
          <TodoList taches={taches} onCheck={onCheck} />
      </div>
  )
}

export default App;
