const button = document.querySelector("#invoice");

function sendEmail (e) {
    e.preventDefault();
    console.log('email');

    fetch('https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail',      {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: "ustroistva1@gmail.com",
          senderEmail: "yatskevych.andrii@gmail.com",
          message: "HELLO WORLD THIS IS FROM REACT APP test test.",
        //   base64Data: base64,
          date: new Date(),
        //   fileName: "TEST_FILE_NAME",
        })
    })
}

button.addEventListener('click', sendEmail)