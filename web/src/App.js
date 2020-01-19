import React , { useState , useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'; //nao precisa importar o index, pois por default ele sempre busca o index
import DevForm from './components/DevForm'; //nao precisa importar o index, pois por default ele sempre busca o index

function App() { 
  const [devs, setDevs] = useState([]);

useEffect(() => {
  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
    
  } 
  loadDevs();
},[]);

async function handleAddDev(data) {
  // e.preventDefault(); //eliminando o comportamento padrão de enviar o usuário para uma outra tela
  const response = await api.post('/devs', data);

  setDevs([...devs, response.data]); //buscando o array de devs existente e adicionando o novo dev adicionado
};

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
        {devs.map(dev => (
          <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
