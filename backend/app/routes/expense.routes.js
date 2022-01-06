module.exports = app => {
    const expenses = require("../controllers/expense.controller");
    var router = require("express").Router();

    //Create a new expense //tested
    router.post("/", expenses.create)

    //Retrive all expenses
    router.get("/", expenses.findAll)

    //Retriving all published expenses
    router.get("/published", expenses.findAllPublished)

    //Retrive a single expense with id
    router.get("/:id", expenses.findOne)

    //Update a expense with id
    router.put("/:id", expenses.update)

    //Delete a expense with id
    router.delete("/:id", expenses.delete)

    //Delete all expenses
    router.delete("/", expenses.deleteAll)
    //http://localhost:4000/api/expenses/

    app.use('/api/expenses', router)    
}
