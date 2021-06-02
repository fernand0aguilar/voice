import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);

    this.state = {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index
    });
  }

  render() {
    const { customers, currentCustomer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Customers List</h4>
          <ul className="list-group">
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                {customer.nome} {customer.sobrenome}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentCustomer.nome}
              </div>
              <div>
                <label>
                  <strong>Sobrenome:</strong>
                </label>{" "}
                {currentCustomer.sobrenome}
              </div>
              <div>
                <label>
                  <strong>Telefone:</strong>
                </label>{" "}
                {currentCustomer.telefone}
              </div>
              <div>
                <label>
                  <strong>CPF:</strong>
                </label>{" "}
                {currentCustomer.cpf}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
