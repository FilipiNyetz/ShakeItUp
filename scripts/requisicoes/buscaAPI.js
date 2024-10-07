// requisicoes/buscaAPI.js
export let dados = [];

export async function buscaAPI(nomeDrink) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nomeDrink}`);
        dados = await response.json();
        console.log("Dados retornados:", dados); // Log dos dados recebidos
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}
