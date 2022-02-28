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


/* 2. load all mobile phone when users click on search button  */
searchButton.addEventListener('click', async (event)=>{
    let searchTerms = searchField.value.toLowerCase();
    let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTerms}`);
    let data = await response.json();
    displayPhone(data.data.slice(0, 20))
})

/* 3. display phone item at UI  */
const displayPhone = (phones) =>{
    phones.forEach((phone) => {
        phoneContainer.innerHTML += `
                                    <div class="col-lg-3 col-md-5 col-sm-6" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="card p-2 shadow-sm">
                                        <div class="text-center bg-light p-4">
                                            <img src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg"
                                                class="img-fluid" alt="image for each phone" width="200px">
                                        </div>
                                        <div class="card-body mt-2">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <h5>Mobile name here</h5>
                                                <span class="brand">Brand</span>
                                            </div>
                                            <button class="mt-2 btn bg-primary-alt text-white" >More Info</button>
                                        </div>
                                    </div>
                                    </div>`;
    });
}