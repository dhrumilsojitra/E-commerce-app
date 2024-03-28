let items = [];
// add item code
let addCat = () => {
  let val = document.getElementById("name").value.trim();
  let alldata = JSON.parse(localStorage.getItem("catName")) || [];
  let catid = document.getElementById("hide").value;
  let existingCat = alldata.find((i) => {
    return i.name.toLowerCase() === val.toLowerCase();
  });
  if (catid != "") {
    alldata.map((i) => {
      if (i.id == catid) {
        i.name = val;
      }
    });
    localStorage.setItem("catName", JSON.stringify(alldata));
    disData();
    document.getElementById("name").value = "";
    document.getElementById("hide").value = "";
    document.getElementById("btnSave").innerHTML = "Save";

    console.log(catid);
  } else {
    document.getElementById("alert").innerHTML = " ";
    if (val == "") {
      document.getElementById("alert").innerHTML =
        "*Please enter Category name.";
    } else if (existingCat) {
      document.getElementById("alert").innerHTML =
        "*This Category already taken.";

      document.getElementById("name").value = "";
    } else {
      let itemobj = {};
      if (alldata != null) {
        itemobj = {
          id: alldata.length + 1,
          name: val,
        };
        items = alldata;
      } else {
        itemobj = {
          id: 1,
          name: val,
        };
      }
      items.push(itemobj);
      localStorage.setItem("catName", JSON.stringify(items));
      document.getElementById("name").value = "";
      disData();
    }
    disData();
  }
};
// display data code
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
            onclick="editCat(${i.id})">
            Edit
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onclick="deleCat(${i.id})">
            Delete
          </button>
        </td>
        </tr>`;
  });
  document.getElementById("disData").innerHTML = tr;
};
// delete data code
let deleCat = (id) => {
  let alldata = JSON.parse(localStorage.getItem("catName"));
  alldata.splice(id - 1, 1);
  let j = 1;
  alldata.map((i) => {
    i.id = j++;
  });
  localStorage.setItem("catName", JSON.stringify(alldata));
  disData();
};
// edit data code
let editCat = (id) => {
  let alldata = JSON.parse(localStorage.getItem("catName"));
  let cat = alldata.filter((i) => {
    return i.id == id;
  });
  document.getElementById("name").value = cat[0].name;
  document.getElementById("hide").value = cat[0].id;
  id = document.getElementById("hide").value;
  document.getElementById("btnSave").innerHTML = id != "" ? "Update" : "Save";
  disData();
};

disData();
