# Express Prisma

Architect an express.js application

## Installation

#### from git

```bash
git clone --depth 1 git@github.com:samayun/prisma-express.git YOUR_PROEJECT_NAME

cd YOUR_PROEJECT_NAME
```

## Commands and Usage

```bash

# clone repository & navigate project

# Copy .env.example to .env
 cd api

 cp .env.example .env


```

## Run Using Docker Compose

```bash

# Build container image
 make build

# Run containers
 make logs

```

## Run Using NPM

```bash

npm install

npm run dev
```

### Check List

<details>
  <summary>
  ➡️ Architechture
  </summary>

- ✅ Modular way
- ✅ Monolithic - Layered Architechture (3 Tier, actually 2 tier implemented here)

</details>

<details>
<summary>
 ➡️ Languages/Framework/Library
</summary>

- Language: ↪️ [Node.js](https://nodejs.org/en) as JS server side runtime
- Framework: ↪️ [Express.js](https://expressjs.com) as web framework
- Database: ↪️ [MongoDB](https://www.mongodb.com) as NoSQL Database
- Documentation: ↪️ [Swagger-AutoGen](https://github.com/davibaltar/swagger-autogen)
- Boilerplate: ↪️ [Penguin.JS](https://github.com/samayun/penguin.js)

</details>

<details>
<summary>
 ➡️ Virtualization
</summary>

- Build Container by Docker : `make build` or `sudo docker-compose up --build --detach`
- Run Container by Docker: `make logs`

</details>
