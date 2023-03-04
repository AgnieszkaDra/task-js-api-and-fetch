

//import './ExcursionsAPI';

const apiUrl = 'http://localhost:3000/excursions'

//document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', init);


function init() {
    loadExcursions();
    addExcursions();
    removeExcursions();
    updateExcursions();
}


function loadExcursions() {

    fetch(apiUrl)
        .then(resp => {
            if (resp.ok) { return resp.json() }
            return Promise.reject(resp);
        })
        .then(data => {
            console.log(data);
            insertExcursions(data);
        })
        .catch(err => console.error(err));
}

function addExcursions() {
    const form = document.querySelector('.form')

    form.addEventListener('submit', e => {
        e.preventDefault()

        const { name, description, adultPrice, childPrice } = e.target.elements;
        console.log(adultPrice, childPrice)
        const data = {
            name: name.value,
            description: description.value,
            adultPrice: adultPrice.value,
            childPrice: childPrice.value,
        };
        console.log(data)

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally(loadExcursions);
    });

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


function removeExcursions() {
    const ulEl = findUlEl();
    ulEl.addEventListener('click', e => {
        e.preventDefault()
        const targetEl = e.target;
        console.log(targetEl)
        if (isElementValue(e.target.value, 'usuń')) {

            const id = e.target.closest('li').dataset.id;
            console.log(id)
            const options = { method: 'DELETE' };
            if (confirm("Czy na pewno chcesz usunąć wycieczkę?")) {
                fetch(`${apiUrl}/${id}`, options)
                    .then(resp => console.log(resp))
                    .catch(err => console.error(err))
                    .finally(() => {
                        clearExcursions();
                        loadExcursions()
                    }

                    );


            }
        }
    }
    )
}

function clearExcursions(id) {
    alert('clear')
    const excursions = document.querySelectorAll('.excursions__item:not(.excursions__item--prototype)')
    //const excursions = document.querySelector(id)


    excursions.forEach(ex => ex.remove());
}


function isElementValue(element, value) {
    if (element === value) {
        return true
    }
}

function updateExcursions() {
    const ulEl = document.querySelector('.panel__excursions');
    ulEl.addEventListener('click', e => {
        e.preventDefault();
        const targetEl = e.target;
        const excursion = e.target.closest('li');
        console.log(targetEl)
        console.log(excursion)

          const exTitle = excursion.querySelector('.excursions__title');
            const exDescription = excursion.querySelector('.excursions__description');
            const [priceAdult, priceChild] = excursion.querySelectorAll('.excursions__price');
            const editableElements = [exTitle, exDescription, priceAdult, priceChild];
            console.log(editableElements)
        

        const id = excursion.dataset.id;
      
            function isElementValue(element, value){
                if(element === value){
                    return true
                }
            }

            function switchEditable(elements, value){
                elements.forEach(element => element.contentEditable = value);
            }
            if(isElementValue(e.target.value, 'edytuj')){
                switchEditable(editableElements, true);
                e.target.value = 'zapisz';

            }else if(isElementValue(e.target.value, 'zapisz')){
                
                switchEditable(editableElements, false);
                e.target.value = 'edytuj';
  
                const data = {
                    name: exTitle.innerText,
                    adultPrice: Number(priceAdult.innerText),
                    childPrice: Number(priceChild.innerText),
                    description: exDescription.innerText,
                }
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                };
                fetch(`${apiUrl}/${id}`, options)
                    .then(resp => console.log(resp))
                    .catch(err => console.error(err))
                    .finally( () => {
                        targetEl.value = 'edytuj';
                        editableElements.forEach (
                            item => item.contentEditable = false,
                        );
                    })
                }
                
            }
           
    )}
       

        
