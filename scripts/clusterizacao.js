export function calcularKMeans(dadosPreparados, numeroClusters = 3) {
    // Escolher centróides a partir de pontos de dados existentes
    const centroids = [];
    const selectedIndices = new Set();

    while (centroids.length < numeroClusters) {
        const randomIndex = Math.floor(Math.random() * dadosPreparados.length);
        if (!selectedIndices.has(randomIndex)) {
            centroids.push([...dadosPreparados[randomIndex]]);
            selectedIndices.add(randomIndex);
        }
    }

    let previousAssignments = [];
    let assignments = new Array(dadosPreparados.length).fill(-1);
    let converged = false;

    while (!converged) {
        // Atribuição de clusters
        for (let i = 0; i < dadosPreparados.length; i++) {
            const distances = centroids.map(centroid => {
                return Math.sqrt(centroid.reduce((sum, value, index) => sum + Math.pow(value - dadosPreparados[i][index], 2), 0));
            });
            assignments[i] = distances.indexOf(Math.min(...distances));
        }

        // Atualização dos centróides
        centroids.forEach((centroid, index) => {
            const clusterPoints = dadosPreparados.filter((_, pointIndex) => assignments[pointIndex] === index);
            if (clusterPoints.length > 0) {
                centroids[index] = centroid.map((_, i) => clusterPoints.reduce((sum, point) => sum + point[i], 0) / clusterPoints.length);
            }
        });

        // Verificar convergência
        converged = assignments.every((value, index) => value === previousAssignments[index]);
        previousAssignments = [...assignments];
    }

    // Organizar a atribuição dos pontos por cluster
    const clusters = {};
    assignments.forEach((assignment, index) => {
        if (!clusters[assignment]) {
            clusters[assignment] = [];
        }
        clusters[assignment].push(index);
    });

    return clusters; // Retorna um objeto com clusters
}
