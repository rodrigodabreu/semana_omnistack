import React, { useState } from 'react';

// 3 conceitos principais
// Componente -> Um bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação - Função que retorna que algum conteudo HTML
// Propriedade ou atributo -> acessar as propriedades utilizando o props
// Estado -> Informações mantidas pelo componente (Imutabilidade)
// <> fragment -> utilizado para adicionar mais de um mesmo componente

function App() { 
  const [counter, setCounter] = useState(0);

  function incrementCounter(){
    setCounter(counter + 1);
  }

  return (
    <>
    <h1>Contador: {counter}</h1>
    <button onClick= {incrementCounter}>Incrementar</button>
    </>
  );
};

export default App;
