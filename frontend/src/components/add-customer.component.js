import React, { useState } from "react";
import CustomerDataService from "../services/customer.service";

const AddCustomer = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCPF] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const saveCustomer = () => {
    let data = {
      nome: nome,
      sobrenome: sobrenome,
      telefone: telefone,
      cpf: cpf,
    };
    setSubmitted(true)

    CustomerDataService.create(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setNome("");
    setSobrenome("");
    setTelefone("");
    setCPF("");
    setSubmitted(false)
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCustomer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome: </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
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
              onChange={e => setSobrenome(e.target.value)}
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
              onChange={e => setTelefone(e.target.value)}
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
              onChange={e => setCPF(e.target.value)}
              name="cpf"
            />
          </div>

          <button onClick={saveCustomer} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
