# API BACKEND DIAGNOSTIC EXAM

This is a basic user management system API implementing authentication (login page), CRUD functions, wherein admin can:

- Add a new user
- Edit a user
- Delete a user
- View list of all users in the system
- Allow multiple users to be removed
- User must have fields
  1. First name
  2. Last name
  3. Address
  4. Postcode
  5. Contact Phone Number
  6. Email
  7. Username
  8. Password

# SETUP

## Installation of NodeJS

Download and install nodejs from [nodejs.dev](https://nodejs.dev/download)
After installation, type this in terminal.

> If it prints/shows back a number like `8.12.1`.
>
> Your installation is successful.

- `npm -v`

## Installation of Database

> To make this project working on your computer (local environment), you need to setup first your computer by intalling this requirements.

This project uses MySQL as database, so we need to install [MySQL Server Community Edition](https://dev.mysql.com/downloads/installer/).

- download binary/executable file
- install MySQL
- leave port as default to 3306
- create a user { named: "**_root_**" , password: "**_mysql_**" } **_(double quotes not included)_**
- login to root user in mysql CLI and create database named "**_test_**" **_(double quotes not included)_**

## Installation of Node Dependencies

> This is the internal dependencies where the codes of this project depends on.

Install this project's dependency, by running this in terminal in root of the project where package.json is located

- `npm i`

# RUNNING THIS SERVER

After you've
To run this project, run this in terminal in root of the project where package.json is located

- `npm start` or `npm run dev`

# RUNNING TESTS

To run test cases, run this in terminal in root of the project where package.json is located

- To run all test in the project run `npm test`
- To run single test in the project run `npm test -- [filename of the file to test]`

# SEEDING

To generate nth amount of users run

- `npm run seed user <number of users to generate>`

# MIGRATION

To generate migration run

- `npm run migration:generate`

To apply generated migration descending by date

- `npm run migration:run`

To revert migration from the last migration run

- `npm run migration:revert`
