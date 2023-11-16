document.addEventListener("DOMContentLoaded", function () {
  let fromCurrency = "RUB";
  let toCurrency = "USD";
  const apiKey = "d7d93bf09dc4ccce16eb9730eb1bc983";

  const fromButtons = document.querySelectorAll(".fromBtn");
  const toButtons = document.querySelectorAll(".toBtn");
  const amountInput = document.querySelector(".amount-input");
  const resultElement = document.getElementById("result");

  fromButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      fromButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      fromCurrency = this.textContent;
      convertCurrency();
    });
  });

  toButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      toButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      toCurrency = this.textContent;
      convertCurrency();
    });
  });

  amountInput.addEventListener("keyup", convertCurrency);

  convertCurrency();

  function convertCurrency() {
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount)) {
      resultElement.textContent = "Enter a valid amount";
      return;
    }

    fetch(
      `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    )
      .then((response) => response.json())
      .then((data) => {
        const convertedAmount = data.result;
        resultElement.textContent = `${convertedAmount}`;

        const subtitle1 = document.querySelector(".card-subtitle-1");
        const subtitle2 = document.querySelector(".card-subtitle-2");

        subtitle1.textContent = `1 ${fromCurrency} = ${data.info.quote} ${toCurrency}`;
        subtitle2.textContent = `1 ${toCurrency} = ${(1/data.info.quote).toFixed(6)} ${fromCurrency}`;
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        resultElement.textContent = "Error fetching exchange rates";
      });
  }

  fromButtons.forEach((btn) => {
    if (btn.textContent.trim() === "RUB") {
      btn.classList.add("active");
    }
  });

  toButtons.forEach((btn) => {
    if (btn.textContent.trim() === "USD") {
      btn.classList.add("active");
    }
  });
});
