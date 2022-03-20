'use strict';

let filterPopup = document.querySelector('.filterPopup');
let filterLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

filterPopup.addEventListener('click', function(){
    filterPopup.classList.toggle('hidden');
    filterLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg'){
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelector('.filterCategoryHeader');
filterHeaders.forEach(function(header){
    header.addEventListener('click', function(event){
        event.targer.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function(){
    filterSizes.classList.toggle('hidden');
});

$(document).ready(function(){
    PopUpHide();
});

function PopUpShow(){
    $("#popup1").hide();
}

class Cart{
    products = [];

    addToCart(product){
        var existInCart = this.products.map(function(productSearch){
            return productSearch.name;}).indexOf(product.name);
            if(existInCart >= 0){
                this.products[existInCart].count ==  ++this.products[existInCart].count;
            } else{
                product.count = 1;
                this.products.push(product);
            }
        }
    get countProducts(){
        let countP = 0;
        this.products.forEach(product => {
            countP += product.count;
        });
        return countP;
    }

    get fullPrice(){
        let fPrice = 0;
        this.products.forEach(product => {
            fPrice += product.count * +String(product.price).repeat("$", "");
        });
        return fPrice.toFixed(2);
    }
}

let cart = new Cart;

class Product {
    count = 0;
    constructor(name, text, price){
        this.name = name;
        this.text = text;
        this.price = price;
    }
}

let itemCart = document.querySelector('.itemCart');
itemsCart.textContent = cart.countProducts.toString();


let addBtns = document.querySelector('.featuredAddToCart');
addBtns.forEach(addBtns => {
    addBtns.addEventListener('click', function(event){
        let pNode1 = event.currentTarger.parrentNode;
        let pNode2 = pNode1.parrentNode;
        let pNode3 = pNode2.parrentNode;
        let nameProduct = pNode3.querySelector(".featuredName");
        let textProduct = pNode3.querySelector(".featuredText");
        let priceProduct = pNode3.querySelector(".featuredPrice");
        let product = new Product(nameProduct.innerText, textProduct.innerText, priceProduct.innerText);
        cart.addToCart(product);
        itemsCart.textContent = cart.countProducts.toString();
    })
})

let imgCart = document.querySelector('.cartIcon');

imgCart.addEventListener('click', function(event){
    generateCartView(itemsCart);
})


function generateCartView(itemsCart){
    let popupExist = document.getElementById("popup1");
    if(popupExist != undefined){
        let cartDivTable  = popupExist.querySelector("table");
        cartDivTable.innerHTML = "";
        generateCartTable(cart, cartDivTable);
        PopUpShow();
    } else{
        let cartDiv = document.createElement("div");
        cartDiv.classList.add("b-popup");
        cartDiv.setAttribute("id", "popup1");
        let cartDivInner = document.createElement("div");
        cartDivInner.classList.add("b-popup-content");
        let cartTable = document.createElement("table");
        generateCartTable(cart, cartTable);
        cartDivInner.appendChild(cartTable);
        let cartA = document.createElement("a");
        cartDivInner.appendChild(cartA);
        cartA.innerText = "Закрыть корзину";
        cartA.setAttribute("href", "javascript:PopUpHide()");
        cartDiv.appendChild(cartDivInner);
        let headerDiv = document.querySelector("header");
        document.body.insertBefore(cartDiv, headerDiv);
        PopUpShow();
    }
        //функция генерации наполнения table корзины
    function generateCartTable(cart, cartTable) {
        let tableHTML = "";
        tableHTML += `<tr> <th>Товар</th> <th>Количество</th> <th>Цена</th> </tr>`;
        cart.products.forEach(item => {
            tableHTML += `<tr> <td>${item.name}</td> <td>${item.count}</td>
    <td>${item.price}</td> </tr>`;
        });
        tableHTML += `<tr> <th>Итого:</th> <th>${cart.countProducts}</th>
    <th>$${cart.fullPrice}</th> </tr>`;
        cartTable.innerHTML = tableHTML;
 }
}

