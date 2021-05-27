module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customers.create);

  // Retrieve all customers
  router.get("/", customers.findAll);

  // Retrieve a single Customer with cpf
  router.get("/:id", customers.findOne);

  // find a customer by cpf
  router.post("/findByCPF", customers.findByCPF);

  // Update a Customer with id
  router.put("/:id", customers.update);

  // Delete a Customer with id
  router.delete("/:id", customers.delete);

  // Create a new Customer
  router.delete("/", customers.deleteAll);

  app.use("/api/customers", router);
};
