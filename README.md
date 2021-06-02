# voice
## How to run

> run frontend with react
```
cd frontend/
yarn install
yarn start
```


> run server with node.js
* required to install node and mongodb-community locally


<!-- (alterantively run mongo db with `docker-compose up`) -->

```
cd backend/
yarn install
yarn serve
```
Run backend unit tests with
> yarn tests



## Backend Endpoints

```
* GET /api/customers/ == customers.findAll
* GET /api/customers/:id == customers.findOne
* POST /api/customers/ == customers.create
* POST /api/customers/findByCPF == customers.findByCPF
* PUT /api/customers/:id == customers.update(id)
* DELETE /api/customers/:id == customers.delete(id)
```