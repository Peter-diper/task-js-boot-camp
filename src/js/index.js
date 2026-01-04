async function data() {
  const url = "db.json";
  const table = document.querySelector("#table");

  const response = await fetch(url);
  const result = (await response.json()).transactions;

  console.log(result);
  const id = finder(result, "id");
  const type = finder(result, "type");
  const price = finder(result, "price");
  const refId = finder(result, "refId");
  const date = finder(result, "date");

  let tableInfo = `<tr class="">
            <th>ردیف</th>
            <th>نوع تراکنش</th>
            <th>مبلغ</th>
            <th>شماره پیگیری</th>
            <th>تاریخ تراکنش</th>
          </tr>`;
  result.forEach((value, i) => {
    tableInfo += `<tr>
            <td>${id[i]}</td>
            <td id="type">${type[i]}</td>
            <td>${price[i]}</td>
            <td>${refId[i]}</td>
            <td>${date[i]}</td>
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
}

function finder(data, type) {
  return data.map((content) => content[type]);
}

data();
