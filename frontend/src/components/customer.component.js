import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSobrenome = this.onChangeSobrenome.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);

    this.state = {
      currentCustomer: {
        id: null,
        nome: "",
        sobrenome: "",
        telefone: "",
      },
      msg: "",
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeName(e) {
    const nome = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          nome: nome,
        },
      };
    });
  }

  onChangeSobrenome(e) {
    const sobrenome = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        sobrenome: sobrenome,
      },
    }));
  }

  onChangeTelefone(e) {
    const telefone = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        telefone: telefone,
      },
    }));
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then((response) => {
        this.setState({
          currentCustomer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  updateCustomer() {
    CustomerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The customer was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCustomer() {
    CustomerDataService.delete(this.state.currentCustomer.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/customers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentCustomer.nome}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sobrenome">Sobrenome</label>
                <input
                  type="text"
                  className="form-control"
                  id="sobrenome"
                  value={currentCustomer.sobrenome}
                  onChange={this.onChangeSobrenome}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sobrenome">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  id="sobrenome"
                  value={currentCustomer.telefone}
                  onChange={this.onChangeTelefone}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCustomer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}
