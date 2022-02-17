# Carapi

[![typescript](https://img.shields.io/badge/typescript-4.3.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![postgres](https://img.shields.io/badge/postgres-8.6.0-326690?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![redis](https://img.shields.io/badge/redis-3.1.2-d92b21?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![eslint](https://img.shields.io/badge/eslint-7.31.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![jest](https://img.shields.io/badge/jest-27.0.6-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/Daniel-Vinicius/rentx/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

API for car rental, developed during Rocketseat's Nodejs Ignite.

---

### Installing dependecies

```
$ yarn
```
or:
```
$ npm install
```
> [`eslint`](https://eslint.org/) e [`prettier`](https://prettier.io/) were installed and configures to mantain the code clean and organized.

---

### **Database configuration**
This applications runs on two different databases: [Postgres](https://www.postgresql.org/) and [Redis](https://redis.io/). For a faster configuration the use of docker-composer is recommended [docker-compose](https://docs.docker.com/compose/), you only need to up all the services:
```
$ docker-compose up -d
```
### Redis
Responsable for storing the _rate limit_ middleware. If, for some reason, you prefer to create a Redis container, instead os using `docker-compose` you can use:
```
$ docker run --name rentx-redis -d -p 6379:6379 redis:alpine
```

### Postgres
Responsible for storing the application data. If, for some reason, you prefer to create a Postgress container, instead os using `docker-compose`, you can use:
```
$ docker run --name rentx-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
> Next on _Postgres_, create two databases: `rentx` e`rentx_test` (if you want to run the tests).

### Migrations
You also need to run the migrations:
```
$ yarn ts-node-dev ./node_modules/typeorm/cli.js migration:run
```
Or:
```
$ yarn typeorm migration:run
```
> You can learn more about [TypeORM Migrations](https://typeorm.io/#/migrations).
---

## `.env`
In this file, you can configure the Redis and Postgress database connection, JWT, email, sentry, storage e AWS configurations (if necessary).
Rename `.env.example` in the root directory for `.env` and then update its configurations.

---

### **Rate Limiter (Optional)**
The project is already pre-configures, but you can also adjust it according to your necessities.

* `src/shared/infra/http/middlewares/rateLimiter.ts`


> The lib [`rate-limiter-flexible`](https://github.com/animir/node-rate-limiter-flexible) was used to configure the API rate limits, for more details [click here](https://github.com/animir/node-rate-limiter-flexible/wiki/Options#options).
---

### **Running the application**
To start the application run the following command:
```
$ yarn dev:server
```
Or:
```
npm run dev:server
```

---

### **Running the tests**
 [Jest](https://jestjs.io/) was used for all the tests. To run it use the following command:
```
$ yarn test
```
Or:
```
$ npm run test
```

---

### **Coverage report**
You can see the coverage report inside `coverage`. It is automatically created after the tests execution is finished.
