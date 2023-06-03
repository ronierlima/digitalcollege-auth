# Documentação da API de Meus Links

## Listar usuários

Endpoint para listar todos os usuários.

**URL:** `/users`

**Método:** `GET`

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ]
  ```

## Cadastrar novo usuário

Endpoint para cadastrar um novo usuário.

**URL:** `/users`

**Método:** `POST`

**Corpo da solicitação:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secretpassword"
}
```

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

## Autenticar usuário

Endpoint para autenticar um usuário.

**URL:** `/users/auth`

**Método:** `POST`

**Corpo da solicitação:**

```json
{
  "email": "john@example.com",
  "password": "secretpassword"
}
```

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
  ```

## Solicitar redefinição de senha

Endpoint para solicitar a redefinição de senha.

**URL:** `/users/forgot-password`

**Método:** `POST`

**Corpo da solicitação:**

```json
{
  "email": "john@example.com"
}
```

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "message": "E-mail enviado com sucesso"
  }
  ```

## Redefinir senha

Endpoint para redefinir a senha de um usuário.

**URL:** `/users/reset-password`

**Método:** `POST`

**Corpo da solicitação:**

```json
{
  "email": "john@example.com",
  "token": "reset_token_here",
  "password": "newpassword"
}
```

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "message": "Senha atualizada com sucesso"
  }
  ```

## Obter usuário por ID

Endpoint para obter um usuário pelo ID.

**URL:** `/users/{user_id}`

**Método:** `GET`

**Parâmetros de caminho:**

- `user_id` (obrigatório): ID do usuário.

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "user":
  ```

{
"id": "1",
"name": "John Doe",
"email": "john@example.com"
}
}

````

## Atualizar usuário

Endpoint para atualizar os dados de um usuário.

**URL:** `/users/{user_id}`

**Método:** `PUT`

**Parâmetros de caminho:**

- `user_id` (obrigatório): ID do usuário.

**Corpo da solicitação:**

```json
{
"name": "John Doe",
"email": "john@example.com"
}
````

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

## Excluir usuário

Endpoint para excluir um usuário.

**URL:** `/users/{user_id}`

**Método:** `DELETE`

**Parâmetros de caminho:**

- `user_id` (obrigatório): ID do usuário.

**Resposta de sucesso:**

- Código de status: `200`
- Corpo da resposta:

  ```json
  {
    "message": "Usuário excluído com sucesso"
  }
  ```
