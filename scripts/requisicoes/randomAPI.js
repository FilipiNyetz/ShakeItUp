export let dados = []

export async function randomAPI() {
    try{
        const linkRandomAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        dados = await linkRandomAPI.json();
        return dados;
    }catch(error){
        console.log("Falha na conexão, tentar novamente");
    }
}