const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// Create and Save a new todo 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a todo
    const todo = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save todo in the database
    Todo.create(todo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating todo list."
        });
      });
  };

// Retrieve all todos from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Todo.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todos."
        });
      });
  };

// Find a single todo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Todo.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving todo with id=" + id
        });
      });
  };

// Update a todo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Todo.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Todo was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update todo with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating todo with id=" + id
        });
      });
  };

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Todo.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Todo was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete todo with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Todo with id=" + id
        });
      });
  };

// Delete all todo from the database.
exports.deleteAll = (req, res) => {
    Todo.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Todos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all todo."
        });
      });
  };

// Find all published todos
exports.findAllPublished = (req, res) => {
    Todo.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todos."
        });
      });
  };