// inputs
const searchInput = document.querySelector("#search");
const btnStart = document.querySelector("#btn-calc");
const searchSection = document.querySelector(".search-wrapper");
const mainSection = document.querySelector(".content--section");
const overlay = document.querySelector(".overlay");

btnStart.addEventListener("click", startCalc);

// events
document.addEventListener("DOMContentLoaded", () => {
  data();
});
searchInput.addEventListener("input", search);

// funcotions
function data() {
  const url =
    "https://task-js-boot-camp-git-main-rasoolfadas-projects.vercel.app/api/transactions";
  render(url);
}

function finder(data, type) {
  return data.map((content) => content[type]);
}

function search(e) {
  const url = `https://task-js-boot-camp-git-main-rasoolfadas-projects.vercel.app/api/transactions?refId_like=${e.target.value}`;
  render(url);
}

async function render(url) {
  const table = document.querySelector("#table");

  const response = await fetch(url);
  const result = await response.json();

  const id = finder(result, "id");
  const type = finder(result, "type");
  const price = finder(result, "price");
  const refId = finder(result, "refId");
  const date = finder(result, "date");

  const locaDate = date.map((value) =>
    new Date(value).toLocaleDateString("fa-ir")
  );

  let tableInfo = "";
  result.forEach((value, i) => {
    tableInfo += `<tr>
            <td>${id[i]}</td>
            <td id="type">${type[i]}</td>
            <td>${price[i]}</td>
            <td id="redId">${refId[i]}</td>
            <td>${locaDate[i]}</td>
          </tr>`;
  });
  table.innerHTML = tableInfo;

  // changing type color by dinamic
  const transactionsType = document.querySelectorAll("#type");

  transactionsType.forEach((node) => {
    node.textContent === "افزایش اعتبار"
      ? node.classList.add("resive")
      : node.classList.add("take");
  });

  const orderPriceBtn = document.querySelector("#priceBtn");
  orderPriceBtn.addEventListener("click", orderPrice);
  const datePriceBtn = document.querySelector(".date");
  datePriceBtn.addEventListener("click", orderDate);
}

function orderPrice() {
  const orderPriceBtn = document.querySelector("#priceBtn");
  const tDetail = document.querySelectorAll("td");
  const arrow = document.querySelector("#price-arrow");

  if (!arrow.classList.contains("arrow--active")) {
    arrow.classList.add("arrow--active");
    setTimeout(() => {
      const url =
        "https://task-js-boot-camp-git-main-rasoolfadas-projects.vercel.app/api/transactions?_sort=price&_order";
      render(url);
      arrow.classList.add("arrow--active");
    }, 200);
    tDetail.forEach((node) => {
      node.classList.add("opacity--animatin");
    });

    console.log(orderPriceBtn.ariaSelected);
    return;
  }
  console.log("true");
  setTimeout(() => {
    const url =
      "https://task-js-boot-camp-git-main-rasoolfadas-projects.vercel.app/api/transactions?_sort=price&_order=desc";
    render(url);
  }, 200);
  arrow.classList.remove("arrow--active");

  tDetail.forEach((node) => {
    node.classList.add("opacity--animatin");
  });
}

function orderDate() {
  const orderPriceBtn = document.querySelector("#priceBtn");
  const tDetail = document.querySelectorAll("td");
  const arrow = document.querySelector("#date-arrow");

  if (!arrow.classList.contains("arrow--active")) {
    arrow.classList.add("arrow--active");
    setTimeout(() => {
      const url =
        "https://task-js-boot-camp-git-main-rasoolfadas-projects.vercel.app/api/transactions?_sort=date&_order";
      render(url);
      arrow.classList.add("arrow--active");
    }, 200);
    tDetail.forEach((node) => {
      node.classList.add("opacity--animatin");
    });

    console.log(orderPriceBtn.ariaSelected);
    return;
  }
  console.log("true");
  setTimeout(() => {
    const url =
      "https://task-js-boot-camp-git-main-rasoolfadas-projects.vercel.app/api/transactions?_sort=date&_order=desc";
    render(url);
  }, 200);
  arrow.classList.remove("arrow--active");

  tDetail.forEach((node) => {
    node.classList.add("opacity--animatin");
  });
}

function startCalc(e) {
  e.target.classList.add("hidden");
  overlay.classList.remove("hidden");

  setTimeout(() => {
    searchSection.classList.remove("hidden");
    mainSection.classList.remove("hidden");
    overlay.classList.add("hidden");
  }, 2000);
}
