import { buscaPorIngredientes, drinks } from "./requisicoes/buscaIngrediente.js";

const ingredienteSpan = document.getElementById('ingrediente-buscado');
const img = document.querySelector('.img-selecionado');
const conteudo = document.querySelector('.text-content');
let drinksPorIngrediente=[];

window.onload = function() {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const ingrediente = searchParams.get("ingrediente");
    
    console.log(ingrediente)
   exibirInformacoes(ingrediente)
   descobrirDrinks(ingrediente)
};

function exibirInformacoes(ingredienteBuscado){
    switch(ingredienteBuscado){
        case 'Gin':
            ingredienteSpan.innerHTML=ingredienteBuscado.toUpperCase()
            conteudo.textContent=" O gin é uma bebida destilada que surgiu na Europa no século XVII, feita com zimbro e ervas. Conhecido por seu sabor fresco e aromático, varia conforme os botânicos utilizados. Com teor alcoólico em torno de 40%, é base de drinks clássicos como gin and tonic e martini."
            img.src = `/images/${ingredienteBuscado}.png`;
            break;
        case 'cachaça':
            ingredienteSpan.innerHTML=ingredienteBuscado.toUpperCase()
            conteudo.textContent="A cachaça é uma bebida brasileira feita a partir da fermentação do suco de cana-de-açúcar. Sua origem remonta ao século XVI, quando foi introduzida no Brasil pelos colonizadores portugueses. Pode ser clara ou envelhecida em barris de madeira, adquirindo sabores distintos. Com teor alcoólico entre 38% e 48%, é a base da famosa caipirinha e é apreciada pura ou em coquetéis."
            img.src = `/images/${ingredienteBuscado}.png`;
            break;
        case 'Vodka':
            ingredienteSpan.innerHTML=ingredienteBuscado.toUpperCase()
            conteudo.textContent="A vodka é uma bebida destilada de origem oriental, popularizada na Rússia e na Polônia. Tradicionalmente feita a partir de grãos ou batatas, é conhecida por seu sabor neutro e alta pureza. Com teor alcoólico geralmente entre 35% e 50%, a vodka é versátil em coquetéis, sendo a base de drinks clássicos como o martini e o cosmopolitan. É frequentemente consumida pura ou gelada."
            img.src = `/images/${ingredienteBuscado}.png`;
            break;
        case 'Vinho':
            ingredienteSpan.innerHTML=ingredienteBuscado.toUpperCase()
            conteudo.textContent="O vinho é uma bebida alcoólica feita a partir da fermentação do suco de uvas. Sua produção remonta a milhares de anos, com raízes em regiões como o Oriente Médio e a Europa. Os vinhos podem ser tintos, brancos ou rosés, dependendo das uvas e do processo de vinificação.Com uma ampla variedade de sabores e aromas, o vinho é apreciado em diversas culturas e ocasiões. Seu teor alcoólico geralmente varia entre 8% e 15%. É utilizado em drinks únicos e deliciosos."
            img.src = `/images/${ingredienteBuscado}.png`;
            break;
        case 'Whisky':
            ingredienteSpan.innerHTML=ingredienteBuscado.toUpperCase()
            conteudo.textContent="O whisky é uma bebida destilada feita a partir de grãos fermentados, como cevada, milho ou centeio, e originário de países como Escócia, Irlanda e Estados Unidos. Com teor alcoólico entre 40% e 50%, é conhecido por seu sabor robusto e complexo, frequentemente presente em drinks como Old Fashioned, Whiskey Sour, Manhattan, Mint Julep e Boulevardier. É apreciado puro, com gelo ou em coquetéis elaborados."
            img.src = `/images/${ingredienteBuscado}.png`;
            break;
        case 'Cerveja':
            ingredienteSpan.innerHTML=ingredienteBuscado.toUpperCase()
            conteudo.textContent="O licor é uma bebida alcoólica doce e aromatizada, feita a partir da destilação de frutas, ervas, especiarias ou flores, geralmente com teor alcoólico entre 15% e 30%. Originário da Europa, o licor é utilizado em diversos coquetéis e sobremesas, frequentemente presente em drinks como Irish Coffee, Bellini, Amaretto Sour e Mudslide. É apreciado puro, com gelo ou como ingrediente em várias receitas."
            img.src = `/images/${ingredienteBuscado}.webp`;
            break
    }
}

async function descobrirDrinks(ingredienteBuscado) {
    const drinksPorIngrediente = await buscaPorIngredientes(ingredienteBuscado);
    const drinksSelecionados = drinksPorIngrediente.slice(0, 6); // Seleciona os primeiros 6 drinks
    console.log(drinksSelecionados);
    exibirDrinks(drinksSelecionados) // Exibe os 6 drinks selecionados
    // Aqui você pode processar ou exibir os drinks como quiser
}

function exibirDrinks(drinks) {
    const section = document.querySelector('.cards-drinks'); 
    section.innerHTML = ''; // Limpa a seção antes de adicionar os novos cards

    drinks.forEach(drink => {
        // Cria o elemento de card
        const card = document.createElement('div');
        card.className = 'card-drink';

        // Cria o elemento de imagem
        const img = document.createElement('img');
        img.src = drink.strDrinkThumb; // Link da imagem do drink
        img.alt = drink.strDrink; // Nome do drink para o alt da imagem

        // Cria o título com o nome do drink
        const name = document.createElement('h3');
        name.className = 'drink-name';
        name.textContent = drink.strDrink; // Nome do drink

        // Adiciona a imagem e o nome ao card
        card.appendChild(img);
        card.appendChild(name);

        // Adiciona o card à seção
        section.appendChild(card);
    });
}
