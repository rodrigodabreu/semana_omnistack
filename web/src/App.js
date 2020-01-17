import React from 'react';
import Header from './Header';

// 3 conceitos principais
// Componente -> Um bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação - Função que retorna que algum conteudo HTML
// Propriedade ou atributo -> acessar as propriedades utilizando o props
// Estado -> 
// <> fragment -> utilizado para adicionar mais de um mesmo componente

function App() { 
  return (
    <> 
    <Header title="Meu painel1"/>
    <Header title="Meu painel2"/>
    <Header title="Meu painel3"/>
    </>
  );
};

export default App;
