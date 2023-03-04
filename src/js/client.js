import './../css/client.css';

import './ExcursionsAPI';

import Client from './classes/ClientClass';



const apiUrl = 'http://localhost:3000/excursions';
const urlOrders = 'http://localhost:3000/orders';
const excursionPanel = document.querySelector('.excursions');

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');

    loadExcursions();
   
    addOrders();
    //removeOrders();
}

function loadExcursions() {
    fetch(apiUrl)
    .then(resp => {
        if (resp.ok) { return resp.json() }
        return Promise.reject(resp);
    })
      
        .then(data => {
            console.log(data);
            showBasket(data);
           
        })
        .catch(err => console.error(err));
}

function insertExcursions(excursionsArr) {
    const ulEl = findUlEl()
    //ulEl.innerHTML = ''
    excursionsArr.forEach(item => {

        ulEl.appendChild(liClone(item))
    });
}

function findUlEl() {
    const ulEl = document.querySelector('.excursions');
    return ulEl
}

function liClone(item) {

    const prototype = document.querySelector('.excursions__item--prototype');
    const liEl = prototype.cloneNode(true);
    const title = liEl.querySelector('.excursions__title');
    const description = liEl.querySelector('.excursions__description');
    const priceAdult = liEl.querySelector('.excursions__price.adult');
    const priceChild = liEl.querySelector('.excursions__price.child');


    liEl.classList.remove('excursions__item--prototype');
    liEl.dataset.id = item.id;
    title.innerText = item.name;
    description.innerText = item.description;
    priceAdult.innerText = item.adultPrice;
    priceChild.innerText = item.childPrice;

    return liEl
}

function addOrders() {
    // const ulEl = document.querySelector('.panel__excursions');
    // console.log(ulEl)
    excursionPanel.addEventListener('submit', function(e) {
        alert('submit')
        e.preventDefault()     
        const excursion = e.target;
       
            const error =[];
            const[amountAdult, amountChild] = excursion.querySelectorAll('.excursions__field-input');
            const prices = excursion.querySelectorAll('.excursions__price');
            
            const liEl = excursion.parentElement;
            const excursionTitle = liEl.querySelector('.excursions__title').innerText;
            const id = excursion.parentElement.dataset.id;
            if(amountAdult.value === '' && amountChild.value === ''){
                alert('Należy podać ilość');
            }else{
                if(amountAdult.value === ''){
                    amountAdult.value = 0;
                }else if(amountChild.value === ''){
                    amountChild.value = 0;
                }
             
                if(error.length === 0){
                    showBasket(id, amountAdult.value, amountChild.value, excursionTitle, prices);
                    excursion.reset(); 
                }
            }
        })   
    }

    function showBasket(id, amountAdult, amountChild, excursionTitle,prices ){
        const summary = document.querySelector('.summary');
        const matchExcursion = summary.querySelector(`[data-id="${id}"]`);
        console.log(summary, matchExcursion);
        const[priceAdult, priceChild] = prices;
        const clone = createOrderClone(amountAdult, amountChild, excursionTitle, priceAdult, priceChild);
        clone.dataset.id = id;
        if(matchExcursion){
            updateOrderItem(matchExcursion, amountAdult, amountChild, prices);
        }else{
            summary.appendChild(clone);
            const removeBtn = clone.querySelector('.summary__btn-remove');
            removeBtn.addEventListener('click',e => {
                e.preventDefault();
                removeOrderItem(clone)
            }); 
            updateOrderTotalPrice(Number(clone.querySelector('.summary__total-price').innerText));
        }
    }

    function updateOrderItem(matchExcursion, amountAdult, amountChild, prices){
        const [adultPrice, childPrice] = prices;
        console.log(adultPrice)
        const summaryItemTotalPrice = matchExcursion.querySelector('.summary__total-price');
        const [summaryItemAmountAdult, summaryItemAmountChild] = matchExcursion.querySelectorAll('.summary__amounts');
        summaryItemAmountAdult.innerText = `${Number(summaryItemAmountAdult.innerText) + Number(amountAdult)}`;
        summaryItemAmountChild.innerText = `${Number(summaryItemAmountChild.innerText) + Number(amountChild)}`;

        const sum = Number(summaryItemAmountAdult.innerText) * Number(adultPrice.innerText) +  Number(summaryItemAmountChild.innerText) * Number(childPrice.innerText);
        
        summaryItemTotalPrice.innerText = sum;
        updateOrderTotalPrice((Number(amountAdult) * Number(adultPrice.innerText) + Number(amountChild) * Number(childPrice.innerText)));
    }

    function removeOrderItem(excursion){
      
        const price = excursion.querySelector('.summary__total-price');
        updateOrderTotalPrice((-Number(price.innerText)));
        excursion.remove();
    }

    function updateOrderTotalPrice(price){
        const totalPriceSpan = document.querySelector('.order__total-price-value');
        const totalPrice = totalPriceSpan.innerText;
        totalPriceSpan.innerText = `${Number(totalPrice) + price}`;
    }

    function createOrderClone(amountAdult, amountChild, title, priceAdult, priceChild){
        const prototype = document.querySelector('.summary__item--prototype');
        const summaryItem = prototype.cloneNode(true);
        const summaryName = summaryItem.querySelector('.summary__name');
        const [summaryItemPriceAdult, summaryItemPriceChild] = summaryItem.querySelectorAll('.summary__prices');
        const [summaryItemAmountAdult, summaryItemAmountChild] = summaryItem.querySelectorAll('.summary__amounts')
        summaryItem.classList.remove('summary__item--prototype');
        summaryName.innerText = title;
        
        if(amountAdult === ''){
            amountAdult = 0;
        }else if(amountChild === ''){
            amountChild = 0;
        }
        summaryItemAmountAdult.innerText = amountAdult;
        summaryItemAmountChild.innerText = amountChild;
        summaryItemPriceAdult.innerText = priceAdult.innerText;
        summaryItemPriceChild.innerText = priceChild.innerText;
        
        const summaryTotalPrice = summaryItem.querySelector('.summary__total-price');
        //summaryTotalPrice.innerText = `${amountAdult * Number(priceAdult.innerText) + amountChild * Number(priceChild.innerText)}`;

        return summaryItem
    }
       








