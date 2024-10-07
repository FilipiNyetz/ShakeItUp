import { randomAPI} from "./requisicoes/randomAPI.js";

const displayDrinksTela = document.querySelector('.indicacoes-drinks');

let drinks = [];
async function buscarDrinkAleatorio() {
    for (let i = 0; i < 9; i++) {
        let randomDrinks = await randomAPI(); // Chama a função e aguarda os resultados
        if (randomDrinks && randomDrinks.drinks && randomDrinks.drinks.length > 0) {
            drinks.push(randomDrinks.drinks[0]); // Adiciona o primeiro drink do array
            exibirDrinks(drinks);
        } else {
            console.log("Nenhum dado foi retornado.");
        }
    }
    console.log(drinks); // Exibe os dados no console
    
}

// Chame a função para buscar um drink aleatório
buscarDrinkAleatorio();

function exibirDrinks(drinks) {
    displayDrinksTela.innerHTML = ""; // Limpa a tela antes de exibir novos drinks

    drinks.forEach(item => {
        console.log(item);

        // Cria o contêiner principal do card
        const drinkCard = document.createElement('div');
        drinkCard.className = "card"; // Classe para estilização

        // Cria e adiciona a imagem do drink
        const drinkImage = document.createElement('div');
        drinkImage.className = "drink-image";
        const imgDrink = document.createElement('img');
        imgDrink.src = item['strDrinkThumb'];
        imgDrink.alt = item['strDrink']; // Alt com o nome do drink
        drinkImage.appendChild(imgDrink);

        // Cria o título do drink
        const drinkTitle = document.createElement('div');
        drinkTitle.className = "title"; // Classe para estilização
        drinkTitle.textContent = item.strDrink; // Acessa a propriedade strDrink

        // Cria a descrição (ingredientes)
        const ingredients = [];
        for (let i = 1; i <= 5; i++) {
            const ingredient = item[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }

        const drinkDescription = document.createElement('div');
        drinkDescription.className = "description"; // Classe para estilização
        drinkDescription.textContent = ingredients.join(', '); // Junta os ingredientes em uma string

        // Monta o card
        drinkCard.appendChild(drinkImage);
        drinkCard.appendChild(drinkTitle);
        drinkCard.appendChild(drinkDescription);

        // Adiciona o card à seção principal
        displayDrinksTela.appendChild(drinkCard);
    });
}

