
console.log('excursionsAPI')
const apiUrl = 'http://localhost:3000/excursions'
document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');
    loadExcursions()
    //removeExcursions()
}


function loadExcursions() {
    fetch(apiUrl)
        .then(resp => {
            if (resp.ok) { return resp.json(); }
            return Promise.reject(resp)
        })
        .then(data => {
            insertExcursions(data)
        })

        .catch(err => console.error(err));
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

function insertExcursions(excursionsArr) {
    const ulEl = findUlEl()
    //ulEl.innerHTML = ''
    excursionsArr.forEach(item => {
        alert('insert')
        ulEl.appendChild(liClone(item))
    });
}

// function clearExcursion(){
//     const excursions = document.querySelectorAll('.excursions__item:not(.excursions__item--prototype)')
//     excursions.forEach(ex => ex.remove());
// }

// function isElementValue(element, value){
//     if(element === value){
//         return true
//     }
// }

// function clearExcursions(){
//     alert('clear')
//     //const excursions = document.querySelectorAll('.excursions__item:not(.excursions__item--prototype)')
//     const excursions = document.querySelectorAll('.excursions__item')

//     excursions.forEach(ex => ex.remove());
// }

// function removeExcursions() {
//     const ulEl = findUlEl();
//     ulEl.addEventListener('click', e=> {
//         const targetEl = e.target;
//         console.log(targetEl)
//         if(isElementValue(e.target.value, 'usuń')){
//             alert('is')
//             const id = e.target.closest('li').dataset.id;
//             if(confirm("Czy na pewno chcesz usunąć wycieczkę?")){
//                 clearExcursions();
//             }
//         }
//         }
//     )
//         }

// function addExcursions(){
//     const form = document.querySelector('form')
//     form.addEventListener('submit', e => {
//         e.preventDefault()
//         const [name, description, adultPrice, childPrice] = form.elements;
//         console.log(name, description)
//     })
// }
        // if(isElementValue(e.target.value, 'usuń')) {
        //     alert('usuń')
        //     const id = targetEl.dataset.id;
        //     const options = { method:'DELETE' };
        //     fetch(`${apiUrl}/${id}`, options)               
        //      .then(resp=>console.log(resp))               
        //       .catch(err=>console.error(err))               
        //        .finally( clearExcursion);        
        //     }    })
        


// class ExcursionsAPI {

//     constructor() {
//         this.url = 'http://localhost:3000'

//     }

//     _fetch(options, path = '') {

//         const url = this.url + path

//         return fetch(url, options)
//             .then(resp => {
//                 if (resp.ok) { return resp.json(); }
//                 return Promise.reject(resp);
//             })
//     }

//     loadData(path) {

//         return this._fetch({}, path);
//     }
// }

// export default ExcursionsAPI;