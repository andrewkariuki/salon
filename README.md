# Salon documentation

This application is written in TypeScript - Express and Pug. Though not fully complete

To execute run the following commands on your terminal.

```shell
cd salon && yarn || npm install
```

Then you need to connect to a database. In the root folder there is a file called **ormconfig.json** in it you can change the type of connection i.e mysql and create a database on that DBMS, then you will have to install the npm packages for that database driver

```js
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "1234",
    "database": "salon",
```

After which you will have to run the database migrations. The migrations are already in the **./source/migrations** folder

```shell
yarn typeorm migration:run
```

Now your database is all set. You can go ahead and run the server

```shell
yarn develop || yarn start
```

The application will start on

```html
http://localhost:3000/
```
