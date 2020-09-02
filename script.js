const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

function startLoading() {
    if(loader){
        loader.hidden = false;
    }
    if(quoteContainer){
        quoteContainer.hidden = true;
    }
}

function stopLoading() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote(){
    startLoading();
    const proxyUrl = 'https://corsnewhereproxy.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        
        //Reduce font size for long quote
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        stopLoading();
    } catch(error) {
        //getQuote();
        stopLoading();
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function toggleNav() {
    console.log('toggleNav executed');
    //Toggle: Menu bars open/closed
    menuBars.classList.toggle('change');

    //Toggle: Menu Active
    overlay.classList.toggle('overlay-active');
    if(overlay.classList.contains('overlay-active')){
        //Animate In - Overlay
        overlay.classList.remove('overlay-slide-left');
        overlay.classList.add('overlay-slide-right');
    }else{
        //Animate Out - Overlay
        overlay.classList.remove('overlay-slide-right');
        overlay.classList.add('overlay-slide-left');
    }
}


// Event Listeners
if(newQuoteBtn){
    newQuoteBtn.addEventListener('click', getQuote);
}
if(twitterBtn){
    twitterBtn.addEventListener('click', tweetQuote);
}

if(menuBars){
    menuBars.addEventListener('click',toggleNav);
}

if(nav1){
    nav1.addEventListener('click',toggleNav);
}
if(nav2){
    nav2.addEventListener('click',toggleNav);
}
if(nav3){
    nav3.addEventListener('click',toggleNav);
}
if(nav4){
    nav4.addEventListener('click',toggleNav);
}
if(nav5){
    nav5.addEventListener('click',toggleNav);
}

//On Load
//getQuote();
