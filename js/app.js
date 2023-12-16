const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-btns button");
const customTipInput = document.getElementById("custom");
const peopleInput = document.getElementById("people");
const tipAmountOutput = document.getElementById("tipAmount");
const totalOutput = document.getElementById("total");
const resetButton = document.querySelector(".reset-btn");

function calculateTip() {
  const billAmount = parseFloat(billInput.value);
  const tipPercentage = getTipPercentage();
  const numberOfPeople = parseInt(peopleInput.value);

  if (
    isNaN(billAmount) ||
    isNaN(tipPercentage) ||
    isNaN(numberOfPeople) ||
    billAmount <= 0 ||
    numberOfPeople <= 0
  ) {
    alert("Please enter valid numbers");
    return;
  }

  const tipAmount = (billAmount * tipPercentage) / 100 / numberOfPeople;
  const totalPerPerson = billAmount / numberOfPeople + tipAmount;

  tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
  totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function getTipPercentage() {
  if (customTipInput.value !== "") {
    return parseFloat(customTipInput.value);
  } else {
    const selectedButton = document.querySelector(".tip-btns button.active");
    return parseFloat(selectedButton.textContent);
  }
}

tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    customTipInput.value = "";
    calculateTip();
  });
});

customTipInput.addEventListener("input", function () {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  calculateTip();
});

peopleInput.addEventListener("input", calculateTip);

resetButton.addEventListener("click", function () {
  billInput.value = "";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  customTipInput.value = "";
  peopleInput.value = "";
  tipAmountOutput.textContent = "$0.00";
  totalOutput.textContent = "$0.00";
});

calculateTip();
