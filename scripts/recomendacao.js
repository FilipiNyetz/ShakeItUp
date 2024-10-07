import { prepararDados } from './preparacaoDados.js';
import { calcularKMeans } from './clusterizacao.js'; // Função para calcular os clusters
import { carregarDrinksDoArquivo, listaFiltroDrinks } from './requisicoes/carregarArquivoJSON.js';
import { buscaAPI, dados } from './requisicoes/buscaAPI.js';

const inputDrinkPreferido = document.querySelector('.search-input');
const btnRecomendar = document.querySelector('.search-button');
let drinkEscolhido;

const categoriaPreferida = document.querySelector('.span-categoria');
const basePreferida = document.querySelector('.span-base');
// Variável para armazenar a lista de drinks

btnRecomendar.addEventListener('click', escolherDrink);

async function acessarJSON() {
    await carregarDrinksDoArquivo();
    
}
acessarJSON()

function escolherDrink() {
    drinkEscolhido = inputDrinkPreferido.value;
    console.log(drinkEscolhido)
    
    const drinkExiste=listaFiltroDrinks.find(drink=>drink.drinkName==drinkEscolhido)
    if(drinkExiste){
        const dadosPreparados=prepararDados(listaFiltroDrinks);
        const drinksRecomendados = recomendarDrink(drinkEscolhido, listaFiltroDrinks, dadosPreparados);

        categoriaPreferida.innerHTML=`${drinkExiste[`drinkCategory`]}`.toUpperCase()
        basePreferida.innerHTML=`   ${drinkExiste[`drinkBase`]}`.toUpperCase()

        gerarItensRecomendacao(drinksRecomendados)
    }else{
        console.log("drink nao existe")
    }
    inputDrinkPreferido.value=""
}

async function gerarItensRecomendacao(recomendacoes) {
    const nomesDrinksRecomendados = recomendacoes.map(elemento => elemento.drinkName);

    // Limpa a lista antes de adicionar novos elementos
    const listaRecomendados = document.querySelector('.drinks-recomendados');
    listaRecomendados.innerHTML = '';

    for (let i = 0; i < nomesDrinksRecomendados.length; i++) {
        await buscaAPI(nomesDrinksRecomendados[i]);
        // Chama a função para exibir cada drink
        exibirNaTela(dados.drinks[0]);
    }
}

function exibirNaTela(drink) {
    console.log(drink);

    // Seleciona a section que contém a lista de recomendados
    let section = document.querySelector('.drinks-recomendados');
    
    // Verifica se a <ul> já existe, se não, cria e adiciona à <section>
    let drinksRecomendados = section.querySelector('.cards-drinks');
    if (!drinksRecomendados) {
        drinksRecomendados = document.createElement('ul');
        drinksRecomendados.classList.add('cards-drinks');
        section.appendChild(drinksRecomendados);
    }

    // Cria o card como um elemento <li> para cada drink recomendado
    const liDrink = document.createElement('li'); // Cria um novo <li>
    liDrink.classList.add('card-drink'); // Adiciona a classe de estilização do card

    // Adiciona a imagem do drink
    const urlImage = drink['strDrinkThumb'];
    const drinkImage = document.createElement('img');
    drinkImage.src = urlImage;
    drinkImage.alt = drink['strDrink'];
    liDrink.appendChild(drinkImage);

    // Adiciona o nome do drink
    const drinkName = document.createElement('h3');
    drinkName.textContent = drink['strDrink'];
    liDrink.appendChild(drinkName);

    // Cria a div para as informações adicionais (categoria e base)
    const infos = document.createElement('div');
    infos.classList.add('infos');

    // Categoria do drink
    const drinkCategory = document.createElement('p');
    drinkCategory.classList.add('info-categoria');
    drinkCategory.innerHTML = `Categoria: <span class="info-categoria">${drink["strCategory"]}</span>`;
    
    // Base do drink
    const drinkBase = document.createElement('p');
    drinkBase.classList.add('info-base');
    drinkBase.innerHTML = `Base: <span class="info-base">${drink["strIngredient1"] || 'N/A'}</span>`; // Verifique a chave correta

    // Adiciona a categoria e a base ao contêiner de infos
    infos.appendChild(drinkCategory);
    infos.appendChild(drinkBase);

    // Adiciona o contêiner de infos ao <li> do drink
    liDrink.appendChild(infos);

    // Adiciona o <li> do drink à <ul> de cards recomendados
    drinksRecomendados.appendChild(liDrink);
    drinksRecomendados.scrollIntoView({ behavior: 'smooth' });
}




function recomendarDrink(drinkEscolhido, listaFiltroDrinks, dadosPreparados) {
    const index = listaFiltroDrinks.findIndex(drink => drink.drinkName === drinkEscolhido);
    if (index === -1) return []; // Se o drink não for encontrado, retorne um array vazio

    const clusters = calcularKMeans(dadosPreparados);
    const resultadoCluster = [];
    const recommendedDrinks = []; // Usar um array normal para armazenar as recomendações

    const drinkSelecionado = listaFiltroDrinks[index];
    const categoriaSelecionada = drinkSelecionado.drinkCategory;
    const baseSelecionada = drinkSelecionado.drinkBase;

    Object.values(clusters).forEach(cluster => {
        if (cluster.includes(index)) {
            cluster.forEach(drinkIndex => {
                if (drinkIndex !== index) {
                    const drinkRecomendado = listaFiltroDrinks[drinkIndex];
                    if (drinkRecomendado.drinkCategory === categoriaSelecionada && drinkRecomendado.drinkBase === baseSelecionada) {
                        resultadoCluster.push({
                            drinkName: drinkRecomendado.drinkName,
                            drinkCategory: drinkRecomendado.drinkCategory,
                            drinkBase: drinkRecomendado.drinkBase
                        });
                    }
                }
            });
        }
    });

    const randomIndex = Math.floor(Math.random() * resultadoCluster.length);
    if (resultadoCluster.length > 3) {
        recommendedDrinks.push(...resultadoCluster.slice(randomIndex, randomIndex + 3));
    } else {
        recommendedDrinks.push(...resultadoCluster);
    }

    return recommendedDrinks;
}




