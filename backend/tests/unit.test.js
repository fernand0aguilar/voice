const request = require("supertest");
const app = require("../server");

describe('Litmus Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  

describe('Test Base API endpoint', () => {
  it('should test that endpoint is reached', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toEqual("Welcome to application.");  
  })
})

describe("User Endpoints", () => {
  it("should try to create a new user and validate cpf", async () => {
    const res = await request(app).post("/api/customers").send({
      nome: "Joao",
      sobrenome: "Carlos",
      telefone: "(11)968552211",
      cpf: "88522633910",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("success");
    expect(res.body).toHaveProperty("msg");
    expect(res.body).toEqual({
      success: false,
      msg: "CPF inválido.",
    });
  });

  it("should try to get an user sending the cpf as a param", async () => {
    const res = await request(app).post("/api/customers/findByCPF").send({
      cpf: "88522633910",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success");
    expect(res.body).toHaveProperty("msg");
    expect(res.body).toEqual({
      success: false,
      msg: "Informações de CPF não armazenadas.",
    });
  });
});