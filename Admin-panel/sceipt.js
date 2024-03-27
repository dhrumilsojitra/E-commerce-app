let items = [];

let addCat = () => {
  let val = document.getElementById("name").value.trim();
  let alldata = JSON.parse(localStorage.getItem("catName")) || [];
  let existingCat = alldata.find((i) => {
    return i.name.toLowerCase() === val.toLowerCase();
  });
  let len;
  document.getElementById("alert").innerHTML = " ";
  if (val == "") {
    document.getElementById("alert").innerHTML = "*Please enter Category name.";
  } else if (existingCat) {
    document.getElementById("alert").innerHTML =
      "*This Category already taken.";

    document.getElementById("name").value = "";
  } else {
    if (alldata != null) {
      len = alldata.length;
    } else {
      len = 0;
    }
    let itemobj = {
      id: len + 1,
      name: val,
    };
    items.push(itemobj);
    localStorage.setItem("catName", JSON.stringify(items));
    document.getElementById("name").value = "";
    disData();
  }
};

let disData = () => {
  let tr = "";
  let alldata = JSON.parse(localStorage.getItem("catName"));
  alldata.map((i) => {
    tr += `
    <tr class="border-b" >
    <td class="py-2">${i.id}</td>
        <td class="py-2">${i.name}</td>
        <td class="py-2">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Edit
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Delete
          </button>
        </td>
        </tr>`;
  });
  document.getElementById("disData").innerHTML = tr;
};

disData();
let resetCat = () => {
  localStorage.clear();
};
