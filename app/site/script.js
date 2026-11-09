let total1 = 0;
let total2 = 0;
let erros = 0;

function atualizarTela() {
  document.getElementById('total1').textContent = total1;
  document.getElementById('total2').textContent = total2;
  document.getElementById('erros').textContent = erros;
}

function adicionarHistorico(texto) {
  const item = document.createElement('li');
  item.textContent = texto;
  document.getElementById('historico').prepend(item);
}

async function enviarRequisicao() {
  try {
    const resposta = await fetch('/api/info');
    if (!resposta.ok) {
      throw new Error('status ' + resposta.status);
    }

    const dados = await resposta.json();
    if (dados.servidor === 'Servidor 1') {
      total1++;
    } else {
      total2++;
    }
    adicionarHistorico(dados.servidor + ' respondeu');
  } catch (erro) {
    erros++;
    adicionarHistorico('Erro na requisição: ' + erro.message);
  }
  atualizarTela();
}

document.getElementById('uma').addEventListener('click', enviarRequisicao);

document.getElementById('dez').addEventListener('click', async () => {
  for (let i = 0; i < 10; i++) {
    await enviarRequisicao();
  }
});

document.getElementById('limpar').addEventListener('click', () => {
  total1 = 0;
  total2 = 0;
  erros = 0;
  document.getElementById('historico').innerHTML = '';
  atualizarTela();
});
