<div align="center">
  <img src="https://i.imgur.com/KetW39Y.png">
  <h1>Artemis<span color="red">QL</span></h1>
  <h3>A GraphQL migration tool and relational database visualizer</h4>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
</div>

## 🔎 Overview
ArtemisQL is an open-source web application providing a SQL (Postgres) database GUI and custom-generated GraphQL schema (type defs, queries, mutations) and resolvers created by developers for developers, to ease the transition from REST to GraphQL. 

Read more on <a href="https://medium.com/@helloartemisql/introducing-artemisql-2d39cf391437">Medium.</a><br/>
Accelerated by <a href="https://github.com/oslabs-beta/" />OS Labs</a>.

## ⚙️ Getting Started
### Visit <a href="https://artemisql.io/">ArtemisQL.io</a> to utilize the tool.

#### Connect to a database
* Input your PostgreSQL URI
* OR use the sample database to view data rendered in an interactive diagram.

<img src="client/assets/demo1.gif" width="560" height="400" /><br />

#### Visualize your data
* Easily view the relationships between the tables via the links that highlight the foreign key constraints.
* Move any table and arrange them to optimally view the structure of the database and the relationships between the tables.
  
<img src="client/assets/demo2.gif" width="560" height="400" /><br />

#### Generate GraphQL Schema
* View the generated GraphQL schema, including the types and associated resolvers.
* Use the copy button to effortlessly integrate the code into your project.

<img src="client/assets/demo3.gif" width="560" height="400" /><br />

#### GraphQL Sandbox
* Interactively construct full queries using the sample database.
* Use the "Docs" to explore the possible queries, fields, types, mutations, and more.

<img src="client/assets/demo4.gif" width="560" height="400" /><br />

## 🏗️ For Developers - How to Contribute
We would love for you to test our application and submit any issues you encouter. Please feel free to fork your own repository to and submit your own pull requests.

How you can contribute:
- Submitting or resolving GitHub issues
- Implementing features
- Helping market our application

Please make sure you have the following:
- [NodeJS](https://nodejs.org/en/)
- [NPM ](https://www.npmjs.com/)

1. Clone the repo.
   ```sh
   git clone https://github.com/oslabs-beta/artemisql.git
   ```
2. Install the package dependencies.
   ```sh
   npm install
   ```
3. Create an `.env` file in the project root directory and initialize PG_URI constant. If you want to use your own PostgresQL database, feel free to put your URI here. If you would like to use our sample Starwars database, please contact us at helloartemisql@gmail.com.
   ```sh
   PG_URI= 
   ```
4. To run the application in development mode, please run following command and navigate to http://localhost:8080/.

   ```sh
   npm run dev
   ```

5. To run the application in production mode, please run the following commands and navigate to http://localhost:3000/.
   ```sh
   npm start

   npm run build
   ```

6. To run the application against our testing suite, please run the following command.
   ```sh
   npm run test
   ```
## 🧬 Built With

- [React](https://reactjs.org/)
- [React Flow](https://reactflow.dev/)
- [React Router](https://reactrouter.com/)
- [Material UI](https://mui.com/)
- [GraphQL](https://graphql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## 🤖 Developers

[![JohnnyBryan][johnny-bryan-shield]][johnny-bryan-linkedin-url] <br/>
[![JenniferChau][jennifer-chau-shield]][jennifer-chau-linkedin-url] <br/>
[![JohnLin][john-lin-shield]][john-lin-linkedin-url] <br/>
[![TarasSukhoverskyi][taras-sukhoverskyi-shield]][taras-sukhoverskyi-linkedin-url]


## License 
This product is licensed under the MIT License.

[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/artemisql.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/artemisql/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/artemisql.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/artemisql/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/artemisql.svg?style=for-the-badge
[issues-url]: https://github.com/oslabs-beta/artemisql/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/artemisql

[johnny-bryan-shield]: https://img.shields.io/badge/-Johnny%20Bryan-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[johnny-bryan-linkedin-url]: https://www.linkedin.com/in/john-bryan-10a3bbb9/
[jennifer-chau-shield]: https://img.shields.io/badge/-Jennifer%20Chau-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[jennifer-chau-linkedin-url]: https://www.linkedin.com/in/jenniferchau512/
[john-lin-shield]: https://img.shields.io/badge/-John%20Lin-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[john-lin-linkedin-url]: https://www.linkedin.com/in/john-lin-/
[taras-sukhoverskyi-shield]: https://img.shields.io/badge/-Taras%20Sukhoverskyi-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[taras-sukhoverskyi-linkedin-url]: https://www.linkedin.com/in/taras-sukhoverskyi-628642145/
