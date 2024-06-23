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

  amount.value = "";
  date.value = "";
  remarks.value = "";
  source.value = "select type";
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
});

let my_expense;
let my_budget;
let result;

function calc_percent(expense, budget) {
  my_expense = expense;
  my_budget = budget;
  result = (my_expense / my_budget) * 100;
  return result;
}

budget_button.addEventListener("click", function (e) {
  e.preventDefault();
});

let temp_budget;
let temp_budget_type;
let temp_expense_source;
budget_button.addEventListener("click", function () {
  if (budget_amount.value === "" || budget_type.value === "") {
    alert("fill out the neccesary details!");
  } else if (budget_amount.value > 0) {
    let li = document.createElement("li");

    li.innerHTML = `<li>
                        <p class="inLi">${budget_type.value}</p>
                        <span style="display:inline">${budget_amount.value}</span>
                        <div class="bar">
                            <div class="bar-color" style="width:0%"></div>
                        </div>
                        <span class="progress" style="dispaly:inline;"></span>
                    </li>`;
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
let percent;
let temp_expense;
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
  //budget section
  if (temp_budget_type === temp_expense_source) {
    percent = calc_percent(temp_expense, temp_budget);
    let newone = initial + percent;
    initial = newone;
    console.log(newone);

    let bar = (document.querySelector(".bar-color").style.width = `${newone}%`);
    document.querySelector(".progress").textContent = `${newone}%`;
  }
});
//multiple budget m problem aa rhi h.. 
//puraane bvariables ki h shyd........