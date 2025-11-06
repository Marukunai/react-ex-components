/**
 * Simula un càlcul molt costós que bloqueja la UI
 * @param {number} num - Un número d'entrada.
 * @returns {number} - Un resultat calculat.
 */
export function heavyCalculation(num) {
    console.log('⏰ Iniciant càlcul costós...');
    
    // Simulem la lentitud amb un bucle molt gran
    let result = 0;
    for (let i = 0; i < 2_000_000_000; i++) {
        result += Math.sqrt(num) / 1.000000000001;
    }
    
    console.log('✅ Càlcul costós finalitzat.');
    return Math.floor(result * num);
}