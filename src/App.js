import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  const [repositories, setRepositories] = useState([]); 

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: 'Novo Repo',
      url: 'teste',
      techs: ['teste', 'teste']
    })

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
          { repositories.map(repository => (
                <li key={repository.id}> 
                  {repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                     Remover 
                  </button>
                </li> 
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
