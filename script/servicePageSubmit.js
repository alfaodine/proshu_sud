
submitBtn = document.querySelector('#regForm');

submitBtn.addEventListener('click', getFormData)


function getFormData() {
    let x = document.getElementsByClassName("tab");
    let textFromForm = ``;
    if (currentTab >= x.length){
        let allFields = document.querySelectorAll('input[type="text"], input[type="date"], input[type="radio"]:checked, input[type="checkbox"]:checked, textarea');
        let allLabels = document.querySelectorAll('.tab > label, .register-form > label, .personal-info-form > label, .radio-btn > label, .checkbox > label');
        for (let i = 0; i < allFields.length; i++){
            textFromForm += `${allLabels[i].innerText}: ${allFields[i].value} \n`;
        }
        sendEmail(textFromForm);
        getInvoice();
    }

}

function sendEmail (text) {

    fetch('https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail',      {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: "ustroistva1@gmail.com",
          senderEmail: `ustroistva@gmail.com`,
          message: `${text}`,
        })
    })
}


const getInvoice = async () => {

    const reqBody = {
        amount: 3400,
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
        redirectUrl: "https://proshusud.com.ua/payment.html/",
        validity: 3600,
        paymentType: "debit",
      }

  try {
    response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
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
  
  const { pageUrl } = await response.json();
  window.open(pageUrl, "_self").focus();
};