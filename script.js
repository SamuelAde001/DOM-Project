// Begining of all major varables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cashOutBtn = document.querySelector("#cashoutbtn");
let totalPayout = document.querySelector(".initialtotalprice");
let decreaseBtn = document.querySelectorAll(".decreasebtn");
let increaseBtn = document.querySelectorAll(".increasebtn");
let itemAmount = document.querySelectorAll(".itemamount");
let likeBtn = document.querySelectorAll(".likeitem");
let deleteItem = document.querySelectorAll(".deleteitem");
let items = document.querySelectorAll(".items");

// Begining of all major functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// increase function
function increaseItems(button) {
  // Find the parent div of the clicked button
  const itemParentDiv = button.parentElement.parentElement.parentElement;

  // Find the "itemamount" span element within the same parent div
  const currentItemAmountSpan = itemParentDiv.querySelector(".itemamount");

  // Increment the item amount
  let currentItemAmount = parseInt(currentItemAmountSpan.textContent, 10);
  currentItemAmount++;

  // Update the item amount text
  currentItemAmountSpan.textContent = currentItemAmount;

  // Find the "initial-price" element within the same parent
  const initialPriceElement = itemParentDiv.querySelector(".initialprice");

  // turning the intial price that was a string in the HTML element to an integer so i could calculate it as a number
  const presentPrice = parseInt(
    initialPriceElement.textContent.replace(/[^\d.]/g, "") //replace method helps me remove the "," comma in the initial html
  );
  let fixedPrice;
  if (currentItemAmount > 1) {
    currentItemAmount--;
    // find the actual price of one single item
    fixedPrice = presentPrice / currentItemAmount;
  }
  // substract the price of one from the present price
  const updatedPrice = presentPrice + fixedPrice;
  initialPriceElement.textContent = formatprice(updatedPrice);

  // // Helper function to format the price with commas at the right place
  function formatprice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // update total price
  updateCashoutPrice();
}

// Decrease function
function decreaseItems(button) {
  // Find the parent div of the clicked button
  const itemParentDiv = button.parentElement.parentElement.parentElement;

  // Find the "itemamount" span element within the same parent div
  const currentItemAmountSpan = itemParentDiv.querySelector(".itemamount");

  // decrease the item amount
  let currentItemAmount = parseInt(currentItemAmountSpan.textContent, 10);

  currentItemAmount--;
  console.log(currentItemAmount);
  // Update the item amount text
  currentItemAmountSpan.textContent = currentItemAmount;

  // Find the "initial-price" element within the same parent
  const initialPriceElement = itemParentDiv.querySelector(".initialprice");
  // turning the intial price that was a string in the HTML element to an integer so i could calculate it as a number
  const presentPrice = parseInt(
    initialPriceElement.textContent.replace(/[^\d.]/g, "") //replace method helps me remove the "," comma in the initial html
  );

  // find the actual price of one single item
  let fixedPrice;
  let updatedPrice;
  if (currentItemAmount > 0) {
    currentItemAmount++;
    fixedPrice = presentPrice / currentItemAmount;
    console.log(fixedPrice);
    // substract the price of one from the present price
    updatedPrice = presentPrice - fixedPrice;
    initialPriceElement.textContent = formatprice(updatedPrice);
  } else {
    currentItemAmount = 1;
    currentItemAmountSpan.textContent = currentItemAmount;
    updatedPrice = presentPrice;
  }

  // update total price
  updateCashoutPrice();
}

// delete funtion
function deleteFunction(button) {
  // Find the parent div of the clicked button
  const itemParentDiv = button.parentElement.parentElement;

  // prompt the user if he actually wants to delete the item from cart
  let prompt = window.confirm(
    "do you really want to delete this item from your cart?"
  );
  if (prompt) {
    itemParentDiv.style.display = "none";
  }

  // update the total amount according to the deletion

  // Find the "initial-price" element within the same parent
  const initialPriceElement = itemParentDiv.querySelector(".initialprice");
  // turning the intial price that was a string in the HTML element to an integer so i could calculate it as a number
  const presentPrice = parseInt(
    initialPriceElement.textContent.replace(/[^\d.]/g, "")
  );

  // find the present total sum on the cashout
  const presenttotalprice = parseInt(
    totalPayout.textContent.replace(/[^\d.]/g, "")
  );

  // subtract the items presentPrice  from the present total price
  totalPayout.textContent = formatprice(presenttotalprice - presentPrice);
}

// function to calculate the total pricese of all the elements and display
function updateCashoutPrice() {
  let itempresentprice;
  let currentTotalAmount = 0;
  items.forEach((box) => {
    itempresentprice = parseInt(
      box.querySelector(".initialprice").textContent.replace(/[^\d.]/g, "")
    );
    currentTotalAmount += itempresentprice;
  });

  totalPayout.textContent = formatprice(currentTotalAmount);
}

// // Helper function to format the price with commas at the right place
function formatprice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Begining of add event listeners for buttons
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// increase item amount, item total price and the total overall price when the user clicks the plus btn
increaseBtn.forEach((item) => {
  item.addEventListener("click", () => {
    increaseItems(item);
  });
});

// Decrease item amount, item total price and the total overall price when the user clicks the minus btn
decreaseBtn.forEach((item) => {
  item.addEventListener("click", () => {
    decreaseItems(item);
  });
});

// change color of like button to red when user likes the item
likeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.innerHTML == `<i class="fa-regular fa-heart"></i>`) {
      item.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`;
    } else {
      item.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }
  });
});

// delete the item from cart
deleteItem.forEach((item) => {
  item.addEventListener("click", () => {
    deleteFunction(item);
  });
});
