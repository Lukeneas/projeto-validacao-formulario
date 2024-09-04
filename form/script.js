
//OBS : se o usuario desativar o JS, a validacao nao funciona
//Valid 1 : Front, Valid 2 : Back

//funcoes validacao
let B7Validator = {
  handleSubmit: (event) => {
    //para padrao submit
    event.preventDefault();
    //envie por padrao
    let send = true;

    let inputs = form.querySelectorAll("input");

    //limpe os ERROS em todo SUBMIT
    B7Validator.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      //cada input
      let input = inputs[i];
      //checagem input
      let check = B7Validator.checkInput(input);
      if (check != true) {
        //nao submit
        send = false;
        //ative erro
        B7Validator.showError(input, check);
      }
    }

    if (send) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");

    //se o campo tem regras...
    if (rules !== null) {
      //separa as regras numa array
      rules = rules.split("|");
      for (let k in rules) {
        //separação de cada rule com '='
        let rDetails = rules[k].split("=");
        //rDetails[0] é o lado esquerda de cada rule caso tenha '='
        switch (rDetails[0]) {
          //se preenchimento é obrigatório...
          case "required":
            if (input.value == "") {
              return "Campo não pode ser vazio.";
            }
            break;
          //se tem 'minimamente x caracteres'...
          case "min":
            if (input.value.length < rDetails[1]) {
              return (
                "Campo tem que ter pelo menos " + rDetails[1] + " caractes"
              );
            }
            break;
          //padrao email
          case "email":
            //se não está vazio...
            if (input.value != "") {
                //padrao regex
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //se teste errado regex...
              if (!regex.test(input.value.toLowerCase())) {
                return "E-mail digitado não é válido!";
              }
            }
            break;
        }
      }
    }

    //se o campo nao tem regras, retorne true diretamente
    return true;
  },
  showError: (input, error) => {
    //input borda vermelha
    input.style.borderColor = "#FF0000";

    //cria elemento de erro html
    let errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.innerHTML = error;

    //insira o ERRO dentro  ELEMENTOPAIDEINPUT
    //insira ANTES do ELEMENTOIRMAODEPOIS de cada input 
    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearErrors: () => {
    //remove red border de cada input
    let inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = "";
    }

    //remove todos erros
    let errorElements = document.querySelectorAll(".error");
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
};

//quando formulario for submit...
let form = document.querySelector(".b7validator");
form.addEventListener("submit", B7Validator.handleSubmit);

