module.exports = {
    host: "localhost",
    user: "root",
    password: "root",
    db: "expense",
    dialect: "mysql",
    pool : {
        max: 5,
        min: 0,
        acqire: 30000,
        idle: 10000
    }
}