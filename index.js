var tipoDeCodificador = document.getElementById('tipoDeCodificador')
var selecionaCodi = document.getElementById('radioCodificar')
var selecionaDecodi = document.getElementById('radioDecodificar')
var botao = document.getElementById('submeter')
var msgDecifrada = ''

//evento que vai remover ou adiciovar a classe com display none. Mostrar o campo da "chave" quando estiver selecionado Cifra de César.
tipoDeCodificador.addEventListener('change', function (e)
{
  var metodo = tipoDeCodificador.value
  var selecionaLabelChave = document.getElementById('labelChave').classList
  var selecionaInputChave = document.getElementById('inputChave').classList
  
  if (metodo === 'base64') {
    selecionaInputChave.add('chaveInvisivel')
    selecionaLabelChave.add('chaveInvisivel')
    
  }
  
  else if (metodo === 'cifra') {
    selecionaInputChave.remove('chaveInvisivel')
    selecionaLabelChave.remove('chaveInvisivel')
  }
})

//evento que mostra "codificar a mensagem" quando o radio estiver selecionado em codificar
selecionaCodi.addEventListener('click', function (e) 
{
  botao.innerText = "codificar a mensagem"  
})

//evento que mostra "decodificar a mensagem" quando o radio estiver selecionado em decodificar
selecionaDecodi.addEventListener('click', function (e) 
{
  botao.innerText = "decodificar a mensagem"  
})

//codifica ou decodifica em cifra de césar
function cifra(texto, passo)
{
  var msgInicial = document.getElementById('mensagem').value
  var msgFinal = document.getElementById('resultado')
  var chave = parseInt((document.getElementById('inputChave').value))
  var msgInicialSeparada = msgInicial.split("")
  var msgSeparadaEmNum = []
  var msgSeparadaEmString = []
  var rotacao = ''
  
  if (selecionaCodi.checked) 
  {
    rotacao = chave
  }
  
  else 
  {
    rotacao = (-1)*(chave)
  }
  
  for (var i = 0; i < msgInicialSeparada.length; i++) 
  {
    if (msgInicialSeparada[i].charCodeAt() >= 65 && msgInicialSeparada[i].charCodeAt() <= 90)
    {
      msgSeparadaEmNum.push(((msgInicialSeparada[i].charCodeAt() - 90 + (parseInt(rotacao))) % 26 ) + 90)
    }
    
    else if (msgInicialSeparada[i].charCodeAt() >= 97 && msgInicialSeparada[i].charCodeAt() <= 122) 
    {
      msgSeparadaEmNum.push(((msgInicialSeparada[i].charCodeAt() - 122 + (parseInt(rotacao))) % 26 ) + 122)
      console.log(msgSeparadaEmNum);
    }
    
    else
    {
      msgSeparadaEmNum.push(msgInicialSeparada[i].charCodeAt())
    }
  }
  
  for (var j = 0; j < msgSeparadaEmNum.length; j++) 
  {
    msgSeparadaEmString.push(String.fromCharCode(msgSeparadaEmNum[j]))    
  }
  
  msgDecifrada = msgSeparadaEmString.join('')
  msgFinal.value = `${msgDecifrada}`
}

//codifica ou decodifica em base64
function base64(texto) 
{
  var msgInicial = document.getElementById('mensagem').value
  var msgFinal = document.getElementById('resultado')
  var codi64 = window.btoa(msgInicial)
  var decodi64 = window.atob(msgInicial)
  
  if (selecionaCodi.checked) 
  {
    msgFinal.value = `${codi64}`  
  }
  
  else if (selecionaDecodi.checked)
  {
    msgFinal.value = `${decodi64}`
  }
}

//evento que escuta o botao de submeter e dispara as funções para decifrar
botao.addEventListener('click', function (e) 
{
  e.preventDefault()
  var metodo = tipoDeCodificador.value
  
  if (metodo === "cifra")
  {
    cifra()
  }
  
  else if (metodo === "base64")
  {
    base64()
  }
})