
# NestJS Basic Crud Operations

This project is a provides Crud Operation for user and wallet-address table .

APi endpoints for testing on postman:

Register user:(POST)

http://localhost:3000/user


Update user:(PATCH)

http://localhost:3000/user/:id

Get user:(GET)

http://localhost:3000/user/:id

Delete User:(DELETE)

http://localhost:3000/user/:id


Create Wallet-Address:(POST)

http://localhost:3000/wallet-addresses

Get Wallet-Address:(GET)

http://localhost:3000/wallet-addresses/:1d

Delete Wallet-Address :(DELETE)

http://localhost:3000/wallet-addresses/:id

Update Wallet-Address :(PATCH) 

http://localhost:3000/wallet-addresses/:id




## Tech Stack

**Backend:** .NESTJS,Typescript, Nodejs, Prisma Orm
 
**Database:** PostgreSql

**Authentication:** Jwt 



## Run Locally

Clone the project

```bash
  git clone https://github.com/vrajtalati/catoff-task.git
```

Go to the project directory

```bash
  cd Catoff
  cd catoff-task
```

Install dependencies

```bash
  npm i
```
envfile setup
```bash
DATABASE_URL=""


```

 Prisma Migration
```bash
npx prisma migrate dev --name init                        
npx prisma generate
```


Start the server

```bash
   npm start
```

