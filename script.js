// dashboard elements
let balnace_num = document.querySelector(".balance-number");
let expense_num = document.querySelector(".expense-number");
let income_num = document.querySelector(".income-number");
//income section elements
const income_amount = document.querySelector(".amount");
// console.log(income_amount);
const income_date = document.querySelector(".date");
const income_remarks = document.querySelector(".remarks");
const income_source = document.querySelector(".source");
const income_button = document.querySelector(".add-inc");
const income_history_ul = document.querySelector(".listTrans");
// const income_chart=;

//budget form elements
const budget_amount = document.querySelector(".budget");
const budget_type = document.querySelector(".type");
const budget_button = document.querySelector("#next-btn");
const budget_list_ul = document.querySelector("#budget-list-ul");
//expense section details
const expense_amount = document.querySelector("#expense-amount");
const expense_date = document.querySelector("#expense-date");
const expense_remarks = document.querySelector("#expense-remarks");
const expense_source = document.querySelector("#expense-source");
const expense_button = document.querySelector("#expense-btn");
const expense_history_ul = document.querySelector("#expenseChk");

//peventing the default behaviour of forms
const income_Form = document.querySelector(".income-form");
const expense_form = document.querySelector(".expense-form");

income_button.addEventListener("click", function (e) {
  e.preventDefault();
});
expense_button.addEventListener("click", function (e) {
  e.preventDefault();
});
let temp_amount = 0;
//function to update income,history and expense history...
function add(amount, date, remarks, source, ul, num) {
  if (
    amount.value === "" ||
    date.value === "" ||
    remarks.value === "" ||
    source.value === ""
  ) {
    alert("please fill out the neccesary feilds!");
  } else if (amount.value > 0 && source.value != "select type") {
    let li = document.createElement("li");

    li.innerHTML = `<span class = "color">${amount.value}</span> from <span class="color">${remarks.value}</span> on <span class="color">${date.value}</span> as <span class="color" >${source.value}</span> `;

    ul.appendChild(li);

    let current = parseInt(num.value) || 0;
    let newcr = parseInt(amount.value) || 0;
    num.value = current + newcr;
    let update = num.value;
    num.innerHTML = update;
  } else {
    alert("input correct data");
  }
  temp_amount = amount.value;
  amount.value = "";
  date.value = "";
  remarks.value = "";
  source.value = "select type";
}

document.addEventListener("DOMContentLoaded", initializeCharts);
let incomeChart, expenseChart;

function initializeCharts() {
  const ctxIncome = document.getElementById("incomeChart").getContext("2d");
  incomeChart = new Chart(ctxIncome, {
    type: "pie",
    data: {
      labels: [], // dates or remarks
      datasets: [
        {
          label: "income",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "income chart",
        },
      },
    },
  });

  const ctxExpense = document.getElementById("incomeChart").getContext("2d");
  expenseChartChart = new Chart(ctxExpense, {
    type: "pie",
    data: {
      labels: [], // dates or remarks
      datasets: [
        {
          label: "expense",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "expense chart",
        },
      },
    },
  });
}

function updateChart(chart, label, amount) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(amount);
  chart.update();
}

balnace_num.innerHTML = 0;
income_num.innerHTML = 0;
income_button.addEventListener("click", function () {
  add(
    income_amount,
    income_date,
    income_remarks,
    income_source,
    income_history_ul,
    income_num
  );
  //updating balance_num
  balnace_num.value = income_num.value || 0;
  balnace_num.textContent = balnace_num.value || 0;
  updateChart(incomeChart, income_date.value, income_amount.value);
});

let my_expense;
let my_budget;
let result;

budget_button.addEventListener("click", function (e) {
  e.preventDefault();
});

let temp_budget=0;
let temp_budget_type;
let temp_expense_source;
budget_button.addEventListener("click", function () {
  if (budget_amount.value === "" || budget_type.value === "") {
    alert("fill out the neccesary details!");
  } else if (budget_amount.value > 0) {
    let li = document.createElement("li");

    li.innerHTML = `
                        <p class="inLi">${budget_type.value}</p>
                        <span style="display:inline">${budget_amount.value}</span>
                        <div class="bar">
                            <div class="bar-color" style="width:0%"></div>
                        </div>
                        <span class="progress" style="dispaly:inline;"></span>
                    `;
    budget_list_ul.appendChild(li);

    let option = document.createElement("option");
    option.innerHTML = ` <option value="${budget_type.value}">${budget_type.value}</option>`;
    document.querySelector("#expense-source").appendChild(option);
    temp_budget = budget_amount.value;
    temp_budget_type = budget_type.value;
  } else {
    alert("input correct data");
  }

  budget_amount.value = "";
  budget_type.value = "";
});
let temp_expense=0;
let initial = 0;
expense_num.innerHTML = 0;
expense_button.addEventListener("click", function () {
  temp_expense = expense_amount.value;
  temp_expense_source = expense_source.value;
  add(
    expense_amount,
    expense_date,
    expense_remarks,
    expense_source,
    expense_history_ul,
    expense_num
  );


  //updating balance_num
  let oldbalance = balnace_num.value || 0;
  let newbalance = expense_num.value || 0;
  balnace_num.value = oldbalance - newbalance;
  balnace_num.textContent = balnace_num.value;
  console.log(temp_expense);
  console.log(temp_budget);
  let budgets = document.querySelectorAll("#budget-list-ul li");
  console.log(budgets);
  budgets.forEach((budget) => {
    let budgetType = budget.querySelector(".inLi").textContent;
    console.log(budgetType);
    console.log(temp_expense_source);
    if (budgetType === temp_expense_source && temp_expense<temp_budget) {
      let budgetValue = parseInt(budget.querySelector("span").textContent);
      console.log(budgetValue);
      let expenseValue = parseInt(expense_amount.value);
      console.log(expenseValue);
      let progressBar = budget.querySelector(".bar-color");
      let progressText = budget.querySelector(".progress");
      let currentProgress = parseFloat(progressText.textContent) || 0;
      console.log(currentProgress);
      let newProgress = currentProgress + (temp_amount / budgetValue) * 100;
      console.log(newProgress);
      progressBar.style.width = `${newProgress}%`;
      progressText.textContent = `${newProgress.toFixed(2)}%`;
    }
    else{
      alert("budget limit exceeded")
    }
  });
// }
// else{
//   alert("budget exceede!")
// }
});
