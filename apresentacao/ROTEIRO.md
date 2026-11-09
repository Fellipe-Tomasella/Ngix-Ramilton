# Roteiro da apresentação

Tempo total: cerca de 14min30. A Pessoa 1 fala até o slide 6 e a Pessoa 2 faz o restante.

## Slide 1: Nginx

PESSOA 1 (30 segundos). Bom dia a todos. Nós somos [nome] e [nome] e vamos falar sobre o Nginx. Primeiro eu explico o que ele é e como funciona, depois [nome] mostra a aplicação que fizemos.

## Slide 2: O problema de ter um servidor só

PESSOA 1 (1 minuto). Imaginem um site com um único servidor. Se os acessos aumentam muito, ele fica lento. Se ele cai, ninguém acessa mais. A solução comum é ter mais de um servidor, mas aí aparece outra pergunta: quem decide qual servidor atende cada usuário? É aí que entra o Nginx.

## Slide 3: O que o Nginx faz

PESSOA 1 (1 minuto e meio). O Nginx é um software de código aberto com várias funções. A mais básica é ser servidor web, entregando os arquivos do site. Ele também pode ser proxy reverso, recebendo o pedido e repassando para outro servidor, e balanceador de carga, dividindo os pedidos. Além disso, comprime respostas e guarda cache. Segundo o site oficial, com dados da Netcraft, é o servidor web mais popular do mundo.

## Slide 4: De onde ele veio

PESSOA 1 (1 minuto). O Nginx foi criado por Igor Sysoev para o Rambler, um grande portal da Rússia, que passou a usar em 2004. Naquela época o Apache era o mais usado, e o Nginx ganhou espaço pela configuração simples e pelo bom desempenho. Ele é gratuito, com licença BSD, e a empresa F5 oferece a versão empresarial e suporte.

## Slide 5: Como ele trabalha por dentro

PESSOA 1 (1 minuto e meio). O Nginx tem um processo mestre, que lê a configuração e cuida dos outros, e os workers, que atendem as requisições. O modelo é baseado em eventos: o worker não fica parado esperando uma conexão terminar, ele é avisado pelo sistema operacional quando alguma conexão tem algo para fazer. Por isso um mesmo worker acompanha muitas conexões e o consumo de recursos fica baixo.

## Slide 6: Proxy reverso: o intermediário

PESSOA 1 (1 minuto e meio). No proxy reverso, o usuário acha que está falando com um único servidor, mas o Nginx recebe o pedido, repassa para a aplicação e devolve a resposta. A vantagem é que os servidores da aplicação ficam escondidos. No Nginx isso é feito com a diretiva proxy_pass. Agora [nome] continua explicando como dividir os pedidos.

## Slide 7: Balanceamento de carga

PESSOA 2 (1 minuto e meio). O balanceamento divide as requisições entre várias cópias da mesma aplicação. O método padrão é o round robin, um revezamento. Também existe o least connected, que manda para o servidor menos ocupado, e o ip hash, que usa o IP do cliente para escolher. E se a conexão com um servidor der erro, o Nginx tenta o próximo. Nós usamos o round robin no nosso projeto.

## Slide 8: A aplicação que fizemos

PESSOA 2 (1 minuto). Para testar na prática, fizemos uma aplicação bem simples com Docker. Temos três contêineres: o Nginx e duas cópias do mesmo servidor em Node.js. Só o Nginx fica acessível, na porta 8080. A página tem botões que enviam requisições e mostra qual servidor respondeu.

## Slide 9: Poucas linhas de configuração

PESSOA 2 (1 minuto e meio). Este é o trecho principal do arquivo nginx.conf. O bloco upstream cria um grupo chamado servidores, com os dois contêineres. Depois, o location diz que tudo que começa com /api/ vai para esse grupo. Como não indicamos nenhum método, ele usa o round robin. Com isso já temos proxy reverso e balanceamento.

## Slide 10: Demonstração

PESSOA 2 (2 minutos e meio). Abrir localhost:8080. Clicar em Enviar 10 requisições: cada servidor atende 5. No terminal, rodar docker stop servidor2. Clicar em Limpar e enviar 10 de novo: o Servidor 1 atende todas e o contador de erros continua em zero. Rodar docker start servidor2, esperar alguns segundos e enviar de novo. ANTES DA AULA: abrir o Docker e rodar docker compose up -d dentro da pasta app.

## Slide 11: Resultados dos testes

PESSOA 2 (30 segundos). Estes são os números do nosso teste, iguais ao que acabamos de ver. Nenhuma requisição deu erro, mesmo com um servidor desligado. É importante dizer que foi um teste pequeno, então ele mostra que o mecanismo funciona, mas não mede desempenho.

## Slide 12: Conclusão

PESSOA 2 (30 segundos). Concluímos que o Nginx permite aplicar na prática conceitos importantes de redes e sistemas distribuídos, sem muita complexidade. Como próximos passos, poderíamos testar com muitos acessos, comparar os métodos e configurar HTTPS. Obrigado, ficamos à disposição para perguntas.

## Slide 13: Referências

Deixar este slide na tela durante as perguntas. A lista completa está no trabalho escrito.
