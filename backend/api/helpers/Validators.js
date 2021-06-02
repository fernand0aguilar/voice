exports.ValidateCPF = (cpfString) => {
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
  console.log(validated);
  return validated;
}

exports.ValidatePhoneNumber = (phoneNumber) => {

  const phoneRegExp = new RegExp(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)

  return phoneRegExp.test(phoneNumber)

}