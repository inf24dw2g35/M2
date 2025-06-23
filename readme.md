## Evolução do Projeto: Integração Frontend + Backend

### Introdução

Na segunda fase do desenvolvimento, foi adicionado um **frontend completo em React**, capaz de consumir a API existente e oferecer uma interface gráfica funcional para os utilizadores (pacientes, médicos e administradores). A solução foi containerizada utilizando **Docker Compose**, integrando os serviços de backend (Node.js), base de dados (MySQL) e frontend (React via NGINX).

---

### Funcionalidades do Frontend

A aplicação web cobre todas as funcionalidades CRUD disponibilizadas pela API:

- **Autenticação via GitHub (OAuth 2.0)**
- Listagem, criação, atualização e eliminação de:
  - Médicos
  - Pacientes
  - Consultas
- Visualização de detalhes de consultas relacionadas ao utilizador autenticado

A interface foi estruturada com dois componentes principais:

- `Header`: Componente de topo com navegação e login/logout
- `LeftMenu`: Menu lateral com acesso aos recursos da API

Utilizou-se a biblioteca **Material-UI** para estilização de alguns componentes, mantendo a interface simples e funcional. O gerenciamento de estado foi feito com `useState` e `useEffect`, sem utilização de bibliotecas externas de state management.

---

### Comunicação com o Backend

As chamadas HTTP são feitas com a biblioteca **Axios**. Para garantir a persistência da sessão (cookies e autenticação via GitHub), foi configurado um **proxy entre subdomínios** no NGINX, permitindo o compartilhamento de cookies entre frontend e backend. Isso assegura que o token da sessão seja transmitido corretamente entre as camadas.

---

### Arquitetura com Docker Compose

A aplicação foi orquestrada com **Docker Compose**, composta por três serviços principais:

| Serviço   | Função                          |
|-----------|--------------------------------|
| **web**   | Frontend React servido via NGINX |
| **api**   | Backend Node.js + Express       |
| **db**    | Base de dados MySQL             |


Todos os serviços compartilham a mesma rede Docker e utilizam um ficheiro `.env` para definição de variáveis sensíveis.

---

### Testes e Validação

Os testes foram realizados manualmente, através da interface gráfica e do **Postman**. Foram verificadas as principais funcionalidades, como:

- Login via GitHub
- Criação e consulta de recursos autenticados
- Verificação de restrições de acesso entre tipos de utilizadores

Mensagens de erro básicas e redirecionamentos foram implementados para melhorar a experiência do utilizador.