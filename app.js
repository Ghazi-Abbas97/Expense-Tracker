function ExpenseHandler() {
  let productPrice = document.getElementById("product-price-inp");
  let productName = document.getElementById("product-name-inp");
  let items = document.querySelector(".items");
  let deleteAllItems = document.querySelector(".delete-items");

  // Initialize arrays to manage items and their prices
  let arr = JSON.parse(localStorage.getItem("data")) || [];
  let arr2 = [];

  // Function to update the display of items and total price
  function updateDisplay() {
    items.innerHTML = '';
    arr2 = [];
    arr.forEach((e, i) => {
      items.innerHTML += `<div class="item" item-index="${i}"><p class="product-text">${e.productName}: $${e.productPrice}</p><button class="delete-item">Delete Item</button></div>`;
      arr2.push(e.productPrice);
    });

    let totalSum = arr2.reduce((sum, price) => {
      let num = Number(price);
      if (isNaN(num)) {
        console.error(`Value "${price}" is not a number.`);
        return sum;
      }
      return sum + num;
    }, 0);
    document.querySelector(".total-price").innerHTML = `Total Price: $${totalSum}`;

    // Attach event listeners to delete buttons after updating the DOM
    document.querySelectorAll(".delete-item").forEach((x, i) => {
      x.addEventListener("click", function (e) {
        if (e.target.closest("div").classList.contains("item")) {
          e.target.closest("div").remove(); // Properly remove the item from DOM
        }
        arr.splice(i, 1);
        localStorage.setItem("data", JSON.stringify(arr));
        updateDisplay(); // Refresh the display after deleting an item
      });
    });
  }

  // Initial call to display items on page load
  updateDisplay();

  // Event listener for adding a new item
  document.querySelector(".add-item").addEventListener("click", function () {
    productName.style.borderColor = "black";
    productPrice.style.borderColor = "black";
    if (productName.value.length > 0 && productPrice.value.length > 0) {
      arr.push({
        productName: productName.value,
        productPrice: productPrice.value,
      });
      localStorage.setItem("data", JSON.stringify(arr));
      productName.value = "";
      productPrice.value = "";
      updateDisplay(); // Refresh the display after adding a new item
    } else {
      productName.style.borderColor = "red";
      productPrice.style.borderColor = "red";
      alert("Please fill in the required fields");
    }
  });

  // Event listener for deleting all items
  deleteAllItems.addEventListener("click", () => {
    arr = [];
    localStorage.setItem("data", JSON.stringify(arr));
    updateDisplay(); // Refresh the display after deleting all items
  });
}

// Initialize the expense handler
ExpenseHandler();
