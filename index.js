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

function showAns(e) {

    reset();
    const inputValue = e.target.value;
    //  console.log(inputValue);
    if (inputValue && e.key === 'Enter') {


        reset();
        fetchMeaning(inputValue);

        ansContainer.style.display = 'block';

    } else if (e.key === 'Enter') {

        error.style.display = 'block';

    }

}

function getResponse(response) {

    return response.json();
}


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
        mean.innerText = result[0].meanings[0].definitions
        [0].definition;
        const exampleAns = result[0].meanings[0].definitions
        [0].example;
        if (exampleAns) {
            example.innerText = exampleAns;
            [0].example;
        } else {
            example.innerText = "N/A";
        }

        audio.src = result[0].phonetics[0].audio;



        console.log('meaning is ' + meaning);
    } catch (error) {

        console.log(error);
    }
}


function reset() {
    ansContainer.style.display = 'none';
    info.style.display = 'none';
}

input.addEventListener('keyup', showAns);