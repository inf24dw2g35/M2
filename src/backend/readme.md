# Relatório Técnico  
## Projeto: Plataforma de Gestão de Consultas Médicas

## Introdução

Este relatório descreve o desenvolvimento de uma **API RESTful** para uma **Plataforma de Gestão de Consultas Médicas**, criada no contexto da unidade curricular de **desenvolvimento Web 2**. A plataforma permite que médicos, pacientes e consultas sejam geridos de forma segura.

O projeto visa oferecer uma interface de serviços para uma aplicação web, garantindo proteção de acesso por meio de autenticação OAuth 2.0, respeitando regras de autorização e utilizando ferramentas amplamente adotadas na indústria como **Node.js**, **Express**, **MySQL**, **Swagger** e **Docker**.


## Objetivos

- Desenvolver uma API REST com suporte completo a operações CRUD.
- Utilizar autenticação baseada em **OAuth 2.0**.
- Garantir que utilizadores autenticados acedam **apenas aos seus próprios recursos**.
- Estabelecer uma **relação 1:N** entre dois dos recursos modelados.
- Representar todos os recursos em **JSON**.
- Documentar a API com **OpenAPI 3.0 (Swagger)**.
- Disponibilizar a aplicação em ambiente multi-container (Node.js + MySQL) com **Docker Compose**.
- Fornecer uma **collection do Postman** para facilitar testes e integração.

---
## Organização do repositorio

* todo o codigo do trabalho esta em    [src folder](src/).
    * [pasta de configurações](config/)
        * authorize.js
        * db.js
        * passport.js
    * [pasta de controladores](constrollers/)
        * consultaController.js
        * medicoController.js
        * pacienteController.js
    * [documentação Swagger](docs/)
        * swagger.yaml
    * rotas disponiveis na api [routes](routes/)
        * authRoutes.js
        * consultasRoutes.js
        * medicoRoutes.js
        * pacienteRoutes.js
    * local onde se realiza as querys ao banco de dados [services](services/)
        * consultaService.js
        * medicoService.js
        * pacienteService.js
    * [informação sql](sql/)
        * aestrutura.sql
        * dados.sql
    * .env
    * accounts_for_teste.txt
    * docker-compose-yaml
    * dockerfile
    * dockerfile.mysql
    * index.js
    * M1postman_collection.json
    * package-lock.json
    * package.json

* documentão auxiliar esta em [doc folder](doc/).
    * 1c.md
    * 2c.md
    * 3c.md
    * 4c.md
* readme.md

---
## Modelagem da Solução

### Entidades Principais

A base de dados foi modelada com três tabelas principais:

#### a) Médicos
Contém os dados profissionais dos médicos disponíveis na plataforma.

| Campo         | Tipo         | Descrição                   |
|---------------|--------------|-----------------------------|
| id            | INT (PK)     | Identificador único         |
| nome          | VARCHAR(100) | Nome do médico              |
| especialidade | VARCHAR(100) | Especialidade médica        |
| email         | VARCHAR(100) | Email de contacto (único)   |
| telefone      | VARCHAR(20)  | Número de telefone          |

#### b) Pacientes
Representa os utilizadores que podem marcar consultas.

| Campo           | Tipo         | Descrição                         |
|------------------|--------------|-----------------------------------|
| id              | INT (PK)     | Identificador único               |
| nome            | VARCHAR(100) | Nome completo                     |
| email           | VARCHAR(100) | Email de contacto (único)         |
| telefone        | VARCHAR(20)  | Número de telefone                |
| senha           | VARCHAR(255) | Senha sem encriptação             |
| data_nascimento | DATE         | Data de nascimento                |

#### c) Consultas
Relaciona médicos com pacientes em horários específicos.

| Campo        | Tipo         | Descrição                                         |
|--------------|--------------|---------------------------------------------------|
| id           | INT (PK)     | Identificador da consulta                         |
| data         | DATETIME     | Data e hora da consulta                           |
| status       | ENUM         | Estado da consulta: 'Agendada', 'Cancelada', 'Finalizada' |
| descricao    | TEXT         | Descrição/motivo da consulta                      |
| medico_id    | INT (FK)     | Médico responsável pela consulta                  |
| paciente_id  | INT (FK)     | Paciente que marcou a consulta                    |

> **Relação:** médicos ou pacientes, podem ter várias consultas (**1:N**).

---
## Arquitetura da Aplicação

A API foi desenvolvida seguindo os princípios da **arquitetura REST** e utiliza os principais verbos do protocolo HTTP:

| Verbo HTTP | Ação Realizada      |
|------------|---------------------|
| `GET`      | Obter recurso(s)    |
| `POST`     | Criar novo recurso  |
| `PUT`      | Atualizar recurso   |
| `DELETE`   | Remover recurso     |

### Recursos Disponíveis

- `/medicos`
- `/pacientes`
- `/consultas`

Todas as respostas da API são fornecidas no formato **JSON**, promovendo interoperabilidade com outras aplicações.

#### Pacientes
- get `pacientes/`
- post `pacientes/`
- get `pacientes/:id`
- put `pacientes/:id`
- delete `pacientes/:id`
- get `pacientes/:id/consultas/`

#### Medicos
- get `medicos/`
- post `medicos/`
- get `medicos/:id`
- put `medicos/:id`
- delete `medicos/:id`

#### Consultas
- get `consultas/`
- post `consultas/`
- get `consultas/:id`
- put `consultas/:id`
- delete`consultas/:id`

#### Outras
- get `/` ou `github/` para autentificação.
- get `logout/` para encerar a sessão.
- get `docs/` para a documentação openAPI.
- get `autenticado/` pagina onde é redirecionada caso se logue. 

---
## Autenticação e Autorização

### Protocolo Utilizado
A camada de segurança foi implementada utilizando **OAuth 2.0** com o provedor **GitHub** para autenticação.

### Controle de Acesso
- Após login via GitHub, o utilizador é autenticado através do **Passport.js**.
- A sessão é gerida com cookies e `express-session`.
- Utilizadores autenticados em funçoes diferente, tem acessos diferentes:
  - pacientes:
    - Aceder às seus **próprios dados**.
    - Aceder às suas **próprias consultas**.
    - Ver detalhe de uma consulta especifica que lhe pertença.
  - medicos: 
    - CRUD total de pacientes e consultas.
    - Aceder aos seu proprios dados.
  - adm:
    - **Acesso total**
- Todos os pedidos protegidos exigem **token válido ou sessão ativa**.

### Log de Atividades
No ato da autenticação exibe na consola detalhes do utilizador:

---
###  Criador
* Gustavo Henrique Paiva Amorin a043259@umaia.pt