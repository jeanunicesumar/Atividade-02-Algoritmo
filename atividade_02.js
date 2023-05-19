let matrizNumero = new Array(10);
let numerosUtilizados = [];
let vetorPares = [];
let vetorPrimos = [];
let x, y, numeroSorteado;
let tabela = document.getElementById('tabela');
let tabelaInfo = document.getElementById('info');


function adicionarValorTabela() {
    for (x = 0; x < 10; x++) {
        matrizNumero[x] = new Array(10);
        for (y = 0; y < 10; y++) {
            do {
                numeroSorteado = pegarNumero(1, 1001);
            } while(verificaNumero(numeroSorteado));
            matrizNumero[x][y] = numeroSorteado;
            numerosUtilizados.push(numeroSorteado);
            verificaParPrimoIntersecao(matrizNumero[x][y]);
        }
    }

    if(vetorPares[0] == 2)
        vetorPrimos.push(vetorPares[0]);
}

function pegarNumero(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function verificaNumero(valor) {
    if(numerosUtilizados.find(element => element == valor))
        return true;

    return false;
}

function verificaParPrimoIntersecao(valor) {
    if (valor % 2 == 0) {
        ordenaVetor(vetorPares, valor, 'vetorPares');
        return;
    }
    
    if(verificaPrimo(valor))
        ordenaVetor(vetorPrimos, valor, 'vetorPrimo');
}

function verificaPrimo(valor) {
	let i;
    if (valor == 1)
        return false;
     
	for (i = 3; i < valor; i += 2) {
		if (valor % i == 0) {
			return false;
		}
	}
	return true;
}

function ordenaVetor(vetorOrdenado, valor, nomeVetor) {
	const tamanhoVetor = vetorOrdenado.length;
    let posicaoVetor;
    if (nomeVetor == 'vetorPrimo') {
        posicaoVetor = procuraValorVetor(vetorOrdenado, valor, tamanhoVetor, nomeVetor);    
    } else {
        posicaoVetor = procuraValorVetor(vetorOrdenado, valor, tamanhoVetor, nomeVetor);    
    }
    
	if (posicaoVetor == tamanhoVetor) {
		vetorOrdenado.push(valor);
		return vetorOrdenado;
	}

	vetorOrdenado.splice(posicaoVetor, 0, valor);
	return vetorOrdenado;
}

function procuraValorVetor(vetorProcurado, valor, tamanhoVetor, nomeVetor) {
	let i;
    if (nomeVetor == 'vetorPrimo') {
        for (i = 0; i < tamanhoVetor; i++) {
            if (valor > vetorProcurado[i]) {
                return i;
            }
        }
    } else {
        for (i = 0; i < tamanhoVetor; i++) {
            if (valor < vetorProcurado[i]) {
                return i;
            }
        }
    }
	
	return i;
}

function gerarTabela() {
    for (x = 0; x < 10; x++) {
        let div = document.createElement('div');
        for (y = 0; y < 10; y++) {
            if(matrizNumero[x][y] == 2) {
                div.innerHTML += `<span class="num-intersecao">${matrizNumero[x][y]}</span>`;    
            } else if (matrizNumero[x][y] % 2 == 0) {
                div.innerHTML += `<span class="num-par">${matrizNumero[x][y]}</span>`;    
            } else if (vetorPrimos.find(element => element == matrizNumero[x][y])) {
                div.innerHTML += `<span class="num-primo">${matrizNumero[x][y]}</span>`;
            } else {
                div.innerHTML += `<span>${matrizNumero[x][y]}</span>`;
            }
        }
        tabela.appendChild(div);
    }
    
}

function gerarPrimos() {
    tabelaInfo.innerHTML += `<div class="title-info"><h3>Números Primos:</h3></div>`;
    let div = document.createElement('div');
    div.classList.add('span-primos');
    vetorPrimos.forEach((item) => {
        div.innerHTML += `<span>${item}</span>`;
    });
    tabelaInfo.appendChild(div);
}

function gerarPares() {
    tabelaInfo.innerHTML += `<div class="title-info"><h3>Números Pares:</h3></div>`;
    let div = document.createElement('div');
    div.classList.add('span-pares');
    vetorPares.forEach((item) => {
        div.innerHTML += `<span>${item}</span>`;
    });
    tabelaInfo.appendChild(div);
}

function gerarIntersecao() {
    if(vetorPares[0] == 2) {
        tabelaInfo.innerHTML += `<div class="title-info"><h3>Interseção:</h3></div>`;
        let div = document.createElement('div');
        div.classList.add('span-intersecao');
        div.innerHTML += `<span>${vetorPares[0]}</span>`;
        tabelaInfo.appendChild(div);
    }
}

adicionarValorTabela();
gerarTabela();
gerarPrimos();
gerarPares();
gerarIntersecao();
