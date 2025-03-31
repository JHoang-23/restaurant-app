import menuArray from '/data.js'
const userCart = []


document.addEventListener("click", function(e){
    // console.log(e.target)
    // console.log(e.target.dataset.item)
    // console.log(e.target.dataset.price)
    if (e.target.dataset.item){
        console.log("calling buildCheckout")
        buildCheckout(e.target.dataset.item)
    } 
    else if (e.target.dataset.rel){
        // console.log(e.target.parentNode.dataset.removeitem)
        console.log(e.target.dataset.rel)
        removeItem(e.target.dataset.rel)
    } else if (e.target === document.querySelector(".complete-order-btn")){
        completeOrder()
    }
    //  else if (e.target === document.querySelector(".submit-btn")){
    //     payButtonClicked()
    // }
    
    
})


//Build the HTML string for the initial menu
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
    main.innerHTML = htmlString
}

//initially hide the checkout section
const checkoutSection = document.querySelector(".checkout")
checkoutSection.classList.add("hidden")



const pizzaContainer = document.querySelector(".pizza-container")
const hamburgerContainer = document.querySelector(".hamburger-container")
const beerContainer = document.querySelector(".beer-container")

const cartItems = {
    Pizza: {count: 0, price: 14, container: pizzaContainer},
    Hamburger: {count: 0, price: 12, container: hamburgerContainer},
    Beer: {count: 0, price: 12, container: beerContainer}
}


let displayCheckout = false
function buildCheckout(item){
    //initially all items have 0 count.
    if (!displayCheckout || cartItems[item].count === 0){
        console.log("Being called")
        cartItems[item].count ++ //Increment count of the item chosen
        updateTotal()//calculate new total
    
        for (let key in cartItems){ //for each item in the cart 
            let item = cartItems[key] //get the object
            if (item.count > 0){ //if its count is greater than 0
                item.container.classList.remove("hidden") //unhide it's html
                displayCheckout = true
            }
        }
    
        if (displayCheckout === true){
            checkoutSection.classList.remove("hidden")
        }
    }
    else{ //item/items are already displayed
        cartItems[item].count ++
        console.log("calling updateItemText")
        updateItemText(item)
        updateTotal()

    }

}



function updateItemText(item){
    console.log("item is pizza")
    if (item === "Pizza"){
        if (cartItems[item].count === 0){
            cartItems[item].container.classList.add("hidden")
        }
        else{
            document.querySelector(".pizza-quantity").textContent = `x${cartItems[item].count}`
            document.querySelector(".pizza-total").textContent = `$${cartItems[item].count * cartItems[item].price}`
        } 
    }

    else if (item === "Hamburger"){
        if (cartItems[item].count === 0){
            cartItems[item].container.classList.add("hidden")
        }
        else{
            document.querySelector(".hamburger-quantity").textContent = `x${cartItems[item].count}`
            document.querySelector(".hamburger-total").textContent = `$${cartItems[item].count * cartItems[item].price}`
        }

    }

    else if (item === "Beer"){
        if (cartItems[item].count === 0){
            cartItems[item].container.classList.add("hidden")
        } 
        else{
            document.querySelector(".beer-quantity").textContent = `x${cartItems[item].count}`
            document.querySelector(".beer-total").textContent = `$${cartItems[item].count * cartItems[item].price}`
        }
    }

    if (isEmptyCart()){
        checkoutSection.classList.add("hidden")
    }
}

function isEmptyCart(){
    let total = 0
    for (const item of Object.values(cartItems)){
        total += item.count
    }

    return (total === 0)
}

function updateTotal(){
    let total = 0
    for (const item of Object.values(cartItems)){
        total += item.count * item.price
    }
    console.log(total)
    document.querySelector(".total-price").textContent = `$${total}`
}

function removeItem(item){
    console.log("item is :" + item)
    cartItems[item].count --
    updateItemText(item)
    updateTotal()
}



function completeOrder(){
    //unhide modal
    document.querySelector(".modal-container").style.display = 'flex'
}

function payButtonClicked(orderName){
    //hide modal
    //update basket text
    
    console.log("pay clicked")
    document.querySelector(".modal-container").style.display = 'none'
    checkoutSection.innerHTML = 
    `
    <div class="order-completed">
        <div class="message">
        <p>Thanks ${orderName}, Your order is on its way!</p>
        </div>
    </div>
    `
}

const paymentForm = document.getElementById('payment-form')

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const orderName =  paymentFormData.get('name')
    payButtonClicked(orderName)
})


renderMain(buildMenuHtmlString())