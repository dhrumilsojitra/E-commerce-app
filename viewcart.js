// view cart  data in table.
let viewcart = () => {
  let maintotal = 0;
  let tt = "";
  let cartdata = JSON.parse(localStorage.getItem("Carts"));
  let tr = "";
  cartdata.map((i, index) => {
    tr += ` <tr>
  <td class="border-[1px] border-gray-400  py-2 flex justify-center">
    <img src="${i.img}" alt=""  height="90px" width="90px"/>
  </td>
  <td class="px-6 py-4 border-[1px] border-gray-400">
    ${i.name}
  </td>
  <td class="px-6 py-4 border-[1px] border-gray-400">$${i.price}</td>
  <td class="px-6 py-4 border-[1px] border-gray-400">${i.qty}</td>
  <td class="px-6 py-4 border-[1px] border-gray-400">${i.total}</td>
  <td class="px-1 py-4 border-[1px] border-gray-400 text-center"><button class="py-1" onclick="deleteItem(${index})"><i class="fa-solid fa-trash text-lg text-red-600"></i></button></td>

  </tr>`;
    maintotal += i.total;
  });
  document.getElementById("data").innerHTML = tr;

  tt += `<p>$${maintotal}</p>`;

  document.getElementById("ttl_val").innerHTML = tt;
};
let deleteItem = (i) => {
  let cartdata = JSON.parse(localStorage.getItem("Carts"));
  cartdata.splice(i, 1);
  localStorage.setItem("Carts", JSON.stringify(cartdata));
  alert(`Deleted Successfully!`);

  viewcart();
};
viewcart();
