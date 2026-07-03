# Alien Arithmetic

## Description

A game which uses games for you to practice math arithmetic

## To start the server

1. Start by cloning the repo with `git clone https://github.com/Vandalord12/Alien_Arithmetic.git`
2. Make sure you have version 18+ of `node` installed on your computer. Check with command `node --version`
3. Run `npm install` to download all dependencies
4. Start the server with `npm run start`
5. Go to `localhost:3000`

## How to use the application

First of all you need a Mongo DB database URI and a JWT secret key of your own. Input them into the files `db.js`, `api/middleware/userAuth.js` and `api/routes/login.js` respectively. I have not set up any environment variables so you will need to manually open the code and put them in. An admin can see every users data and can also delete them. To make an admin account find the access code in `api/routes/register.js`.

In the folder there is a pdf file called `AlienArithmeticDocs` which is the report that goes with this project. In it are detailed accounts of how to use this application, the whole development process and a lot more if you are interested. To get a good synopsis of how the application works read from pages **36** to **53**.

