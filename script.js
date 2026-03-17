function calcular() {
    // 1. Captura de Dados
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const genero = document.getElementById('genero').value;

    // Validação
    if (!peso || !altura || !idade) {
        alert("Ops! Preencha todos os campos para o cálculo.");
        return;
    }

    // 2. Interface: Esconde resultados anteriores e mostra carregando
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    // 3. Processamento (Simulando atraso para efeito visual)
    setTimeout(() => {
        const alturaM = altura / 100;
        
        // IMC e Classificação
        const imc = (peso / (alturaM * alturaM)).toFixed(2);
        let infoImc = classificarIMC(imc);

        // TMB (Harris-Benedict)
        let tmb = (genero === 'masculino')
            ? 66.5 + (13.75 * peso) + (5.003 * altura) - (6.75 * idade)
            : 655.1 + (9.563 * peso) + (1.850 * altura) - (4.676 * idade);

        // Água e Peso Ideal
        const agua = (peso * 35) / 1000;
        const pesoIdeal = (22 * (alturaM * alturaM)).toFixed(1);

        // 4. Exibição final
        document.getElementById('loading').classList.add('hidden');
        const resDiv = document.getElementById('resultado');
        resDiv.classList.remove('hidden');
        resDiv.classList.add('fade-in');

        document.getElementById('res-imc').innerHTML = `<strong>IMC:</strong> ${imc} - <span style="color:${infoImc.cor}">${infoImc.texto}</span>`;
        document.getElementById('res-tmb').innerHTML = `<strong>TMB:</strong> ${Math.round(tmb)} kcal/dia`;
        document.getElementById('res-agua').innerHTML = `<strong>Água recomendada:</strong> ${agua.toFixed(2)}L/dia`;
        document.getElementById('res-ideal').innerHTML = `<strong>Peso Ideal (IMC 22):</strong> ${pesoIdeal}kg`;

    }, 1200);
}

function classificarIMC(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso", cor: "#3498db" };
    if (imc < 25) return { texto: "Peso Normal", cor: "#2ecc71" };
    if (imc < 30) return { texto: "Sobrepeso", cor: "#f1c40f" };
    if (imc < 35) return { texto: "Obesidade Grau I", cor: "#e67e22" };
    if (imc < 40) return { texto: "Obesidade Grau II", cor: "#e74c3c" };
    return { texto: "Obesidade Grau III", cor: "#c0392b" };
}

function limparCampos() {
    // Limpa inputs
    document.getElementById('peso').value = "";
    document.getElementById('altura').value = "";
    document.getElementById('idade').value = "";
    document.getElementById('genero').selectedIndex = 0;

    // Esconde resultados
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('resultado').classList.remove('fade-in');
    
    // Foco inicial
    document.getElementById('peso').focus();
}