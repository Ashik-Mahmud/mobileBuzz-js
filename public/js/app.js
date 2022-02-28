/* 
TODO:
- 
-
-
-
-
-
-

*/

/* 1. select all important elements  */
const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-btn");
const phoneContainer = document.getElementById("phone-container");
const messageText = document.getElementById("message-text");
const preloader = document.getElementById("preloader");
const tinyMessage = document.getElementById("tiny-message");
/* 2. load all mobile phone when users click on search button  */
searchButton.addEventListener('click', async () => {
    let searchTerms = searchField.value.toLowerCase();
    if (searchTerms === '') {
        tinyMessage.style.display = 'block';
        tinyMessage.innerHTML = `<span class="text-danger">Please fill out this field.</span>`
    } else {
        phoneContainer.textContent = '';
        preloader.style.display = 'block';
        tinyMessage.style.display = 'block';
        messageText.style.display = 'none';
        let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTerms}`);
        let data = await response.json();
        displayPhone(searchTerms, data.data.length > 20 ? data.data.slice(0, 20) : data.data)
        tinyMessage.innerHTML = `<span >I got <b>${data.data.slice(0,20).length}</b> phones by name <b>${searchTerms}</b></span>`;
    }
})

/* 3. display phone item at UI  */
const displayPhone = (terms, phones) => {
    if (phones.length === 0) {
        preloader.style.display = 'none';
        messageText.style.display = 'block';
        let msgTag = messageText.innerHTML = `<h3 class="text-muted text-center">Not Found by name <b>${terms}</b></h3>`;
        phoneContainer.innerHTML = msgTag;
    } else {
        phoneContainer.textContent = '';
        phones.forEach((phone) => {
            let {
                image,
                phone_name,
                brand,
                slug
            } = phone;
            phoneContainer.innerHTML += `
                                        <div class="col-lg-3 col-md-5 col-sm-6" >
                                        <div class="card p-2 shadow-sm">
                                            <div class="text-center bg-light p-4">
                                                <img src="${image}" class="img-fluid" alt="${phone_name}" width="200px">
                                            </div>
                                            <div class="card-body mt-2">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <h5>${phone_name}</h5>
                                                    <span class="brand">${brand}</span>
                                                </div>
                                                <button onclick="loadPhoneInfo('${slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="mt-2 btn bg-primary-alt text-white" >More Info</button>
                                            </div>
                                        </div>
                                        </div>`;
        });
        preloader.style.display = 'none';
    }
}


/* 4. load phone details on modal  */
const loadPhoneInfo = async (slug) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    let data = await response.json();
    displayPhoneInfo(data.data)
}

/* 5. display phone info at modal  */
const displayPhoneInfo = (phone) => {
    const modalContainer = document.getElementById('modal-content');
    let {
        brand,
        releaseDate,
        image,
        name,
        mainFeatures,
        others
    } = phone;
    // for main features 
    let {
        storage,
        displaySize,
        memory,
        chipSet,
        sensors
    } = mainFeatures;
    // for sensors 
    const sensorsText = sensors.map(sensor => ` <li class="my-1 text-capitalize"> ${sensor}</li>`).join('');
    // for others
    let othersValues = Object.entries(others);
    let othersTag = '';
    for (let [key, value] of othersValues) othersTag += `<span >${key} : <i class="text-primary-alt">${value}</i></span>`;
    modalContainer.innerHTML = `
                                <div class="modal-header">
                                    <div class="d-flex flex-wrap w-100 align-items-center justify-content-between">
                                        <h5 class="modal-title" id="staticBackdropLabel">${name}</h5>
                                        <span> ${releaseDate ? releaseDate : 'Not Available Release Date'}</span>
                                    </div>
                               </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-wrap justify-content-lg-around justify-content-center w-100 p-3 my-4">
                                        <img src="${image}" alt="details image"
                                            class="img-fluid">
                                        <div>
                                            <p><b>Brand - </b> ${brand}</p>
                                            <div class="sensors">
                                                <b>Sensors</b>
                                                <ul class="list-unstyled">
                                                ${sensorsText ? sensorsText : 'Not Available Sensors'}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="main-features m-md-3">
                                        <h5>Specification - </h5>
                                        <ul class="list-group">
                                            <li class="list-group-item "><b>Storage:</b>${storage}</li>
                                            <li class="list-group-item "><b>DisplaySize:</b>${displaySize}</li>
                                            <li class="list-group-item "><b>ChipSet:</b> ${chipSet}</li>
                                            <li class="list-group-item "><b>Memory:</b> ${memory}</li>
                                        </ul>
                                    </div>
                                    <div class="others m-md-3 mb-0">
                                        <b>Others</b>
                                        <p>${othersTag ? othersTag : 'Not Available yet.'}</p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn bg-primary-alt text-white">Checkout for Buy</button>
                                </div>`;
}