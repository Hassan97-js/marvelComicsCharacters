/* jshint esversion: 8 */

/* Getting the needed html node elements for the search input & the wrapper for characters list */
const inputSearch = document.querySelector(".input_search");
const charactersListWrapper = document.querySelector('#charactersListWrapper');

/* Creating an array for getting reference for the marvel api results array */
let charactersArray = [];

/* Adding keyup addEventListener built-in function for add event to the input when keyboard key is pressed */
inputSearch.addEventListener("keyup", e => {
    const searchString = e.target.value.toLowerCase();
    const filteredInputSearch = charactersArray.data.results.filter(character => {
        console.log(character);
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    displayMarvilCharacters(filteredInputSearch);
});

/* Fetching the results array from the marvel api */
let promise = async () => {
    try {
        const response = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7806e31d9b27489cb120effcda6b9b1a&hash=3f86b58dc6cf573ecd1058af04c698ac");
        charactersArray = await response.json();
        const result = charactersArray.data.results;
        displayMarvilCharacters(result);
    } catch (err) {
        console.error(err);
    }
};

/* displayMarvilCharacters arrow function for fetching every marvel character and replace it with li => h2 => img => a html elements */
const displayMarvilCharacters = characters => {
    const htmlString = characters
        .map((character) => {
            let resultImgPath;
            if (character.id === 1010846) {
                resultImgPath = character.thumbnail.path + "/portrait_incredible.gif";
            } else {
                resultImgPath = character.thumbnail.path + "/portrait_incredible.jpg";
            }
            const charactersURLS = character.urls;
            let charactersProfileURLS;
            if (charactersURLS.length === 2) {
                charactersProfileURLS = character.urls[0].url;
            } else {
                charactersProfileURLS = character.urls[1].url;
                if (character.id === 1010846) {
                    charactersProfileURLS = "https://www.marvel.com/characters/aegis-trey-rollins";
                }
            }
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <img src="${resultImgPath}"></img>
                <a href="${charactersProfileURLS}" target="#">About Character</a>
            </li>
        `;
        }).join('');
    charactersListWrapper.innerHTML = htmlString;
};

promise();


