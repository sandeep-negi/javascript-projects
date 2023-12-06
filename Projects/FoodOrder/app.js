const addItems = document.querySelectorAll('.add-item');
const addRemoveItems = document.querySelectorAll('.item-counter');
const overlay = document.querySelector(".overlay");
const totalAmount = document.querySelector(".total-order-amount");

// Order Summary Section
const addedOrderInfo = document.querySelector('.added-order-container');
const addedOrderItemCount = document.querySelector('.added-items');
const addedItemTotalPrice = document.querySelector('.added-items-price');


const orderList = [];
let currentUpdatedOrders = [];
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

    const itemName = nextSibElement.dataset.name;
    const itemPrice = nextSibElement.dataset.price;
    const orderCountNumber = nextSibElement.querySelector('.itemCount');

    let currentItemCount;

    nextSibElement.classList.remove('d-none');


    const orderInfo = {
      "name": itemName,
      "price": parseInt(itemPrice),
      "count": 1,
    }

    orderList.push(orderInfo);
    addedOrderInfo.classList.remove('d-none');

    totalOrderCount = getTotalAddedOrdersCount(orderList);
    addedOrderItemCount.innerText = totalOrderCount + " Item(s)";
    billAmount = getTotalBillAmount(orderList);
    addedItemTotalPrice.innerText = "₹" + billAmount;

    currentUpdatedOrders = updatedOrderList(orderList);

    nextSibElement.addEventListener('click', (e) => {

      if (e.target.className === 'minus') {

        currentItemCount = parseInt(orderCountNumber.innerText);

        if (currentItemCount === 1) {
          currentItemCount -= 1;
          nextSibElement.classList.add('d-none');
          nextSibElement.previousElementSibling.classList.remove('d-none');

          orderInfo.count = currentItemCount;

          currentUpdatedOrders = updatedOrderList(orderList);

          if (currentUpdatedOrders.length === 0) {
            addedOrderInfo.classList.add('d-none');
          }
        }
        else if (currentItemCount > 1) {
          currentItemCount -= 1;
          orderCountNumber.innerText = currentItemCount;

          let orderStatus = isOrderAlreadyExists(orderInfo);

          if (orderStatus.length != 0) {
            orderInfo.count = currentItemCount;
          }
          currentUpdatedOrders = updatedOrderList(orderList);
        }

        totalOrderCount = getTotalAddedOrdersCount(orderList);
        addedOrderItemCount.innerText = totalOrderCount + " Item(s)";
        billAmount = getTotalBillAmount(orderList);
        addedItemTotalPrice.innerText = "₹" + billAmount;

        e.stopImmediatePropagation();
      }
      else if (e.target.className === 'add') {

        currentItemCount = parseInt(orderCountNumber.innerText);
        currentItemCount += 1;
        orderCountNumber.innerText = currentItemCount;

        let orderStatus = isOrderAlreadyExists(orderInfo);

        if (orderStatus.length != 0) {
          orderInfo.count = currentItemCount;
        } else {
          orderList.push(orderInfo);
        }

        currentUpdatedOrders = updatedOrderList(orderList);

        totalOrderCount = getTotalAddedOrdersCount(orderList);
        addedOrderItemCount.innerText = totalOrderCount + " Item(s)";
        billAmount = getTotalBillAmount(orderList);
        addedItemTotalPrice.innerText = "₹" + billAmount;

        e.stopImmediatePropagation();
      }
    })
  });
});

const cart = document.querySelector('#cart-icon');
const billInfoSummary = document.querySelector('.bill-info');

cart.addEventListener('click', (e) => {

  const openModal = document.querySelector('.view-bill');
  const orderInfo = document.querySelector('.added-order-container');
  openModal.classList.remove('d-none');
  overlay.classList.remove("d-none");

  currentUpdatedOrders.forEach((item) => {
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
    existingItems.removeChild(existingItems.firstChild);
  }
});

// Returns Whether order already exists or not
function isOrderAlreadyExists(orderInfo) {
  let orderItemsInList = orderList.filter((item) => {
    return item.name === orderInfo.name;
  });
  return orderItemsInList;

}
function updatedOrderList(orderList) {
  const arry = orderList.filter((order) => {
    return order.count != 0;
  });
  return arry;
}

function getTotalBillAmount(allOrderItems) {
  const orderItemsPrice = allOrderItems.reduce((sum, items) => {
    return (sum + items.price * items.count);
  }, 0);
  return orderItemsPrice;
};


function getTotalAddedOrdersCount(allOrderItems) {
  const totalOrders = allOrderItems.filter((item) => {
    return item.count != 0;
  });
  return totalOrders.length;
}

