// ===== API DE CEP =====

// Elementos do formulário
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const cepError = document.getElementById('cep-error');
const limparBtn = document.getElementById('limpar-cep');

// Função para buscar CEP na API ViaCEP
async function buscarCEP(cep) {
  // Limpar erros anteriores
  cepError.textContent = '';
  
  // Remover caracteres não numéricos
  const cepLimpo = cep.replace(/\D/g, '');
  
  // Validar se tem 8 dígitos
  if (cepLimpo.length !== 8) {
    cepError.textContent = 'CEP deve ter 8 dígitos';
    limparFormulario();
    return;
  }

  try {
    // Mostrar que está carregando
    cepError.textContent = '⏳ Buscando...';
    
    // Fazer requisição à API ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/` );
    const data = await response.json();

    // Verificar se CEP foi encontrado
    if (data.erro) {
      cepError.textContent = '❌ CEP não encontrado';
      limparFormulario();
      return;
    }

    // Preencher os campos com os dados retornados
    ruaInput.value = data.logradouro || '';
    bairroInput.value = data.bairro || '';
    cidadeInput.value = data.localidade || '';
    estadoInput.value = data.uf || '';

    // Mostrar sucesso
    cepError.textContent = '✅ CEP encontrado com sucesso!';
    cepError.style.color = '#10B981';

  } catch (erro) {
    cepError.textContent = '❌ Erro ao buscar CEP. Tente novamente.';
    console.error('Erro:', erro);
    limparFormulario();
  }
}

// Função para limpar o formulário
function limparFormulario() {
  ruaInput.value = '';
  bairroInput.value = '';
  cidadeInput.value = '';
  estadoInput.value = '';
  cepInput.value = '';
  cepError.textContent = '';
}

// Evento quando o usuário digita no campo CEP
cepInput.addEventListener('input', function(e) {
  const cep = e.target.value;
  
  // Buscar apenas quando tiver 8 dígitos
  if (cep.replace(/\D/g, '').length === 8) {
    buscarCEP(cep);
  }
});

// Evento do botão limpar
limparBtn.addEventListener('click', limparFormulario);

console.log('✅ API de CEP carregada com sucesso!');
