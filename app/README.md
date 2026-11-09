# Trabalho de Nginx

Aplicação simples para mostrar o Nginx servindo arquivos estáticos e funcionando como proxy reverso e balanceador de carga.

## Como rodar

Precisa ter o Docker instalado e aberto. Dentro desta pasta:

    docker compose up -d

Depois abra http://localhost:8080

## Demonstração

1. Clique em "Enviar 10 requisições": cada servidor deve atender 5.
2. Derrube um servidor com `docker stop servidor2`.
3. Envie de novo: o Servidor 1 atende tudo e não aparece erro.
4. Volte com ele usando `docker start servidor2`.

Para desligar tudo: `docker compose down`
