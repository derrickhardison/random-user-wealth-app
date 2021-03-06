const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
getRandomUser();
getRandomUser();
getRandomUser();

// async await fetch API call
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  // console.log(res);
  // console.log(data);
  const user = data.results[0];
  // console.log(user);

  const newUser = {
    name: `${user.name.first}, ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  console.log(newUser);

  addData(newUser);
}

// double money
function doubleMoney() {
  data = data.map(function (user) {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users in descending order based on amount of wealth
function sortByRichest() {
  data.sort(function (a, b) {
    return b.money - a.money;
  });
  updateDOM();
}

function showMillionaires() {
  data = data.filter(function (user) {
    return user.money > 1000000;
  });

  updateDOM();
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

console.log(data);

// update DOM

function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(function (item) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners

addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleMoney);

sortBtn.addEventListener("click", sortByRichest);

showMillionairesBtn.addEventListener("click", showMillionaires);
