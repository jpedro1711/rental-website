# Aplicação full-stact NextJS + Java - site de locadora de veículos
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/jpedro1711/rental-website/blob/main/LICENSE) 

# Sobre o projeto

Consiste em um sistema de locadora de veículos, em que um usuário pode filtrar registros, visualizar informações, cadastrar e visualizar reservas de vaículos. Também existem funcionalidades para usuário administrador, visando o gerenciamento de carros e categorias

## Telas das principais funcionalidades do sistema

### Dashboard administrativo
![Dashboard administrativo](https://github.com/jpedro1711/rental-website/blob/main/assets/admin_dashboard.png)

### Ferramenta de filtro
![Ferramenta de filtro](https://github.com/jpedro1711/rental-website/blob/main/assets/filtro.png)

| Listagem de reservas do usuário autenticado | Formulários dinâmicos |
|--------------------------------------------|-----------------------|
| ![Listagem de reservas](https://github.com/jpedro1711/rental-website/blob/main/assets/listagem_de_reservas.png) | ![Formulários dinâmicos](https://github.com/jpedro1711/rental-website/blob/main/assets/reserva_formulario.png) |

### Responsividade
![Responsividade](https://github.com/jpedro1711/rental-website/blob/main/assets/responsividade.png)

## Diagrama de classes 
![Diagrama de classes](https://github.com/jpedro1711/rental-website/blob/main/assets/Captura%20de%20tela%202023-07-10%20211354.png)

## Tecnologias utilizadas
## Back end
- Java
- Spring Boot
- Postgres
- Maven

## Front end
- NextJS
- Tailwind css

# Como executar o projeto
## Back end
Pré-requisitos: 
- Java 11
- Realizar instalação do banco de dados postgres (https://www.postgresql.org/download/)

  ## Front end
Pré-requisitos: 
- Realizar instalação do nodeJS (https://nodejs.org/en)

``````bash
# clonar repositório
git clone https://github.com/jpedro1711/rental-website.git

# iniciar base de dados
configurar usuário e senha para "postgres" (caso já tenha usuário e senha, alterar no arquivo application.properties)
criar database com nome "rental" no pgadmin4

# entrar na pasta do projeto back end
abrir terminal na pasta do projeto
cd rental-website/backend

# executar o projeto
./mvnw spring-boot:run

# executar o projeto
./mvnw spring-boot:run

# Executar Front-end
executar os comandos:
npm install
npm run dev

# Acessar no navegador http://localhost:3000

# Autor

João Pedro Igeski Morais

https://www.linkedin.com/in/jo%C3%A3o-pedro-igeski-morais-4b9405235/


