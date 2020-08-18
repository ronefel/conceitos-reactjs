import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: 'Título',
      url: 'url-do-repositorio',
      techs: ['Node.js', 'Express'],
    });
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    const repo = repositories;
    await api.delete(`/repositories/${id}`);

    const index = repo.findIndex((repository) => repository.id === id);
    repo.splice(index, 1);

    setRepositories([...repo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
