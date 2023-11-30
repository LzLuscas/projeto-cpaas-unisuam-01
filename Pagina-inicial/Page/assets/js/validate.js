const uid = document.getElementById('uid');
const  gen = document.getElementById('gen');
const  nasc = document.getElementById('nasc');
const  idade = document.getElementById('idade');
const  cel = document.getElementById('cel');
const  cpf = document.getElementById('cpf');
const  email = document.getElementById('email');
const  rua = document.getElementById('rua');
const  numero = document.getElementById('numero');
const  bairro = document.getElementById('bairro');
const  cidade = document.getElementById('cidade');
const  cep = document.getElementById('cep');
const  pwd = document.getElementById('pwd');
const  pwd2 = document.getElementById('pwd2');

function validate(item){
    item.setCustomValidity('');
    item.checkValidity();

    if(item == pwd2){
        if(item.value === pwd.value) item.setCustomValidity('');
        else item.setCustomValidity('As senhas digitadas não são iguais. Verifique e corrija.');
    }

    if(item == nasc) {
        let hoje = new Date();
        let dnasc = new Date(nasc.value);
        
        let idade = hoje.getFullYear() - dnasc.getFullYear();
        let mes = hoje.getMonth() - dnasc.getMonth();
        if(mes < 0 || (mes === 0 && hoje.getDate() < dnasc.getDate())) {
            idade--;
        }

        if(idade >= 0) document.getElementById('idade').value = idade + 'anos';
        else document.getElementById('idade').value = "Ainda não nascido.";

        if(idade > 130) item.setCustomValidity('Você provavelmente está morto, caso contrário, prove.');
        else if(idade >= 18) item.setCustomValidity('');
        else item.setCustomValidity('Você precisa ser maior de 18 anos.')
    }

    if (item == cpf) {
        let numCPF = cpf.value.replace(/[^0-9]/g , "");
        if (validateCPF(numCPF)) item.setCustomValidity('');
        else item.setCustomValidity('CPF inválido');
    }
}
// https://developer.ebanx.com/docs/resources/ux-recommendations/ux-brazil/#personal-information
function validateCPF(cpf) {

    var number, digits, sum, i, result, equal_digits;
  
    cpf = cpf.replace(/[^\d]+/g,'');
  
    equal_digits = 1;
    if (cpf.length != 11)
      return false;
  
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1)){
        equal_digits = 0;
        break;
      }
  
    if(equal_digits == 1)
      return false;
  
    number = cpf.substring(0,9);
    digits = cpf.substring(9);
    sum = 0;
  
    for (i = 10; i > 1; i--)
      sum += number.charAt(10 - i) * i;
  
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  
    if (result != digits.charAt(0))
      return false;
  
    number = cpf.substring(0,10);
    sum = 0;
  
    for (i = 11; i > 1; i--)
      sum += number.charAt(11 - i) * i;
  
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  
    if (result != digits.charAt(1))
      return false;
  
    return true;
  }




function maskCPF() {
    let strCPF = cpf.value;
    if (strCPF.length == 3 || strCPF.length == 7) cpf.value += ".";
    if (strCPF.length == 11) cpf.value += "-";

    validate(cpf)
}

function maskCel() {
    let strcel = cel.value;
    if (strcel.length == 2) {
        cel.value += ") ";
        cel.value = "(" + cel.value
    }
    if (strcel.length == 10) cel.value += "-";
}










uid.addEventlistener('input', function() { validate(uid) });
cel.addEventlistener('input', function() { validate(cel) });
email.addEventlistener('input', function() { validate(email) });
pwd.addEventlistener('input', function() { validate(pwd) });
pwd2.addEventlistener('input', function() { validate(pwd2) });
cpf.addEventlistener('input', function() { maskCPF(cpf) });
cel.addEventlistener('input', function() { maskCel(cel) });
nasc.addEventlistener('input', function() { validate(nasc) });
cep.addEventlistener('input', function() { validate(cep) });
bairro.addEventlistener('input', function() { validate(bairro) });
cidade.addEventlistener('input', function() { validate(cidade) });
numero.addEventlistener('input', function() { validate(numero) });
gen.addEventlistener('input', function() { validate(gen) });
idade.addEventlistener('input', function() { validate(idade) });
rua.addEventlistener('input', function() { validate(rua) });
