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


/* 2. load all mobile phone when users click on search button  */
searchButton.addEventListener('click', async (event)=>{
    let searchTerms = searchField.value.toLowerCase();
    let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTerms}`);
    let data = await response.json();
    displayPhone(data)
})

/* 3. display phone item at UI  */
const displayPhone = (phones) =>{
    console.log(phones)
}