module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "buyShop",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "PROD_DATABASE_URL",
    "operatorsAliases": false
  }
}