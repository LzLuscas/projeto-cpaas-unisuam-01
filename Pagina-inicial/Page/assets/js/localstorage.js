function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show'); // Adiciona a classe para mostrar o toast
  
    setTimeout(function () {
      toast.classList.remove('show'); // Remove a classe após alguns segundos
    }, 3000); // 3000 milissegundos = 3 segundos
  }
  function showToast2(message) {
    const toast = document.getElementById('toast2');
    toast.textContent = message;
    toast.classList.add('show'); // Adiciona a classe para mostrar o toast
  
    setTimeout(function () {
      toast.classList.remove('show'); // Remove a classe após alguns segundos
    }, 3000); // 3000 milissegundos = 3 segundos
  }
  
  // Função para verificar se o local,Storage é suportado pelo navegador.
  function isLocalStorageSupported() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
  
  // Função para criar um novo usuário no localStorage.
  function cadastrarUsuario(usuario) {
  if (isLocalStorageSupported()) {
  const cpf = usuario.cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
  if (!validarCPF(cpf)) {
    showToast2('CPF inválido. Por favor, digite um CPF válido.');
    document.getElementById('cpf').focus();
    return;
  }
  
  const senhaValida = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/.test(usuario.password); //validador de senha
  
  if (!senhaValida) {
    showToast2('A senha não atende ao padrão. Por favor, siga as instruções para criar uma senha segura.');
    document.getElementById('password').focus();
    return;
  }
  
  // Verificar se o usuário já existe no localStorage.
  if (localStorage.getItem(usuario.login)) {
    showToast2('Este usuário já existe. Por favor, escolha outro login.');
    document.getElementById('login').focus();
    return;
  }
  
  // Armazenar os dados do usuário no localStorage.
  localStorage.setItem(usuario.login, JSON.stringify(usuario));
  showToast2('Cadastrado com sucesso!');
  setTimeout(function () {
    window.location.href = 'login.html';
  }, 3000);
  } else {
  showToast2('LocalStorage não suportado pelo seu navegador. Não é possível criar um usuário.');
  }
  }
  
  function validarDataNascimento(data) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Remova o parêntese de abertura
  if (!regex.test(data)) {
  return false;
  }
  const [dia, mes, ano] = data.split('/').map(Number);
  const dataNascimento = new Date(ano, mes - 1, dia);
  const dataAtual = new Date();
  const idadeEmAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
  
  if (
  idadeEmAnos >= 16 && // Não pode ter nascido no futuro
  idadeEmAnos <= 120 // Idade máxima de 120 anos
  ) {
  return true;
  }
  
  return false;

  }
  // puxando o id do formulario
  function validate() {
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const gender = document.getElementById('gender').value;
  const mae = document.getElementById('mae').value;
  const cpf = document.getElementById('cpf').value;
  const celular = document.getElementById('celular').value;
  const telefone = document.getElementById('telefone').value;
  const cep = document.getElementById('cep').value;
  const rua = document.getElementById('rua').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const uf = document.getElementById('uf').value;
  const numero = document.getElementById('numero').value;
  const login = document.getElementById('loginre').value;
  const password = document.getElementById('password').value;
  const confirm_password = document.getElementById('confirm_password').value;
  const dataNascimentoInput = document.getElementById('data');
  
  const cpfNumerico = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos do CPF
  
  const genderPattern = /^(m|f|nd|M|F|ND)$/; // so permite isso no genero
  const loginPattern = /^[A-Za-záàâãéèêíïóôõöúç]+$/; // Pattern para login
  
  const nomePattern = /^[a-zA-Záàâãéèêíïóôõöúç ]+$/; // so permite essas letras
  const maePattern = /^[a-zA-Záàâãéèêíïóôõöúç ]+$/; // ''''''''''''''''''''''''
  
  if (
    nome === '' ||
    data === '' ||
    mae === '' ||
    cpfNumerico === '' ||
    celular === '' ||
    telefone === '' ||
    numero === '' ||
    cep === '' ||
    rua === '' ||
    bairro === '' ||
    cidade === '' ||
    uf === ''
  ) {
    showToast2('Por favor, preencha todos os campos corretamente.');
    document.getElementById('nome').focus();
  } else if (password !== confirm_password) {
    showToast2('As senhas não coincidem. Tente novamente.');
    document.getElementById('password').focus();
  } else if (!validarDataNascimento(data)) {
    showToast2('Data de nascimento inválida. Por favor, insira uma data válida.');
    dataNascimentoInput.focus();
  } else if (!loginPattern.test(login)) {
    showToast2('O campo "login" permite somente letras minusculas.');
    document.getElementById('loginre').focus();
  }else if( !nomePattern.test(nome)){
    showToast2('O campo "nome completo" permite somente letras.');
  }
  else if(   !maePattern.test(mae) ){
    showToast2('O campo "nome materno" permite somente letras.');
  }
   else if (!genderPattern.test(gender)) {
    showToast2('O campo "gender" permite somente "m", "f" ou "nd".');
    document.getElementById('gender').focus();
  } else {
    const senhaValida = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/.test(password);
    if (!senhaValida) {
      showToast2('A senha não atende ao padrão. Mínimo 8 caracteres sendo OBRIGATÓRIO 1 letra maiúscula, 1 minúscula e 1 caracter especial.');
      document.getElementById('password').focus();
      return;
    }
  
    const usuario = {
      nome,
      data,
      gender,
      mae,
      cpf: cpfNumerico,
      celular,
      telefone,
      numero,
      cep,
      rua,
      bairro,
      cidade,
      uf,
      login,
      password,
    };
  
    cadastrarUsuario(usuario);
  }
  }
  
  
  // deixei aqui pra tu so colocar no lugar no login
  function login() {
  const username = document.getElementById('usuario').value;
  const password = document.getElementById('senha').value;
  
  if (username === '' || password === '') {
  showToast('Por favor, preencha o login e a senha.');
  return;
  }
  
  const user = localStorage.getItem(username);
  
  if (user) {
  const storedUser = JSON.parse(user);
  if (storedUser.password === password) {
    showToast('Seja bem-vindo, ' + username + '!');
    setTimeout(function () {
      window.location.href = '/Pagina-inicial/index.html';
    }, 3000);
  } else {
    showToast('Usuário ou senha incorretos');
    document.getElementById('usuario').focus();
  }
  } else {
  showToast('Nome de usuário não encontrado');
  document.getElementById('usuario').focus();
  }
  }
  
  
  function isUserRegistered(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.includes(username);
  }
  const cpfInput = document.getElementById('cpf');
  
  cpfInput.addEventListener('input', function () {
    const cpf = cpfInput.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    if (cpf.length === 11 && !validarCPF(cpf)) {
      cpfInput.setCustomValidity('CPF inválido');
    } else {
      cpfInput.setCustomValidity('');
    }
  });
  // ver se o cpf é original nao sei te explicar o calculo pesquisa modulo 11 no google
  function validarCPF(cpf) {
    if (cpf.length !== 11) {
      return false;
    }
  
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    let numeros = cpf.substring(0, 9);
    const digitos = cpf.substring(9);
  
    let soma = 0;
    let resultado;
  
    for (let i = 10; i > 1; i--) {
      soma += parseInt(numeros.charAt(10 - i)) * i;
    }
  
    resultado = soma % 11;
  
    if (resultado === 0 || resultado === 1) {
      resultado = 0;
    } else {
      resultado = 11 - resultado;
    }
  
    if (resultado != parseInt(digitos.charAt(0))) {
      return false;
    }
  
    numeros += resultado;
    soma = 0;
  
    for (let i = 11; i > 1; i--) {
      soma += parseInt(numeros.charAt(11 - i)) * i;
    }
  
    resultado = soma % 11;
  
    if (resultado === 0 || resultado === 1) {
      resultado = 0;
    } else {
      resultado = 11 - resultado;
    }
  
    if (resultado != parseInt(digitos.charAt(1))) {
      return false;
    }
  
    return true;
  }

  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
  }
  
  function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById('rua').value = (conteudo.logradouro);
      document.getElementById('bairro').value = (conteudo.bairro);
      document.getElementById('cidade').value = (conteudo.localidade);
      document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
      //CEP não Encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
    }
  }
  
  function pesquisacep(valor) {
  
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
  
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
  
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
  
      //Valida o formato do CEP.
      if (validacep.test(cep)) {
  
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value = "...";
        document.getElementById('bairro').value = "...";
        document.getElementById('cidade').value = "...";
        document.getElementById('uf').value = "...";
  
        //Cria um elemento javascript.
        var script = document.createElement('script');
  
        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
  
        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
  
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  };
  // aqui ve se a senha ta igual com o confirmar senha
  var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");
  
  function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Senhas diferentes!");
  } else {
    confirm_password.setCustomValidity('');
  }
  }
  
  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
  
  // aqui ele verificar a força da senha se ele não colocar os caracteres que pede n funciona
  function verificaForcaSenha() 
  {
  var numeros = /([0-9])/;
  var alfabetoa = /([a-z])/;
  var alfabetoA = /([A-Z])/;
  var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
  
  
  if($('#password').val().length<8) 
  {
    $('#password-status').html("<span style='color:red'>Fraco, insira no mínimo 8 caracteres</span>");
  } else {  	
    if($('#password').val().match(numeros) && $('#password').val().match(alfabetoa) && $('#password').val().match(alfabetoA) && $('#password').val().match(chEspeciais))
    {            
      $('#password-status').html("<span style='color:green'><b>Forte</b></span>");
    } else {
      $('#password-status').html("<span style='color:orange'>Médio</span>");
    }
  }
  }
  