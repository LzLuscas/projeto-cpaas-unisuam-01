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




}











uid.addEventlistener('input', function() { validate(uid) });
cel.addEventlistener('input', function() { validate(cel) });
email.addEventlistener('input', function() { validate(email) });
pwd.addEventlistener('input', function() { validate(pwd) });
pwd2.addEventlistener('input', function() { validate(pwd2) });
cpf.addEventlistener('input', function() { validate(cpf) });
nasc.addEventlistener('input', function() { validate(nasc) });
cep.addEventlistener('input', function() { validate(cep) });
bairro.addEventlistener('input', function() { validate(bairro) });
cidade.addEventlistener('input', function() { validate(cidade) });
numero.addEventlistener('input', function() { validate(numero) });
gen.addEventlistener('input', function() { validate(gen) });
idade.addEventlistener('input', function() { validate(idade) });
rua.addEventlistener('input', function() { validate(rua) });
