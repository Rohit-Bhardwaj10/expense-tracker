"use strict";
// dashboard elements
let balnace_num = document.querySelector(".balance-number");
let expense_num = document.querySelector(".expense-number");
let income_num = document.querySelector(".income-number");

//income section elements
const income_amount_value = parseInt(document.querySelector(".amount").value);
const income_amount = document.querySelector(".amount");
const income_date = document.querySelector(".date");
const income_remarks = document.querySelector(".remarks");
const income_source = document.querySelector(".source");
const income_button = document.querySelector(".add-inc");
const income_history_ul = document.querySelector(".listTrans");

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

const income_Form = document.querySelector(".income-form");
const expense_form = document.querySelector(".expense-form");

function preventsubmission(event) {
  event.preventDefault();
}

function cleareverything(amount, date, remarks, source) {
    amount.value = "";
    date.value = "";
    remarks.innerText = "";
    source.value = "select type";
  }
 
//peventing the default behaviour of forms
income_button.addEventListener("click", preventsubmission);
expense_button.addEventListener("click", preventsubmission);
budget_button.addEventListener("click", preventsubmission);


const income_array = [];
const expense_array = [];
const balance_array = [];

//craeting history list element
function createlistelement(amount, remarks, date, source, ul) {
  let li = document.createElement("li");

  li.innerHTML = `<span class = "color">${amount.value}</span> from <span class="color">${remarks.value}</span> on <span class="color">${date.value}</span> as <span class="color" >${source.value}</span> `;

  ul.appendChild(li);
}


function addhistory(amount,date,remarks,source,ul){
  if (
    amount.value === "" ||
    date.value === "" ||
    remarks.value === "" ||
    source.value === "select type"
  ) {
    alert("please fill out the neccesary feilds!");
  } else if (amount.value < 0) {
    alert("BUG dhundh rhe ho kya,nii milega..");
    cleareverything(amount, date, remarks, source);
  } else {
    createlistelement(
      amount,
      remarks,
      date,
      source,
      ul
    );
    // cleareverything(amount, date, remarks, source);
  }
}

function updatedashboard(array,num) {
  const total = array.reduce((acc, income) => acc + income, 0);
  if(total>0){
    num.innerHTML = total;
  }
}

function update_balance(){
  const inc=parseInt(income_amount.value) || 0
  const exp=parseInt(expense_amount.value) || 0
  console.log(expense_amount);
  let balance=inc-exp
  console.log(balance);
  console.log(typeof balance);
  balnace_num.innerHTML=balance
}

// setting the canvas for the charts...
const inc_canvas=document.querySelector("#incomeChart")
const exp_canvas=document.querySelector("#expenseChart")

inc_canvas.width="450"
inc_canvas.height="550"
exp_canvas.width="450"
exp_canvas.height="550"

const budget_array=[]

//updating income
income_button.addEventListener("click", handleincome);
function handleincome() {
  income_array.push(parseInt(income_amount.value));
  addhistory(income_amount,income_date,income_remarks,income_source,income_history_ul);
  updatedashboard(income_array,income_num);
}

// managing budget options
budget_button.addEventListener('click',handlebudget)

let temp_budget;
function handlebudget(){ 
  budget_array.push(parseInt(budget_amount.value))
  temp_budget=budget_amount.value
  makebudgetbar()
}

function bar_length() {
  let bar_length = ((expense_amount.value / temp_budget) * 100);
  return bar_length;
}

function makebudgetbar(){
  if (budget_amount.value === "" || budget_type.value === "" || budget_amount<0) {
    alert("fill out the neccesary details correctly!");
  } else{
    let li = document.createElement("li");
    li.innerHTML = `
                        <p class="inLi">${budget_type.value}</p>
                        <span style="display:inline">${budget_amount.value}</span>
                        <div class="bar">
                            <div class="bar-color" style="width:${bar_length()}%"></div>
                        </div>
                        <span class="progress" style="dispaly:inline;"></span>
                    `;
    budget_list_ul.appendChild(li);
    let option = document.createElement("option");
    option.innerHTML = ` <option value="${budget_type.value}">${budget_type.value}</option>`;
    document.querySelector("#expense-source").appendChild(option);
    // cleareverything(budget_amount,budget_type)
}
}

//managing th expense section

expense_button.addEventListener('click',handleexpense)


let length=0
function handleexpense() {
  expense_array.push(parseInt(expense_amount.value));
  console.log(parseInt(expense_amount.value))
  length+=bar_length()
  addhistory(expense_amount,expense_date,expense_remarks,expense_source,expense_history_ul);
  updatedashboard(expense_array,expense_num);
  update_balance()
  console.log(temp_budget);
  console.log(length);
  console.log(budget_type.value);
  console.log(expense_source.value);
  updateBudgetBar(length)
  // cleareverything(expense_amount,expense_date,expense_remarks,expense_source)
}
function updateBudgetBar(length) {
  const bars= document.querySelectorAll("#budget-list-ul li");
  console.log(budget_type.value); 
  console.log(expense_source.value);
  bars.forEach((bar)=>{
    if(budget_type.value==expense_source.value){
      let barnew= bar.querySelector(".bar-color");
        barnew.style.width = `${length}%`;
        console.log(length)
        console.log("if working")
    }
    else{
      alert("budget limit exceeded")
    }
  })
} 

//selecting the latest element of expense history (by adding the class number  to it and increasing that number by 1 each time)



