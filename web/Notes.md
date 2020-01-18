## Módulo de React

### Anotações sobre o módulo de React

#### Os 3 principais conceitos do React

    * Componente -> Um bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação - Função que retorna que algum conteudo HTML;
    
    * Propriedade ou atributo -> acessar as propriedades utilizando o props
    
    * Estado -> Informações mantidas pelo componente (Imutabilidade)


#### Dicas:

    <> fragment -> utilizado para adicionar mais de um mesmo componente;

    * Iniciar o desenvolvimento da aplicação pelo layout e CSS e após implementar a parte do JS;


    Alterado a responsividade através do @media

    /*altera a resposividade para 1 item por linha quando form inferior a 650px de width*/
    @media (max-width: 650px){
    main ul {
        grid-template-columns: 1fr; 
    }
}
