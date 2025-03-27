import menuArray from '/data.js'
const userCart = []



// name: "Pizza",
// ingredients: ["pepperoni", "mushrom", "mozarella"],
// id: 0,
// price: 14,
// emoji: "🍕"



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
                    <button class="add-btn" data-item="${item.name}">+</button> 
                </div>
            </div>
            `
        )
    })
    return menuArr.join('')

}

document.addEventListener("click", function(e){
    
    console.log(e.target.dataset.item)
    buildCartString(e.target.dataset.item)
})

function buildCartString(item){
    //if user clicks pizza button, pizza gets added to the cart.
    const cartString = []
    if (item === "Pizza"){
        console.log("User ordered pizza")
    } else if (item === "Hamburger"){
        console.log("User ordered hamburger")
    } else if (item === "Beer"){
        console.log("User ordered beer")
    }

    `
  
    `
}
    


const main = document.querySelector(".main")
function render(htmlString){
    //get the options section
    //add a div for each item
    main.innerHTML = htmlString

}

render(buildMenuHtmlString())