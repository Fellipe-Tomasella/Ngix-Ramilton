# Trabalho de Nginx

Trabalho em dupla sobre o Nginx. Apresentação e entrega da parte escrita em **27/11/2026** (15 minutos de apresentação).

## O que tem aqui

| Pasta | Conteúdo |
|---|---|
| `app/` | Aplicação de demonstração: Nginx na frente de dois servidores Node.js |
| `documento/` | Trabalho escrito nas normas da ABNT (Word) |
| `apresentacao/` | Roteiro de fala de cada slide, com tempo e quem fala |

Os slides ficam em: <https://claude.ai/artifact/2HpaC1RUxA6LFDKNbGFFZp> (o link só abre depois que o dono compartilhar).

## Como instalar e rodar a aplicação

Não é preciso instalar Nginx nem Node.js: o Docker baixa tudo sozinho. O que você precisa é:

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Internet na primeira execução

### 1. Instale e abra o Docker Desktop

Baixe, instale e **abra** o programa. Espere ele indicar que está rodando (Engine running). No Windows, se ele pedir para ativar o WSL 2, aceite e reinicie o computador.

Para conferir, abra um terminal e rode:

```bash
docker --version
```

### 2. Baixe o projeto

```bash
git clone https://github.com/Fellipe-Tomasella/Ngix-Ramilton.git
```

```bash
cd Ngix-Ramilton/app
```

### 3. Suba a aplicação

```bash
docker compose up -d
```

Na primeira vez demora um pouco, porque ele baixa as imagens. Para ver se os três contêineres (`nginx`, `servidor1` e `servidor2`) estão rodando:

```bash
docker compose ps
```

### 4. Abra no navegador

Acesse <http://localhost:8080>.

### 5. Para desligar

```bash
docker compose down
```

## Roteiro da demonstração

1. Clique em **Enviar 10 requisições**: cada servidor atende 5.
2. No terminal, derrube um servidor:

   ```bash
   docker stop servidor2
   ```

3. Clique em **Limpar** e envie 10 de novo: o Servidor 1 atende todas e o contador de erros fica em zero.
4. Volte com o servidor:

   ```bash
   docker start servidor2
   ```

5. Espere alguns segundos e envie de novo: os dois voltam a responder.

Suba a aplicação **antes** da apresentação e, se possível, baixe as imagens em casa, para não depender da internet da faculdade.

## Se der problema

| Problema | O que fazer |
|---|---|
| `failed to connect to the docker API` ou erro parecido | O Docker Desktop não está aberto. Abra e espere iniciar. |
| `port is already allocated` na porta 8080 | Outro programa usa a porta. Em `app/docker-compose.yml`, troque `"8080:80"` por `"8081:80"` e acesse <http://localhost:8081>. |
| `container name "/nginx" is already in use` | Sobrou um contêiner antigo. Rode `docker rm -f nginx servidor1 servidor2` e suba de novo. |
| A página abre, mas só dá erro | Veja os logs com `docker compose logs` dentro da pasta `app`. |
| Mudei o `nginx.conf` e nada aconteceu | Rode `docker compose restart nginx`. |

## Como funciona, em resumo

- O Nginx recebe tudo na porta 8080.
- Os caminhos que começam com `/api/` são repassados aos dois servidores, em revezamento (round robin).
- O resto é a página, entregue pelo próprio Nginx a partir de `app/site/`.
- A configuração está em `app/nginx/nginx.conf`.
