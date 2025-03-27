import menuArray from '/data.js'
const userCart = []



// name: "Pizza",
// ingredients: ["pepperoni", "mushrom", "mozarella"],
// id: 0,
// price: 14,
// emoji: "🍕"





document.addEventListener("click", function(e){
    console.log(e.target)
    // console.log(e.target.dataset.item)
    // console.log(e.target.dataset.price)
    buildCartString(e.target.dataset.item, e.target.dataset.price)
})



function buildMenuHtmlString(){
    const menuArr = []
    menuArray.forEach(function (item){
        menuArr.push(
            `
            <div class="item">
                <div class="box">
                    <div class="img-container"> 
                        <p class="item-image">${item.emoji}</p>
                    </div>
                    <div class="item-desc">
                        <p class="item-title">${item.name}</p>
                        <p class="item-description">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <div class="button-container">
                    <button class="add-btn" data-item="${item.name}" data-price=${item.price}>+</button> 
                </div>
            </div>
            `
        )
    })
    return menuArr.join('')

}
    


const main = document.querySelector(".options")
function renderMain(htmlString){
    //get the options section
    //add a div for each item
    main.innerHTML = htmlString

}

const checkoutSection = document.querySelector(".checkout")
checkoutSection.classList.add("hidden")

const cartItems = {
    Pizza: {count: 0, price: 14},
    Hamburger: {count: 0, price: 12},
    Beer: {count: 0, price: 12}
}

let cartShown = false;
let totalPrice = 0;



function buildCartString(item, price){

    if (!cartShown){
        checkoutSection.classList.remove("hidden")
        cartShown = true;

        const totalContainer = document.createElement("div")
        totalContainer.classList.add("total-container")
        totalContainer.innerHTML = `
                <p class="total-price-txt">Total price:</p>
                <p class="total-price">$0</p>
        `

        const completeBtn = document.createElement("button")
        completeBtn.classList.add("complete-order-btn")
        completeBtn.textContent = "Complete order"

        checkoutSection.appendChild(totalContainer)
        checkoutSection.appendChild(completeBtn)
 

    }

    if (cartItems[item].count === 0){
        const itemContainer = document.createElement("div")
        itemContainer.classList.add("item-container")
        itemContainer.id = `container-${item}`
        itemContainer.innerHTML = `
            <p class="order-item" id="order-${item}">${item} x1
            <button class="remove-btn" onclick="removeItem('${item}')">remove</button>
            </p>
            <p class="price" id="price-${item}">$${price}</p>
        `

        checkoutSection.insertBefore(itemContainer, document.querySelector(".total-container"))
    }

    cartItems[item].count++
    totalPrice += Number(price)

    updateItem(item)
    updateTotal()
    

    
}

function updateItem(item){
    switch (item){
        case "Pizza":
            updatePizza()
            break;
        case "Beer":
            updateBeer()
            break;
        case "Hamburger":
            updateBurger()
            break;

    }
}

function updatePizza() {
    console.log(cartItems.Pizza.count)
    document.getElementById("order-Pizza").innerHTML = `Pizza x${cartItems.Pizza.count} 
        <button class="remove-btn" onclick="removeItem('Pizza')">remove</button>`;
    document.getElementById("price-Pizza").textContent = `$${cartItems.Pizza.count * cartItems.Pizza.price}`;
}


function updateBurger(){
    document.getElementById("order-Hamburger").innerHTML = `Burger x${cartItems.Hamburger.count}
    <button class="remove-btn" onclick="removeItem('Burger')">remove</button>`
    document.getElementById("price-Hamburger").textContent = `$${cartItems.Hamburger.count * cartItems.Hamburger.price}`
    console.log("updated burger")
}

function updateBeer(){
    document.getElementById("order-Beer").innerHTML = `Beer x${cartItems.Beer.count}
    <button class="remove-btn" onclick="removeItem('Beer')">remove</button>`
    document.getElementById("price-Beer").textContent = `$${cartItems.Beer.count * cartItems.Beer.price}`
    console.log("Updated beer")

}

function updateTotal(){
    // console.log("stuck here")
    document.querySelector(".total-price").textContent = `$${totalPrice}`
    // console.log("Found total price")
}



renderMain(buildMenuHtmlString())