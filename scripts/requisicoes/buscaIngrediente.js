export let drinks = [];

export async function buscaPorIngredientes(ingrediente) {
    try {
        const buscaAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
        drinks = await buscaAPI.json();
        console.log(drinks.drinks.slice(0, 8)); // Exibe os primeiros 8 drinks no console
        return drinks.drinks; // Retorna os drinks encontrados
    } catch (error) {
        console.error("Erro ao buscar drinks:", error);
        return [];
    }
}


