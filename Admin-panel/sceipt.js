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
// ----------------------------------------------- Working for products -----------------------------------------------------

// catagory showing in products page and gives a value

let alldata = JSON.parse(localStorage.getItem("catName"));
let tr = "<option>--Select Category--</option>";
alldata.map((i) => {
  tr += `<option value="${i.id}">${i.name}</option>`;
});
document.getElementById("catid").innerHTML = tr;

// preview image on load event

function previewImage(event) {
  var input = event.target;
  var image = document.getElementById("image");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
      localStorage.setItem("productImage", JSON.stringify(e.target.result));
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// create a blank array for products

let prData = [];
let addProduct = () => {
  let pid = document.getElementById("pid").value;
  let catid = document.prfrm.catid.value;
  let name = document.prfrm.prname.value;
  let price = document.prfrm.prprice.value;
  let desc = document.prfrm.prdesc.value;
  let image = JSON.parse(localStorage.getItem("productImage"));
  let allPrData = JSON.parse(localStorage.getItem("prodInfo"));

  if (pid != "") {
    // update code
    allPrData.map((i) => {
      if (i.id == pid) {
        i.name = name;
        i.catid = catid;
        i.price = price;
        i.desc = desc;
        i.image = image != null ? image : i.image;
      }
    });
    localStorage.setItem("prodInfo", JSON.stringify(allPrData));
  } else {
    //insert
    if (allPrData != null) {
      obj = {
        id: allPrData.length + 1,
        catid: catid,
        name: name,
        price: price,
        desc: desc,
        image: image,
      };
      prData = allPrData;
    } else {
      obj = {
        id: 1,
        catid: catid,
        name: name,
        price: price,
        desc: desc,
        image: image,
      };
    }

    prData.push(obj);
    localStorage.setItem("prodInfo", JSON.stringify(prData));
  }
  localStorage.removeItem("productImage");
  document.prfrm.reset();
  document.prfrm.pid.value = "";
  document.getElementById("image").src = "";

  disProduct();
};

// display products

let disProduct = () => {
  let allPrData = JSON.parse(localStorage.getItem("prodInfo"));
  let allCatData = JSON.parse(localStorage.getItem("catName"));
  let tr = "";
  allPrData.map((i) => {
    // for connect product and category
    allCatData.filter((j) => {
      if (j.id == i.catid) {
        i.catname = j.name;
      }
    });
    tr += `
    <tr class="border-b" >
    <td class="py-2">${i.catname}</td>
    <td class="py-2">${i.name}</td>
    <td class="py-2">${i.price}</td>
    <td class="py-2">${i.desc}</td>
    <td class="py-2"><img src="${i.image}" height="90px" width="90px"></td>
    <td class="py-2">
      <button
        class="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onclick="editProduct(${i.id})"
      >
      <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button
        class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        onclick="delProduct(${i.id})"
      >
      <i class="fa-solid fa-trash"></i>
      </button>
    </td>
    </tr>`;
  });
  document.getElementById("prData").innerHTML = tr;
};

disProduct();

delete products;

let delProduct = (id) => {
  console.log(id);
  let allPrData = JSON.parse(localStorage.getItem("prodInfo"));
  allPrData.splice(id - 1, 1);
  let j = 1;
  allPrData.map((i) => {
    i.id = j++;
  });
  localStorage.setItem("prodInfo", JSON.stringify(allPrData));
  disProduct();
};

// edit data code

let editProduct = (id) => {
  let alldata = JSON.parse(localStorage.getItem("prodInfo"));
  let pr = alldata.filter((i) => {
    return i.id == id;
  });
  document.getElementById("prname").value = pr[0].name;
  document.getElementById("prprice").value = pr[0].price;
  document.getElementById("catid").value = pr[0].catid;
  document.getElementById("prdesc").value = pr[0].desc;
  document.getElementById("pid").value = id;
  document.getElementById("image").src = pr[0].image;
  disProduct();
};

// -------------------------------------- testing new product page -----------------------------------
// category get.
