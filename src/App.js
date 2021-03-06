import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(repositories => {
      setRepositories(repositories.data);
    })
  }, []);
  
  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/Garcez17",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    const newRepository = await api.post('repositories', repository)

    setRepositories([...repositories, newRepository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter(repository => repository.id !== id)

    setRepositories(filteredRepositories)
  }
  return (
    <div>
      <ul data-testid="repository-list" >
      {repositories.map(repository => (
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
