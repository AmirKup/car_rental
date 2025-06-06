'use strict';
let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');
fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
    filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
    filterIcon.setAttribute('src', 'images/filter.svg')
    }
});
let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

$(".filterSizeWrap").click(function() {
    $('.filterSizes').toggle();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest(".filterSizeWrap").length) {
      $('.filterSizes').hide();
    }
    e.stopPropagation();
});


let filterTrendings = document.querySelector('.filterTrendings');
let filterTrendingWrap = document.querySelector('.filterTrendingWrap');
filterTrendingWrap.addEventListener('click', function() {
    filterTrendings.classList.toggle('hidden');
});
$(".filterTrendingWrap").click(function() {
    $('.filterTrendings').toggle();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest(".filterTrendingWrap").length) {
      $('.filterTrendings').hide();
    }
    e.stopPropagation();
});



let filterPrices = document.querySelector('.filterPrices');
let filterPriceWrap = document.querySelector('.filterPriceWrap');
filterPriceWrap.addEventListener('click', function() {
    filterPrices.classList.toggle('hidden');
});

$(".filterPriceWrap").click(function() {
    $('.filterPrices').toggle();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest(".filterPriceWrap").length) {
      $('.filterPrices').hide();
    }
    e.stopPropagation();
});

$(document).ready(function() {
//скрыть PopUp корзины при загрузке страницы
    PopUpHide();
});
//функция отображения PopUp корзины
function PopUpShow() {
    $("#popup1").show();
}
//функция скрытия PopUp корзины
function PopUpHide() {
    $("#popup1").hide();
}
//класс корзины
class Cart {
    products = [];
    addToCart(product) {
    var existInCart = this.products.map(function(productSearch) { return productSearch.name; }).indexOf(product.name);
    if (existInCart >= 0) {
        this.products[existInCart].count = ++this.products[existInCart].count;
    } else {
        product.count = 1;
        this.products.push(product);
    }
}
//метод возвращает количество позиций в корзине
    get countProducts() {
        let countP = 0;
        this.products.forEach(product => {
            countP += product.count;
        });
        return countP;
    }
//метод получает итоговую сумму всех товаров в корзине
    get fullPrice() {
        let fPrice = 0;
        this.products.forEach(product => {
            fPrice += product.count * +String(product.price).replace("$", "");
        });
        return fPrice.toFixed(2);
    }
}
//инициализируем корзину
let cart = new Cart;
//класс для объекта товара (product)
class Product {
    count = 0;
    constructor(name, text, price) {
        this.name = name;
        this.text = text;
        this.price = price;
        }
    }
//спан отображения количества элеменов в корзине
let itemsCart = document.querySelector(".itemsCart");
itemsCart.textContent = cart.countProducts.toString();
//для каждой кнопки добавления товара создаём обработчик клика, с наполнением корзины
//отображаем счётчик количества товаров в корзине и добавляем товар в корзину
let addBtns = document.querySelectorAll(".featuredAddToCart");
addBtns.forEach(addBtn => {
    addBtn.addEventListener("click", function(event) {
        let pNode1 = event.currentTarget.parentNode;
        let pNode2 = pNode1.parentNode;
        let pNode3 = pNode2.parentNode;
        let nameProduct = pNode3.querySelector(".featuredName");
        let textProduct = pNode3.querySelector(".featuredText");
        let priceProduct = pNode3.querySelector(".featuredPrice");
        let product = new Product(nameProduct.innerText, textProduct.innerText, priceProduct.innerText);
        cart.addToCart(product);
        itemsCart.textContent = cart.countProducts.toString();
        })
    })
//изображение корзины
let imgCart = document.querySelector(".cartIcon");

imgCart.addEventListener("click", function(event) {
    generateCartView(itemsCart);
})
//функция генерации блока с контентом корзины
function generateCartView(itemsCart) {
    let popupExist = document.getElementById("popup1");
    if (popupExist != undefined) {
        let cartDivTable = popupExist.querySelector("table");
        cartDivTable.innerHTML = "";
        generateCartTable(cart, cartDivTable);
        PopUpShow();
    } else {
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
        tableHTML += "<tr> <th>Товар</th> <th>Количество</th> <th>Цена</th> </tr>";
        cart.products.forEach(item => {
            tableHTML += `<tr> <td>${item.name}</td> <td>${item.count}</td>
<td>${item.price}</td> </tr>`;
        });
        tableHTML += `<tr> <th>Итого:</th> <th>${cart.countProducts}</th>
<th>$${cart.fullPrice}</th> </tr>`;
        cartTable.innerHTML = tableHTML;
        }
    }





    
$('body').append('<div class="upbtn"></div>');            
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.upbtn').css({
            left: '0'
        });
        } else {
        $('.upbtn').css({
            left: '-100px'
        });
    }
});
$('.upbtn').on('click',function() {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
}); 
 
