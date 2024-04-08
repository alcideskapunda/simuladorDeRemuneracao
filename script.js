const salarioBruto = document.querySelector("#salarioBruto");
const btnEnvioDoSalario = document.querySelector("#envioDoSalario");
const table = document.querySelector('table')

const btnEnvioDasTaxasAlteradas = document.querySelector('#enviarDadosAlterados');

const salarioBrutoInput = document.querySelector('#salario_bruto_alterado');
const proLaboreInput = document.querySelector('#pro_labore_alterado');
const inssInput = document.querySelector('#inss_alterado');
const taxaAdmInput = document.querySelector('#taxa_adm_alterada');
const quotasInput = document.querySelector('#quotas_alterada');

// tableAlteradaSalario.value, tableAlteradaProLabore.value, tableAlteradaInss.value, tableAlteradaTaxaAdm.value, tableAlteradaQuotas.value

function calculoDoRemuneracao(valor) {
    const valorInput = parseFloat(valor);
    const proLabore = (valorInput * 0.11);
    const antecipacaoSobras = (valorInput - proLabore);
    const inss = (proLabore * 0.2)
    const irrt = verificaIrrf(valorInput) * proLabore;
    const taxaAdm = (valorInput / 40);
    const quotas = 10;
    const descontoT = inss + irrt + taxaAdm + quotas;
    const totalLiquido = valorInput - descontoT;
    const txAdm = (taxaAdm / 100);

    criacaoDaTabelaComOsDados(valorInput, proLabore, antecipacaoSobras, inss, irrt, taxaAdm, quotas, descontoT, totalLiquido, txAdm)
}

function calculoDoRemuneracaoComTaxaAlteradaPeloUser(salarioBruto, pro_labore, insS, taxa_adm, quotaS) {
    const valorInput = salarioBruto;
    const proLabore = (valorInput * (pro_labore / 100));
    const antecipacaoSobras = (valorInput - proLabore);
    const inss = (proLabore * (insS / 100))
    const irrt = verificaIrrf(valorInput) * proLabore;
    const taxaAdm = (valorInput / taxa_adm);
    const quotas = quotaS;
    const descontoT = inss + irrt + taxaAdm + quotas;
    const totalLiquido = valorInput - descontoT;
    const txAdm = (taxaAdm / 100);

    criacaoDaTabelaComOsDados(valorInput, proLabore, antecipacaoSobras, inss, irrt, taxaAdm, quotas, descontoT, totalLiquido, txAdm)
}


function criacaoDaTabelaComOsDados(salario, proLabore, antecipacaoSobras, insS, irrT, taxaAdm, quotaS, descontoTotal, total_Liquido,txAdm) {
    let tr = document.createElement("tr");
    let dependentes = document.createElement("td");
    let valorInput = document.createElement("td");
    let pro_labore = document.createElement("td");
    let antecipacao_sobras = document.createElement("td");
    let inss = document.createElement("td");
    let irrt = document.createElement("td");
    let taxa_adm = document.createElement("td");
    let quotas = document.createElement("td");
    let descontoT = document.createElement("td");
    let totalLiquido = document.createElement("td");
    let tx_adm = document.createElement("td");

    inss.classList = "red"
    irrt.classList = "red"
    taxa_adm.classList = "red"
    quotas.classList = "red"
    descontoT.classList = "red"

    dependentes.innerHTML = ""
    valorInput.innerHTML = salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    pro_labore.innerHTML = proLabore.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    antecipacao_sobras.innerHTML = antecipacaoSobras.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    inss.innerHTML = insS.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    irrt.innerHTML = irrT.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    taxa_adm.innerHTML = taxaAdm.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    quotas.innerHTML = quotaS.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    descontoT.innerHTML = descontoTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    totalLiquido.innerHTML = total_Liquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    tx_adm.innerHTML = txAdm.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    tr.appendChild(dependentes);
    tr.appendChild(valorInput);
    tr.appendChild(pro_labore);
    tr.appendChild(antecipacao_sobras);
    tr.appendChild(inss);
    tr.appendChild(irrt);
    tr.appendChild(taxa_adm);
    tr.appendChild(quotas);
    tr.appendChild(descontoT);
    tr.appendChild(totalLiquido);
    tr.appendChild(tx_adm);

    table.appendChild(tr);

    return table
}

function verificaIrrf(valor) {
    if (valor <= 0) {
        return
    }
    let result;
    if (valor <= 2259.2) {
      result = 0;
    }
    if (valor >= 2259.21 && valor <= 2826.65) {
      result = 0.075;
    }
    if (valor >= 2826.66 && valor <= 3751.06) {
      result = 0.15;
    }
    if (valor >= 3751.07 && valor <= 4664.68) {
      result = 0.225;
    }
    if (valor > 4664.68) {
      result = 0.275;
    }
  
    return result;
  }

function mudarParaFormAlterarDescontos() {
    const campoEnvioSalario = document.querySelector('.campoParaEnvioDoSalario')
    const divTabela = document.querySelector('.tabela')
    const formAlterarDesconto = document.querySelector('.formParaAlterarDescontos')
    const btnAlterarD = document.getElementById('alterarDescontos')
    const btnCancelarD = document.getElementById('cancelarAlteracaoDesconto')

    btnAlterarD.addEventListener('click', () => {
        campoEnvioSalario.classList.toggle('hide')
        divTabela.classList.toggle('hide')
        formAlterarDesconto.classList.toggle('hide')
        btnAlterarD.classList.toggle('hide')
    })

    btnCancelarD.addEventListener('click', () => {
        campoEnvioSalario.classList.toggle('hide')
        divTabela.classList.toggle('hide')
        formAlterarDesconto.classList.toggle('hide')
        btnAlterarD.classList.toggle('hide')
    })
}

mudarParaFormAlterarDescontos()

function redirecionamento() {
    const campoEnvioSalario = document.querySelector('.campoParaEnvioDoSalario')
    const divTabela = document.querySelector('.tabela')
    const formAlterarDesconto = document.querySelector('.formParaAlterarDescontos')
    const btnAlterarD = document.getElementById('alterarDescontos')

    campoEnvioSalario.classList.toggle('hide')
    divTabela.classList.toggle('hide')
    formAlterarDesconto.classList.toggle('hide')
    btnAlterarD.classList.toggle('hide')
}

btnEnvioDoSalario.addEventListener('click', () => {
    const salario = salarioBruto.value
    if (isNaN(salario) && parseFloat(salario) <= 0) {
        alert("Por favor, digite um número positivo válido.");
        return; 
    }
    
    calculoDoRemuneracao(salario)

    salarioBruto.value = ""
});

btnEnvioDasTaxasAlteradas.addEventListener('click', (e) => {
    e.preventDefault();

    const salarioBruto = parseFloat(salarioBrutoInput.value);
    const proLabore = parseFloat(proLaboreInput.value);
    const inss = parseFloat(inssInput.value);
    const taxaAdm = parseFloat(taxaAdmInput.value);
    const quotas = parseFloat(quotasInput.value);

    if (isNaN(salarioBruto) || isNaN(proLabore) || isNaN(inss) || isNaN(taxaAdm) || isNaN(quotas) ||
        parseFloat(salarioBruto) <= 0 || parseFloat(proLabore) <= 0 || parseFloat(inss) <= 0 || parseFloat(taxaAdm) <= 0 || parseFloat(quotas) <= 0) {
        alert("Por favor, digite números positivos válidos para todos os parâmetros.");
        return; 
    }
    
    calculoDoRemuneracaoComTaxaAlteradaPeloUser(salarioBruto, proLabore, inss, taxaAdm, quotas);

    redirecionamento()

    salarioBrutoInput.value = "";
    proLaboreInput.value = "";
    inssInput.value = "";
    taxaAdmInput.value = "";
    quotasInput.value = "";  
})