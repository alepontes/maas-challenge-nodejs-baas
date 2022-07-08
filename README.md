# Challenge NodeJs Bank as a Service (BaaS)
As envs estão no arquivo [.env.exemple](./.env.exemple)

```bash 
# subir o projeto
docker compose up

# derrubar o projeto
docker compose down --rmi all
```

## Observações sobre o design dos endpoints 

Conforme os requisitos, a API deve suportar pelo menos 2 categorias de usuários
- Tipo 1: usuários que podem ter uma conta, fazer transações e etc
- Tipo 2: usuários que podem listar todas as pessoas, contas e etc

<br>

Esses usuários foram divididos entre Clientes e Admins, e por óbvio clientes não deve ter acesso a todos os endpoints, então a estratégia foi criar um controle de acesso baseado em rotas que limite quais rotas um cliente pode chamar. Todos os usuários usam JWT.

<br>

### Clientes
Usuários do tipo 1 tem a role `customer`, são clientes do sistema com acesso apenas ao contexto de `/customers` e `/auth`, com exceção de `GET /customers` que lista todos os usuários.

### Admins
Usuários do tipo 2 tem a role `admin`, representam administradores do sistema, eles acessam a todos os enpoints da API.

<br>

Por conta dessa estratégia, seguindo os princípios REST, todos os enpoints usados por clientes estão apenas no contexto de `/customers`, por exemplo, uma transferência é feita em `POST /customers/{id}/transactions` não em `POST /transactions`
Um usuário `customer` é criado em `POST /auth/signup` e um usuário `admin` é criado em `POST /users`.

> A documentação está disponível em [http://localhost:3000/docs](http://localhost:3000/docs/)
 