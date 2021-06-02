import React, { useState } from "react";
import CustomerDataService from "../services/customer.service";

const AddCustomer = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCPF] = useState("");
  const [submitted, setSubmitted] = useState({ status: false, response: "" });

  const saveCustomer = () => {
    let data = {
      nome: nome,
      sobrenome: sobrenome,
      telefone: telefone,
      cpf: cpf,
    };

    CustomerDataService.create(data)
      .then((response) => {
        console.log(response.data);
        setSubmitted({ status: true, response: response.data });
        newCustomer();
      })
      .catch((e) => {
        console.log(e);
        setSubmitted({
          status: false,
          response: "error while creating new customer",
        });
      });
  };

  const newCustomer = () => {
    setNome("");
    setSobrenome("");
    setTelefone("");
    setCPF("");
    setSubmitted({ status: false, response: "" });
  };

  return (
    <div className="submit-form">
      <h4>Add a new user</h4>
      <div>
        <div className="form-group">
          <label htmlFor="nome">Nome: </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            name="nome"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sobrenome">Sobrenome: </label>
          <input
            type="text"
            className="form-control"
            id="sobrenome"
            required
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            name="sobrenome"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone: </label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            name="sobrenome"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF: </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            required
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
            name="cpf"
          />
        </div>

        <button onClick={saveCustomer} className="btn btn-success">
          Submit
        </button>
        {submitted.status ? (
          <h3>User Created with success!</h3>
        ) : (
          <h3>{submitted.response}</h3>
        )}
      </div>
    </div>
  );
};

export default AddCustomer;
