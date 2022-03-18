const button = document.querySelector("#test");

const reqBody = {
    amount: 4200,
    ccy: 980,
    merchantPaymInfo: {
      reference: "84d0070ee4e44667b31371d8f8813947",
      destination: "Покупка щастя",
      basketOrder: [
        {
          name: "Табуретка",
          qty: 2,
          sum: 1700,
          icon: "string",
          unit: "шт.",
        },
      ],
    },
    redirectUrl: "string",
    webHookUrl: "string",
    validity: 3600,
    paymentType: "debit",
  }

const call = () => {
  try {
    fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": "uN3ugCfes6OMV_LaY2Wu9WpbMEY1T4xTjNCClxf6wKO4",
      },
      body: JSON.stringify(reqBody)
    });
  } catch (e) {
    console.log(e);
  }
};

button.addEventListener('click', call)

