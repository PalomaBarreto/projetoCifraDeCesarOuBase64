var tipoCodificador = document.getElementById('tipoDeCodificador')
var selecionaCodi = document.getElementById('radioCodificar')
var selecionaDecodi = document.getElementById('radioDecodificar')
var botao = document.getElementById('submeter')

//Evento que vai remover ou adiciovar a classe com display none. Mostrar o campo da "chave" quando estiver selecionado Cifra de César.
tipoCodificador.addEventListener('change', function (e)
{
  var metodo = tipoCodificador.value
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

//função que codifica ou decodifica em cifra de césar
function cifra(texto, passo) {
  var mensagemInicial = document.getElementById('mensagem').value
  var chave = parseInt((document.getElementById('inputChave').value))
  var mensagemFinal = document.getElementById('resultado')
  var mensagemInicialSeparada = mensagemInicial.split("")
  var mensagemSeparadaEmNum = []
  var mensagemSeparadaEmString = []
  var mensagemDecifrada = ""
  var rotacao = ''

  if (selecionaCodi.checked) 
  {
    rotacao = chave
  }

  else 
  {
    rotacao = (-1)*(chave)
  }
  
  for (var i = 0; i < mensagemInicialSeparada.length; i++) 
  {
    mensagemSeparadaEmNum.push(mensagemInicialSeparada[i].charCodeAt() + (parseInt(rotacao)))
  }
  
  for (var j = 0; j < mensagemSeparadaEmNum.length; j++) 
  {
    mensagemSeparadaEmString.push(String.fromCharCode(mensagemSeparadaEmNum[j]))
    
  }
  
  mensagemDecifrada = mensagemSeparadaEmString.join('')
  mensagemFinal.value = `${mensagemDecifrada}`
    
}

//função que codifica ou decodifica em base64
function base64(texto) 
{
  var escolha = ""
  var mensagemInicial = document.getElementById('mensagem').value
  var mensagemFinal = document.getElementById('resultado')
  var codi64 = window.btoa(mensagemInicial)
  var decodi64 = window.atob(mensagemInicial)
  
  if (selecionaCodi.checked) 
  {
    escolha = 'codificar'
  }
  
  else
  {
    escolha = 'decodificar'
  }

  if (escolha === 'codificar') 
  {
    mensagemFinal.value = `${codi64}`
  }

  else if (escolha === 'decodificar') 
  {
    mensagemFinal.value = `${decodi64}`
  }
     
}

//evento que escuta o botao de submeter e dispara as funções para decifrar
botao.addEventListener('click', function (e) 
{
  e.preventDefault()
  var metodo = tipoCodificador.value
    
  if (metodo === "cifra")
  {
    cifra()
  }
  
  else if (metodo === "base64")
  {
    base64()
  }
 
})

