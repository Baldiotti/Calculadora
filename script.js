onload = () => {
    document.querySelector('#btn0').onclick = () => digito(0);
    document.querySelector('#btn1').onclick = () => digito(1);
    document.querySelector('#btn2').onclick = () => digito(2);
    document.querySelector('#btn3').onclick = () => digito(3);
    document.querySelector('#btn4').onclick = () => digito(4);
    document.querySelector('#btn5').onclick = () => digito(5);
    document.querySelector('#btn6').onclick = () => digito(6);
    document.querySelector('#btn7').onclick = () => digito(7);
    document.querySelector('#btn8').onclick = () => digito(8);
    document.querySelector('#btn9').onclick = () => digito(9);
    document.querySelector('#btnAC').onclick = limpaTela;
    document.querySelector('#btnMM').onclick = trocaSinal;
    document.querySelector('#btnPC').onclick = porCentagem;
    document.querySelector('#btnDV').onclick = () => operacao('btnDV');
    document.querySelector('#btnX').onclick = () => operacao('btnX');
    document.querySelector('#btnMenos').onclick = () => operacao('btnMenos');
    document.querySelector('#btnMais').onclick = () => operacao('btnMais');
    document.querySelector('#btnIG').onclick =  igual;
    document.querySelector('#btnVG').onclick = virgula;
};

let operador = null;
let sValor = ' 0';
let zeraTela = ig = false;
let sVflt, sV, sVint, reserva, reserva2, vLenght, i;

/* Atualizador de visor */

const atualizaVisor = () => {
    if(sValor.search(',') == -1) {
        sVint = sValor;
    } else{
        sV = sValor.split(',');
        sVint = sV[0];
        sVflt = sV[1];
    }

    let cont = 0;
    let v = '';
    i = sVint.length-1;
        for(i; i > 0; i--) {
            if(++cont > 3){
                v = '.' + v;
                cont = 1;   
            }
            v = sVint[i] + v;
        }
    v = sVint[0] + v;
    if(sVflt != null)
        v = v + ',' + `${sVflt.substring(0, 10 - sVint.length)}`;
    vLenght = v.length;
    document.querySelector('#numTela').innerText = v;
    sVflt = null;
};




/* Botões de Números */

const digito = (n) => {
    if(sValor == ' 0' && n == '0' || vLenght == 12){}
    else if (sValor == ' 0' && n != '0' || zeraTela) {
        sValor = ' ' + `${n}`;
        document.querySelector('#btnAC').innerText = 'C';
        zeraTela = false;
    } else if(sValor == '-0' && n != '0'){
        sValor = `${sValor.charAt(0)}` + `${n}`;
        document.querySelector('#btnAC').innerText = 'C';
        zeraTela = false;
    }
    else{
        sValor +=`${n}`;
        document.querySelector('#btnAC').innerText = 'C';
    }
    atualizaVisor();
};




/* Botão AC */

const limpaTela = () => {
    sValor = ' 0';
    sVflt = operador = null;
    document.querySelector('#btnAC').innerText = 'AC';
    atualizaVisor();
};




/* Botão de troca de sinal */

const trocaSinal = () => {
    if(zeraTela) sValor = ' 0', zeraTela = false;
    if (sValor.charAt(0) != '-'){
        console.log(sValor.charAt(0));
        sValor = '-' + `${sValor.substring(1)}`;
        atualizaVisor();
    } else {
        sValor = ' ' + `${sValor.substring(1)}`;
        atualizaVisor();
    }
};




/* Botão de Porcentagem */

const porCentagem = () => {
    substitui();
    if(operador == '+' || operador == '-'){
        sValor = reserva / 100 * parseFloat(sValor);
    } else {
        sValor = parseFloat(sValor) / 100;
    }
    sValor = String(sValor);
    substitui();
    atualizaVisor();
};




/* Botão da Virgula */

const virgula = () => {
    if(sValor.search(',') == -1)
        sValor += `${','}`;
    atualizaVisor();
};




/* Igual */

const igual = () => {
    operaIgual();
    ig = true;
    estiloOperador();
}

/* Operador */

const operacao = (op) => {
    if(ig) operador = null;
    if(!zeraTela){
        ig = false;
        operaIgual();
        operador = op;
        zeraTela = true;   
    }
    estiloOperador(op);
};

/* Opera Igual (para enxugar o codigo) */

const operaIgual = () => {
    resultado();
    substitui();
    reserva = parseFloat(sValor);
    substitui();
};




/* Calculos */

const resultado = () => {
    if(operador != null) {
        switch(operador){
            case 'btnMais':
                if(ig == false){
                    substitui();
                    reserva2 = parseFloat(sValor);
                }
                sValor = String(reserva + reserva2);
                substitui();
                break;
            case 'btnMenos':
                if(ig == false){
                    substitui();
                    reserva2 = parseFloat(sValor);
                }
                sValor = String(reserva - reserva2);
                substitui();
                break;
            case 'btnX':
                if(ig == false){
                    substitui();
                    reserva2 = parseFloat(sValor);
                }
                sValor = String(reserva * reserva2);
                substitui();
                break;
            case 'btnDV':
                if(ig == false){
                    substitui();
                    reserva2 = parseFloat(sValor);
                }
                sValor = String(reserva / reserva2);
                substitui();
                break;
            default:
                sValor = 'Erro';
        }
    }
    atualizaVisor();
};




/* Substitui ',' por '.' */

const substitui = () => {
    if(sValor.search(',') != -1){
        sValor = sValor.replace(',', '.');
    } else if (sValor.search('.') != -1){
            sValor = sValor.replace('.', ',');
    }
    if(sValor.charAt(0) != '-' && sValor.charAt(0) != ' '){
        sValor = ' ' + sValor.substring(0);
    }
}




/* Estilizar operador quando clicado */

const estiloOperador = (op) => {
    let lista = document.querySelectorAll('.btnOperador');
    for(i = 0; i < lista.length-1; i++){
        lista[i].style.border = '1px solid #545454';
    }
    if(op != null){
        let el = document.getElementById(op);
        el.style.border = '3px solid #545454';
    }
}