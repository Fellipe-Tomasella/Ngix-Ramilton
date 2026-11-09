// Servidor simples em Node, sem nenhuma biblioteca externa.
// Rodamos duas copias dele para testar o balanceamento do Nginx.
const http = require('http');

const nome = process.env.NOME || 'Servidor';
let atendidas = 0;

const servidor = http.createServer((req, res) => {
  if (req.url === '/api/info') {
    atendidas++;
    console.log(nome + ' atendeu a requisicao ' + atendidas);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ servidor: nome, atendidas: atendidas }));
    return;
  }

  res.writeHead(404);
  res.end('Nao encontrado');
});

servidor.listen(3000, () => {
  console.log(nome + ' rodando na porta 3000');
});
