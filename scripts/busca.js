import { buscaAPI, dados} from "./requisicoes/buscaAPI.js";

const inputSearch = document.getElementById('search-input');
const btSearch = document.getElementById('search-button');
const results = document.querySelector('.results');

let drinkEncontrado = {};

async function buscarDrink() {
    const drinkName = inputSearch.value.trim();
    console.log(drinkName)
    if (drinkName) {
        await buscaAPI(drinkName);
        if (dados.drinks && dados.drinks.length > 0) {
            const drinkEncontrado = dados.drinks[0];
            construirResultado(drinkEncontrado);
            inputSearch.value=""
        } else {
            results.innerHTML = `
                <div class="landing">
                    <h2>Drink não encontrado ):!</h2>
                    <p>Tente buscar outro nome e aprenda a preparar um drink como um verdadeiro bartender!</p>
                </div>
            `;
            inputSearch.value=""
        }
    } else {
        results.innerHTML = `
            <div class="landing">
                <h2>Descubra o Segredo por Trás dos Melhores Drinks!</h2>
                <p>Digite o nome de um coquetel e aprenda a prepará-lo como um verdadeiro bartender. Explore receitas, ingredientes e técnicas para criar bebidas incríveis!</p>
            </div>
        `;
    }
}

btSearch.addEventListener('click',buscarDrink);

function construirResultado(drinkEncontrado) {
    // Limpa o conteúdo atual da seção de resultados
    results.textContent = "";

    // Cria o contêiner da descrição
    const descricaoContainer = document.createElement('div');
    descricaoContainer.className = "descricao";

    // Cria o contêiner de apresentação
    const apresentacaoContainer = document.createElement('div');
    apresentacaoContainer.className = "apresentacao";

    // Nome do drink
    const drinkName = document.createElement('h1');
    drinkName.textContent = drinkEncontrado['strDrink'];

    // Imagem do drink
    let urlImage = drinkEncontrado['strDrinkThumb'];
    const drinkImage = document.createElement('img');
    drinkImage.src = urlImage;
    drinkImage.alt = drinkEncontrado['strDrink'];

    // Adiciona nome e imagem ao contêiner de apresentação
    apresentacaoContainer.appendChild(drinkName);
    apresentacaoContainer.appendChild(drinkImage);

    // Cria o contêiner para os ingredientes
    const ingredientesContainer = document.createElement('div');
    ingredientesContainer.className = "ingredientes";

    const ingredientesTitulo = document.createElement('h1');
    ingredientesTitulo.textContent = "Ingredientes:";
    ingredientesContainer.appendChild(ingredientesTitulo);

    const ingredientesList = document.createElement('ul');
    const ingredientes = [];

    // Percorre os ingredientes e medidas do drink
    for (let i = 1; i <= 15; i++) {
        const ingrediente = drinkEncontrado[`strIngredient${i}`];
        const medida = drinkEncontrado[`strMeasure${i}`];
        if (ingrediente) {
            ingredientes.push(`${medida ? medida + ' ' : ''}${ingrediente}`);
        }
    }

    // Adiciona os ingredientes na lista
    ingredientes.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        ingredientesList.appendChild(listItem);
    });
    ingredientesContainer.appendChild(ingredientesList);

    const linhaDivisoria = document.createElement('hr');


    const preparoContainer = document.createElement('div');
    preparoContainer.className = "preparo";

    const preparoTitulo = document.createElement('h1');
    preparoTitulo.textContent = "Modo de Preparo:";

    const preparoDescricao = document.createElement('p');
    preparoDescricao.textContent = drinkEncontrado['strInstructions'];

    // Adiciona o título e a descrição de preparo ao contêiner
    preparoContainer.appendChild(linhaDivisoria);
    preparoContainer.appendChild(preparoTitulo);
    preparoContainer.appendChild(preparoDescricao);

    // Adiciona os elementos criados à div de descrição
    descricaoContainer.appendChild(apresentacaoContainer);
    descricaoContainer.appendChild(ingredientesContainer);

    // Adiciona a descrição e o preparo ao container de resultados
    results.appendChild(descricaoContainer);
    results.appendChild(preparoContainer);
    results.scrollIntoView({ behavior: 'smooth' });
}
