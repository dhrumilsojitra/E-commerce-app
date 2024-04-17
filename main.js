let catName = JSON.parse(localStorage.getItem("catName"));
let product = JSON.parse(localStorage.getItem("prodInfo"));
let cart = JSON.parse(localStorage.getItem("Carts"));

let trm = ` <option value="" class="hover:text-blue-700">
<a href="#">All</a>
</option>`;

let trl = ` <li
class="active hover:bg-blue-700 hover:text-white rounded px-4 hover:cursor-pointer"
data-filter="*"
>
All
</li>`;
catName.map((i) => {
  trm += `
    <option value=""><a href="#" >${i.name}</a></option>`;
  trl += ` <li
  class="hover:bg-blue-700 hover:text-white rounded px-4 hover:cursor-pointer"
  data-filter=".${i.name}"
>
  ${i.name}
</li>`;
});
document.getElementById("catmenuM").innerHTML = trm;
document.getElementById("catmenuL").innerHTML = trl;

// Products display

let th = "";
catName.map((j) => {
  product.filter((i) => {
    if (j.id == i.catid) {
      let productId = i.id;
      // let qty = cart.filter((obj) => obj.id == productId).map((obj) => obj.qty);
      // qty = Number(qty) > 0 ? qty : 0;
      th += ` <div class="h-[400px] ${j.name} products">
    <div class="h-1/2 flex items-center content-center justify-center">
      <img
        src="${i.image}"
        alt=""
        srcset=""
        class="h-full p-2"
      />
    </div>
    <div
      class="h-1/2 flex flex-col items-center content-center justify-center gap-2"
    >
      <p class="text-gray-700 text-xl font-semibold">${i.name}</p>
    
      <p class="text-gray-500 text-xs">
        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
        ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
        ><i class="fa-solid fa-star"></i>
      </p>
      <p class="text-blue-700 text-lg font-bold">${i.price}</p>
      <div
        class="flex border-[1px] rounded-md items-center content-center"
      >
        <button
          class="py-1 px-3 border-gray-500 text-black hover:bg-blue-500 hover:border-blue-500 hover:text-white incrementBtn"
         data-product-id="${productId}">
          +
        </button>
        <p class="px-4" id="counter_${productId}">1</p>
        <button
          class="py-1 px-3 border-gray-500 text-black hover:bg-blue-500 hover:border-blue-500 hover:text-white decrementBtn"
          data-product-id="${productId}">
          -
        </button>
      </div>
      <div>
        <button
          class="w-full py-1 px-5 rounded-full border-[1px] border-gray-500 text-black hover:bg-blue-500 hover:border-blue-500 hover:text-white" onclick="addtocart(${i.id})"
        >
          Add To Cart
        </button>
      </div>
    </div>
    </div>`;
    }
  });
});

document.getElementById("pd").innerHTML = th;

// add to cart function
let carts = [];
let addtocart = (id) => {
  let cartdata = JSON.parse(localStorage.getItem("Carts"));
  let qty = document.getElementById(`counter_${id}`).innerText;
  let obj = {};
  let img = "";
  let name = "";
  let price = 0;
  // let qty = 1;

  parseInt(qty);
  parseInt(price);

  let product = JSON.parse(localStorage.getItem("prodInfo"));
  product.filter((i) => {
    if (i.id == id) {
      img = i.image;
      name = i.name;
      price = i.price;
    }
  });
  if (cartdata != null) {
    // cartdata not null means have alreaddy one product.
    let ans = cartdata.filter((i) => {
      return i.id == id;
    });
    console.log(ans);
    if (ans.length > 0) {
      cartdata.map((i) => {
        if (i.id == id) {
          (i.qty = parseInt(qty)), (i.total = i.qty * price);
        }
      });
    } else {
      // this part for add new  item into the array list.
      obj = {
        category: cartdata.length + 1,
        id: id,
        img: img,
        name: name,
        price: parseInt(price),
        qty: parseInt(qty),
        total: parseInt(price) * parseInt(qty),
      };
      cartdata.push(obj);
    }
    localStorage.setItem("Carts", JSON.stringify(cartdata));
    alert(` ${name} - ${qty} Quantity Added Successfully!`);
  } else {
    obj = {
      category: 1,
      id: id,
      img: img,
      name: name,
      price: parseInt(price),
      qty: parseInt(qty),
      total: parseInt(price) * parseInt(qty),
    };
    carts.push(obj);
    localStorage.setItem("Carts", JSON.stringify(carts));
    alert(`${name} Added Successfully!`);
  }
};
// ==============================================

// Add event listeners dynamically for increment and decrement buttons
document.querySelectorAll(".incrementBtn").forEach((item) => {
  item.addEventListener("click", () => {
    let productId = item.dataset.productId;
    let counter = document.getElementById(`counter_${productId}`);
    let count = parseInt(counter.textContent);
    count++;
    counter.textContent = count;
  });
});

document.querySelectorAll(".decrementBtn").forEach((item) => {
  item.addEventListener("click", () => {
    let productId = item.dataset.productId;
    let counter = document.getElementById(`counter_${productId}`);
    let count = parseInt(counter.textContent);
    if (count > 1) {
      count--;
      counter.textContent = count;
    }
  });
});

//=============================
// Set initial counter value
// let count = 1;

// Add event listeners to increment and decrement buttons
// function incrementQty(id) {
//   // count++;
//   counter = document.getElementById(`counter-${id}`);
//   counter.innerText = Number(counter.innerText) + 1;
// }

// function decremenQty(id) {
//   counter = document.getElementById(`counter-${id}`);
//   if (counter.innerText > 1) {
//     counter.innerText = Number(counter.innerText) - 1;
//   }
// }
// projects filters isotop

$(document).ready(function ($) {
  $(".product-filters li").on("click", function () {
    $(".product-filters li").removeClass("active");
    $(this).addClass("active");

    var selector = $(this).attr("data-filter");

    $(".product-lists").isotope({
      filter: selector,
    });
  });
  $(".product-lists").isotope();
});
