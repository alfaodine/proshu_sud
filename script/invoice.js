const button = document.querySelector("#invoice");

const reqBody = {
    amount: 3000,
    ccy: 980,
    merchantPaymInfo: {
      reference: "84d0070ee4e44667b31371d8f8813947",
      destination: "Оплата юридичних послуг ProshuSud",
      basketOrder: [
        {
          name: "Табуретка",
          qty: 2,
          sum: 1500,
          icon: "string",
          unit: "шт.",
        },
      ],
    },
    redirectUrl: "https://www.google.com/",
    validity: 3600,
    paymentType: "debit",
  }

const call = async (e) => {
    e.preventDefault();

  try {
    response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": "mywjyF3uLxweaEdGkdXL2Ww",
      },
      body: JSON.stringify(reqBody)
    });
  } catch (e) {
    console.log(e);
  }
  
  const { pageUrl } = await response.json();
  window.open(pageUrl, '_blank').focus();
};

button.addEventListener('click', call)















// let btnInvoice = document.querySelector('#invoice');


// const getInvoice = async (e) =>{
//     e.preventDefault();
//     console.log ('111');

//     const body = {
//         "amount": 4200,
//         "ccy": 980,
//         "merchantPaymInfo": {
//         "reference": "84d0070ee4e44667b31371d8f8813947",
//         "destination": "Покупка щастя",
//         "basketOrder": [
//         {
//         "name": "Табуретка",
//         "qty": 2,
//         "sum": 1700,
//         "icon": "string",
//         "unit": "шт."
//         }
//         ]
//         },
//         "redirectUrl": "string",
//         "webHookUrl": "string",
//         "validity": 3600,
//         "paymentType": "debit"
//         }

//     try{
//         const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Token': 'uN3ugCfes6OMV_LaY2Wu9WpbMEY1T4xTjNCClxf6wKO4',
//                 'text-token': '1111122223333',
//             },
//             // mode: 'no-cors',
//             body: JSON.stringify(body)
//         })
//     // const data = await response.json();
//     console.log(response);
//     } catch (e) {
//         console.log(e)
//     }



// }

// btnInvoice.addEventListener('click', getInvoice)