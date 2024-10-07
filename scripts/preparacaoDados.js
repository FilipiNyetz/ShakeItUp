export function prepararDados(drinks) {
    // Obter categorias e bases únicas
    const categoriasUnicas = [...new Set(drinks.map(drink => drink.drinkCategory))];
    const basesUnicas = [...new Set(drinks.map(drink => drink.drinkBase))];

    return drinks.map(drink => {
        // One-hot encoding para a categoria
        const categoriaIndex = categoriasUnicas.indexOf(drink.drinkCategory);
        const categoriaEncoding = Array(categoriasUnicas.length).fill(0);
        categoriaEncoding[categoriaIndex] = 1;

        // One-hot encoding para a base
        const baseIndex = basesUnicas.indexOf(drink.drinkBase);
        const baseEncoding = Array(basesUnicas.length).fill(0);
        baseEncoding[baseIndex] = 1;

        // Retornar uma lista que combina as representações codificadas
        return [...categoriaEncoding, ...baseEncoding];
    });
}
