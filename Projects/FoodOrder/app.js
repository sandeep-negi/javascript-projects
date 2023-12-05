const addItems = document.querySelectorAll('.add-item');
const addRemoveItems = document.querySelectorAll('.item-counter');
const overlay = document.querySelector(".overlay");
const totalAmount = document.querySelector(".total-order-amount");

const orderList = [];
let allOrderItems = [];
let totalOrderCount;
let billAmount;

addItems.forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.classList.add('btn-mouseHover');
  });
});

addItems.forEach((item) => {
  item.addEventListener('mouseout', () => {
    item.classList.remove('btn-mouseHover');
    item.classList.add('add-item');
  });
});

addItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    item.classList.add('d-none');
    const nextSibElement = item.nextElementSibling;
    nextSibElement.classList.remove('d-none');
    addOrRemoveItem(nextSibElement);
  });
});

function addOrRemoveItem(nextSibElement) {

  const itemName = nextSibElement.dataset.name;
  const itemPrice = nextSibElement.dataset.price;
  const removeOrder = nextSibElement.querySelector('.minus');
  const addOrder = nextSibElement.querySelector('.add');
  const orderCountNumber = nextSibElement.querySelector('.itemCount');

  // Order Summary Info Display
  const addedOrderInfo = document.querySelector('.added-order-container');
  const addedOrderItemCount = document.querySelector('.added-items');
  const addedItemTotalPrice = document.querySelector('.added-items-price');


  let currentItemCount = parseInt(orderCountNumber.innerText);

  const orderInfo = {
    "name": itemName,
    "price": parseInt(itemPrice),
    "count": currentItemCount,
  }

  removeOrder.addEventListener('click', (e) => {
    console.log("=========== Remove Section ===========")

    if (currentItemCount === 1) {
      currentItemCount -= 1;
      nextSibElement.classList.add('d-none');
      nextSibElement.previousElementSibling.classList.remove('d-none');
      console.log(itemName, itemPrice, currentItemCount);

      if (totalOrderCount.length === 0) {
        addedOrderInfo.classList.add('d-none');
      }

    }
    else if (currentItemCount > 1) {
      currentItemCount -= 1;
      orderCountNumber.innerText = currentItemCount;
      console.log("Minus > 1 => current value = ", parseInt(orderCountNumber.innerText));
      console.log(itemName, itemPrice, currentItemCount);
    }
    orderInfo.count = currentItemCount;
    orderList.push(orderInfo);

    allOrderItems = updateOrderList(orderList, orderInfo);
    console.log("Total Order Summary =", allOrderItems);

    totalOrderCount = getTotalAddedOrdersCount(allOrderItems);
    addedOrderItemCount.innerText = totalOrderCount + " Item(s)";
    billAmount = getTotalBillAmount(allOrderItems);
    addedItemTotalPrice.innerText = "₹" + billAmount;

    e.stopImmediatePropagation();

  });

  addOrder.addEventListener('click', (e) => {
    addedOrderInfo.classList.remove('d-none');

    currentItemCount += 1;
    orderCountNumber.innerText = currentItemCount;
    orderInfo.count = currentItemCount;

    orderList.push(orderInfo);

    allOrderItems = updateOrderList(orderList, orderInfo);
    console.log("Total Order Summary =", allOrderItems);

    totalOrderCount = getTotalAddedOrdersCount(allOrderItems);
    addedOrderItemCount.innerText = totalOrderCount + " Item(s)";
    billAmount = getTotalBillAmount(allOrderItems);
    addedItemTotalPrice.innerText = "₹" + billAmount;


    e.stopImmediatePropagation();
  });

  function updateOrderList(orders, info) {
    console.log(" <= ors => ", orders);
    console.log("<= inf => ", info);

    const pr = Array.from(new Set(orders));
    console.log("all unique value = ", pr);
    return pr;
  }

  function getTotalBillAmount(allOrderItems) {
    const orderItemsPrice = allOrderItems.reduce((sum, items) => {
      return (sum + items.price * items.count);
    }, 0);

    console.log("Total Amount = ", orderItemsPrice);
    return orderItemsPrice;
  };
}

function getTotalAddedOrdersCount(allOrderItems) {
  const totalOrders = allOrderItems.filter((item) => {
    return item.count != 0;
  });
  console.log("total Count = ", totalOrders);
  return totalOrders.length;
}

const cart = document.querySelector('#cart-icon');
const billInfoSummary = document.querySelector('.bill-info');

cart.addEventListener('click', (e) => {

  console.log('Clicked cart');
  console.log('Cart Items', allOrderItems);
  console.log('Total Price', billAmount);
  console.log('Item count', totalOrderCount);

  const openModal = document.querySelector('.view-bill');
  const orderInfo = document.querySelector('.added-order-container');
  openModal.classList.remove('d-none');
  overlay.classList.remove("d-none");

  allOrderItems.forEach((item) => {
    let mainDiv = document.createElement('div');
    let itemName = document.createElement('h1');
    let itemPrice = document.createElement('h1');
    let itemCount = document.createElement('h1');
    let itemTotalPrice = document.createElement('h1');

    if (item.count != 0) {
      billInfoSummary.appendChild(mainDiv);
      mainDiv.appendChild(itemName);
      mainDiv.appendChild(itemPrice);
      mainDiv.appendChild(itemCount);
      mainDiv.appendChild(itemTotalPrice);
      mainDiv.classList.add('current-item-row');

      itemName.innerText = item.name;
      itemPrice.innerText = item.price;
      itemCount.innerText = item.count;
      itemTotalPrice.innerText = (item.price * item.count)
    }

    totalAmount.innerText = "₹" + billAmount;
  });
  orderInfo.classList.add('d-none');
});

const openModal = document.querySelector('.view-bill');
const closeModal = document.querySelector('#close-modal');
const orderInfo = document.querySelector('.added-order-container');

closeModal.addEventListener('click', () => {
  openModal.classList.add('d-none');
  orderInfo.classList.remove('d-none');
  overlay.classList.add("d-none");

  const existingItems = document.querySelector('.bill-info');
  while (existingItems.hasChildNodes()) {
    console.log("Child First", existingItems.firstChild)
    existingItems.removeChild(existingItems.firstChild);
  }

});
