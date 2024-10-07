export let listaFiltroDrinks=[];

export async function carregarDrinksDoArquivo() {
    try {
        const response = await fetch('../drinks.json');
        listaFiltroDrinks = await response.json();
    } catch (error) {
        console.log("Falha na conexao:"+error);
    }
}