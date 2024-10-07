# Recomendador e promotor de Drinks

## Descrição

Este projeto é uma aplicação web que utiliza HTML, CSS , JavaScript e Node.JS para consumir diversos endpoints da API **TheCocktailDB**. O foco principal foi desenvolver uma aplicação funcional que permite a busca e exploração de uma ampla gama de drinks, priorizando a experiência do usuário. Além de implementar um algoritmo K-means de recomendação, no qual indica para o usuário qual drink seria recomendado com base na sua escolha, levando em conta os parâmetros de categoria e base.

## Funcionalidades

- **Recomendações de drinks:** Realiza a recomendaçaõ de drinks, com base na sugestão do usuário, utilizando algoritmo K-means
- **Buscas Parametrizadas:** Realize buscas específicas para encontrar drinks de acordo com suas preferências.
- **Consultas por Categorias:** Explore drinks por diferentes categorias, facilitando a descoberta de novas receitas.
- - **Filtragem Aleatória:** Filtre listas de drinks aleatoriamente, criando índices aleatórios para sugestões inesperadas.
- **Interface Simples e Intuitiva:** A aplicação foi projetada com um foco em funcionalidade, permitindo uma navegação fácil e direta.
  

## Tecnologias Utilizadas

![HTML](https://img.shields.io/badge/HTML5-F16529?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TheCocktailDB](https://img.shields.io/badge/TheCocktailDB-FF6F20?style=flat&logo=database&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)


## Endpoints Usado
- **Busca por todos os drinks com uma mesma letra:** www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}
- **Busca por nomes:** www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}
- **Filtro por categoria:** www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic
- **Filtro aleatorio:** www.thecocktaildb.com/api/json/v1/1/random.php

## NODE.JS e JSON
Criei um arquivo JSON usando Node.js para armazenar dados extraídos de uma API. Realizei buscas no endpoint que permite consultar pela primeira letra, percorrendo o alfabeto e consolidando as respostas em uma lista única. As informações filtradas foram salvas em um JSON, o que otimizou o desempenho do meu algoritmo K-Means de recomendação, facilitando o mapeamento e tornando o processo mais ágil.
