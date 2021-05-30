const db = require("../config");
const Customer = db.customers;

function ValidateCPF(cpfString) {
    let validated = false; // Start with false

    // Checking cpf lenght
    if (cpfString.length !== 14 && cpfString.length !== 11) {
      return validated;
    }

    // Checking for "formated cpf (000.000.000-00)" and replace "points"
    if (cpfString.length === 14) {
      cpfString = cpfString.replace(".", "");
      cpfString = cpfString.replace(".", "");
      cpfString = cpfString.replace("-", "");
    }

    // Variables to check cpf valid (sum and rest)
    let sum = 0,
      rest = 0;

    // Checking for "null" CPF
    if (cpfString === "00000000000") {
      return validated;
    }

    // sum numbers
    for (let i = 1; i <= 9; ++i) {
      sum += parseInt(cpfString.substring(i - 1, i)) * (11 - i);
    }

    // Getting rest
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }

    if (rest != parseInt(cpfString.substring(9, 10))) {
      return validated;
    }

    validated = true;
    console.log(validated)
    return validated;
  }

  // Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!ValidateCPF(req.body.cpf)) {
    res.status(400).send({ success: false, msg: "CPF inválido." });
    return;
  }

  // Create a Customer
  const customer = new Customer({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    telefone: req.body.telefone,
    cpf: req.body.cpf,
  });

  // Save Customer in the database
  customer
    .save(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Customer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ msg: "Not found Customer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error retrieving Customer with id=" + id });
    });
};

// Find a single Customer with an id
exports.findByCPF = (req, res) => {
  const cpf = req.body.cpf;
  Customer.find({ cpf: cpf })
    .then((data) => {
      if (!data || data.length === 0)
        res
          .status(400)
          .send({ success: false, msg: "Informações de CPF não armazenadas." });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error retrieving Customer with id=" + id });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      msg: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`,
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};

// Delete all customers from the database.
exports.deleteAll = (req, res) => {
  Customer.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} customers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    });
};

// Find all telefone customers
exports.findAllTelefone = (req, res) => {
  Customer.find({ telefone: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};
