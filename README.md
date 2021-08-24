<!-- PROJECT LOGO -->
<br />
<p align="center">
 <a href="https://github.com/matias-rivera/restobar/">
    <img src="./logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">RESTOBAR</h3>

  <p align="center">
    Restaurant Management App.
    <br />
    <a href="https://restobar-example.herokuapp.com/"><strong>View DEMO »</strong></a>
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
         <li><a href="#installation">Installation</a></li>
        <li><a href="#run-with-docker">Run with Docker</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#preview">Preview</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the Project

![]()
[![Restobar Screen Shot](https://i.ibb.co/YZStk7w/restobar.png)](https://restobar-example.herokuapp.com/)

Restaurant Management App made with NodeJS, Express, MySQL, ReactJS y Redux.

App para la Administración de Restaurante desarrollada con NodeJS, Express, MySQL, ReactJS y Redux.

### Built With

-   [ReactJS](https://es.reactjs.org/)
-   [Express](https://expressjs.com/es/)
-   [NodeJS](https://nodejs.org/es/)
-   [Redux](https://redux.js.org/)
-   [Sequelize](https://sequelize.org/)
-   [MySQL](https://www.mysql.com/)
-   [AdminLTE](https://adminlte.io/)

<!-- GETTING STARTED -->

## Getting Started

There are two ways to start this project. The first one which needs some configuration and the easy one, with docker.

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/matias-rivera/restobar.git
    ```

2. You will need to install a [Mysql Server](https://www.mysql.com/), i think that [WAMP](https://www.wampserver.com/en/) is an easy tool to get started. Then create a database.

3. Go to "backend", install the dependencies.

    ```sh
    npm install
    ```

    Open ".env.example", set the database variables, then change the file name to ".env"

    ```
     NODE_ENV=development
     PORT=5000
     JWT_SECRET=[YOUR SECRET]
     DB_USER=[DATABASE USER]
     DB_NAME=[DATABASE NAME]
     DB_PASSWORD=[DATABASE PASSWORD]
     DB_HOST=[DATABASE HOST]
     DB_DIALECT=mysql
    ```

    Fill the database. These commands will make the work. The first one creates the structure, the second fills the database with some initial data.

    ```sh
        npx sequelize-cli db:migrate
        npx sequelize-cli db:seed:all
    ```

4. RUN
    ```sh
    npm run dev
    ```
5. Now, go to "frontend". Install the dependencies
    ```sh
    npm install
    ```
    You will need to set a proxy, open package.json and write this. More information about proxies [here](https://create-react-app.dev/docs/proxying-api-requests-in-development/).
    ```sh
    "proxy": "http://localhost:5000"
    ```
6. RUN
    ```sh
    npm start
    ```

### Run with Docker

1. Install [Docker](https://www.docker.com/). More information [here](https://docs.docker.com/desktop/windows/install/).

2. Clone the repo

    ```sh
    git clone https://github.com/matias-rivera/restobar.git
    ```

3. Run Docker compose
    ```sh
    docker-compose up --build
    ```
4. It should start at "localhost:3000".

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Matías Rivera - jnmatiasrivera@gmail.com

Project Link: [https://github.com/matias-rivera/restobar/](https://github.com/matias-rivera/restobar/)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

-   [express-async-handler](https://github.com/Abazhenov/express-async-handler)
-   [express-validator](https://express-validator.github.io/docs/)
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   [multer](https://github.com/expressjs/multer)
-   [nodemon](https://github.com/remy/nodemon)
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   [redux-thunk](https://github.com/reduxjs/redux-thunk)
-   [axios](https://github.com/axios/axios)
-   [font awesome](https://fontawesome.com)
-   [create-react-app](https://github.com/facebook/create-react-app)

<!-- PREVIEW -->

## Preview

![dashboard](https://i.ibb.co/YZStk7w/restobar.png)
![in_place_orders](https://i.ibb.co/HhmMpwP/inplace.png)
![compra](https://i.ibb.co/0mSLtW4/COMPRA.png)
![order-view](https://i.ibb.co/8sWPrVM/EDIT-ORDER.png)
![orders](https://i.ibb.co/XkCXXct/ORDENES.png)
![users](https://i.ibb.co/cDWsgw7/USERS.png)
![profile](https://i.ibb.co/CBPjKFg/profile.png)
