

const input = document.getElementById('input');
const wordTitle = document.getElementById('entered-word');
const meaning = document.getElementById('meaning');
const error = document.getElementById('error');
const ansContainer = document.getElementById('ans-container');
const inputWord = document.getElementById('inputWord');
const mean = document.getElementById('mean');
const info = document.getElementById('info');
const example = document.getElementById('example');
const audio = document.getElementById('audio');
const donateUsButton = document.getElementById('donate-link');
const writeUsEmail = document.getElementById('write-us-link');
const container = document.getElementsByClassName('container');
const instruction = document.getElementById('instruction');
const searchButton = document.getElementById('search-button');
const ansValueContainer = document.getElementsByClassName('ans-val');
let keyword = "";
const nightMode = document.getElementById('night-mode');
const appHeader = document.getElementById('app-header');

//show meaning
function showAns(e) {

    reset();
    const inputValue = e.target.value;
    console.log(inputValue);


    if (inputValue && e.key === 'Enter') {

        reset();

        fetchMeaning(inputValue);
        instruction.style.display = 'none';
        ansContainer.style.display = 'block';

    } else if (e.key === 'Enter') {
        //alert('please enter word !!!')
        info.innerText = "pls enter word !!!";
        info.style.display = 'block';
        // alert("please enter word !!!")

    }
}

//add event listener
input.addEventListener('keyup', showAns);



function validateButtonClick() {


    return true;

}

//function nightmode

function nightModeOnOff() {
    // style.backgroundColor === "#e6e9f3"
    console.log(document.body.backgroundColor);
    if (document.body.style.backgroundColor != "black") {
        nightMode.innerText = "Day Mode"
        document.body.style.backgroundColor = "black";
        appHeader.style.color = "#e6e9f3";
        info.style.color = "#e6e9f3";
        nightMode.style.color = "#e6e9f3";
        inputWord.style.color = "#e6e9f3";
        mean.style.color = "#e6e9f3";
        example.style.color = "#e6e9f3";
        donateUsButton.style.color = "#e6e9f3";
        writeUsEmail.style.color = "#e6e9f3";
        instruction.style.color = "#e6e9f3";
    }
    else {
        nightMode.innerText = "Night Mode"
        document.body.style.backgroundColor = "#e6e9f3";
        appHeader.style.color = "black";
        info.style.color = "black";
        donateUsButton.style.color = "black";
        writeUsEmail.style.color = "black";
        nightMode.style.color = "black";
        input.style.color = "black";
        mean.style.color = "black";
        example.style.color = "black";
        instruction.style.color = "black";
    }
}

nightMode.addEventListener('click', nightModeOnOff)

//function validate input

function validateInput(e) {

    keyword = e.target.value;
    if (keyword !== "") {
        return true;
    } else {
        return false;
    }

}

//function search
function search() {
    console.log(keyword);
    if (validateInput && keyword !== "") {


        fetchMeaning(keyword);
        instruction.style.display = 'none';
        ansContainer.style.display = 'block';

    } else {
        info.innerText = "pls enter word !!!";
        info.style.display = 'block';
        // alert("please enter word !!!")
    }
    keyword = "";
}

input.addEventListener('keyup', validateInput);
searchButton.addEventListener('click', search);



function getResponse(response) {

    return response.json();
}

//fetch api
async function fetchMeaning(word) {


    const endPoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    reset();
    try {

        info.innerText = `Searching for word : ${word}`;
        info.style.display = 'block';


        const result = await fetch(endPoint).then(getResponse)

        console.log(result);
        if (result.title) {
            info.innerText = result.title;
            ansContainer.style.display = 'none';
            info.style.display = 'block';
            return;
        }
        info.style.display = 'none';
        inputWord.innerText = word;
        const allMeanings = result[0].meanings[0].definitions;
        //  console.log(allMeanings);
        let innnerTextBuilder = "";
        let number = 1;


        const iterator = allMeanings.forEach(element => {
            innnerTextBuilder = innnerTextBuilder + ` ${number}) ` + element.definition;
            //  console.log(innnerTextBuilder);
            number = number + 1;
        });
        mean.innerText = innnerTextBuilder;
        number = 0;
        innnerTextBuilder = "";
        // mean.innerText = result[0].meanings[0].definitions
        // [0].definition;
        const exampleAns = result[0].meanings[0].definitions
        [0].example;
        if (exampleAns) {
            example.innerText = exampleAns;
            [0].example;
        } else {
            example.innerText = "N/A";
        }

        audio.src = result[0].phonetics[0].audio;



        // console.log('meaning is ' + meaning);
    } catch (error) {

        console.log(error);
    }
}


function reset() {
    ansContainer.style.display = 'none';
    info.style.display = 'none';
    instruction.style.display = 'block';

}









