import React , { useState , useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'; //nao precisa importar o index, pois por default ele sempre busca o index

function App() { 
  
  //Criando estados para latitude e longitude
  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');
  
  //Criando estados para github_username e techs
  const [ github_username, setGithubUserName ] = useState('');
  const [ techs, setTechs ] = useState('');
  
  const [devs, setDevs] = useState([]);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    },
    (err) => {
      console.log(err);
    },
    {
      timeout: 30000,
    }
  )
},[]);

useEffect(() => {
  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
    
  } 
  loadDevs();
},[]);

async function handleAddDev(e) {
  e.preventDefault(); //eliminando o comportamento padrão de enviar o usuário para uma outra tela
  const response = await api.post('/devs', {
    github_username,
    techs,
    latitude,
    longitude
  });

  //limpando os campos do formulário
  setGithubUserName(''); 
  setTechs('');

  setDevs([...devs, response.data]); //buscando o array de devs existente e adicionando o novo dev adicionado
};

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}> 
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
            name="github_username" 
            id="github_username" 
            required 
            value={github_username}
            onChange={e => setGithubUserName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
            name="techs" 
            id="techs" 
            required 
            value={techs}
            onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
              type="number" 
              name="latitude" 
              id="latitude" 
              required 
              value={latitude} 
              onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
              type="number" 
              name="longitude" 
              id="longitude" 
              required 
              value={longitude} 
              onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
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
