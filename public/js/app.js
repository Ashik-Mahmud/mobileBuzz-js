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
searchButton.addEventListener('click', async (event) => {
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
        displayPhone(searchTerms, data.data.slice(0, 20))
        tinyMessage.innerHTML = `<span >I got <b>${data.data.slice(0,20).length}</b> phones by <b>${searchTerms}</b></span>`
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
            phoneContainer.innerHTML += `
                                        <div class="col-lg-3 col-md-5 col-sm-6" >
                                        <div class="card p-2 shadow-sm">
                                            <div class="text-center bg-light p-4">
                                                <img src="${phone.image}" class="img-fluid" alt="" width="200px">
                                            </div>
                                            <div class="card-body mt-2">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <h5>${phone.phone_name}</h5>
                                                    <span class="brand">${phone.brand}</span>
                                                </div>
                                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="mt-2 btn bg-primary-alt text-white" >More Info</button>
                                            </div>
                                        </div>
                                        </div>`;
        });
        preloader.style.display = 'none';
    }
}