const db = require("../models");
const Expense = db.expenses;
const Op = db.Sequelize.Op;

// Create and Save a new expense
exports.create = (req, res) => {
    // Validate request
    if (!req.body.item) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a expense
    const expense = {
      date:req.body.date,
      item: req.body.item,
      amount: req.body.amount,
      published: req.body.published ? req.body.published : false
    };
  
    // Save expense in the database
    Expense.create(expense)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the expense list."
        });
      });
  };

// Retrieve all expenses from the database.
exports.findAll = (req, res) => {
    const item = req.query.item;
    var condition = item ? { item: { [Op.like]: `%${item}%` } } : null;
  
    Expense.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving expenses."
        });
      });
  };

// Find a single expense with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Expense.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving expenses with id=" + id
        });
      });
  };

// Update an expense by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Expense.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Expense was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update expense with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating expense with id=" + id
        });
      });
  };

// Delete an expense with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Expense.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Expense was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete expense with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete expense with id=" + id
        });
      });
  };

// Delete all expenses from the database.
exports.deleteAll = (req, res) => {
    Expense.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Expenses were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all expenses."
        });
      });
  };

// Find all published expenses
exports.findAllPublished = (req, res) => {
    Expense.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving expenses."
        });
      });
  };
