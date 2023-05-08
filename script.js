const resultDiv = document.querySelector(".result");
const wordElement = document.querySelector(".word");  //presents H1 tag in result class
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordmeanings = document.querySelector(".word-definition");
const synonyms = document.querySelector(".synonymsdiv");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";


const handle = (e) => {
    if (e.keyCode === 13) {
        const searchWord = e.target.value;
        console.log("enter pressed");
        fetchMeaning(searchWord);
    }
}

async function fetchMeaning(word) {
    var jsonResponse = await fetch(url + word);
    var data = await jsonResponse.json();
    
    if (jsonResponse.ok) {    
        //Display fields if there are hidden
        resultDiv.style.display = "block";
        audio.style.display = 'block';
        phonetics.style.display = 'block';
        document.querySelectorAll(".wordmeaning")[0].style.display = 'block';
        synonyms.style.display = 'block';

        //Setting values to HTML elements
        wordElement.innerText = data[0].word;
        phonetics.innerText = data[0].phonetics[0].text;
        audio.src = data[0].phonetics[0].audio;
        wordmeanings.innerText = data[0].meanings[0].definitions[0].definition;

        const synonymsArray = data[0].meanings[0].synonyms;
        console.log(synonymsArray);
        let synonymData = "";
        if (synonymsArray.length) {
            for(let i=0; i<synonymsArray.length; i++) {
                synonymData += `<p class="pills">${synonymsArray[i]}</p>`
            }
        } else {
            synonymData = `<p class="pills">No Synonyms available</p>`;
        } 
        synonyms.innerHTML = synonymData;
    } else{
        wordElement.innerText = data.title;
        wordmeanings.innerText = data.message;
        phonetics.style.display = 'none';
        audio.style.display = 'none';
        document.querySelectorAll(".wordmeaning")[0].style.display = 'none';
        document.querySelectorAll(".wordmeaning")[1].style.display = 'none';
        synonyms.style.display = 'none';
    }
}