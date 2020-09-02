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
const navItems = [nav1,nav2,nav3,nav4,nav5];

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

//Control Nav Animation
function navAnimation(direction1,direction2){
    navItems.forEach((nav,i) =>{
        nav.classList.replace(`slide-${direction1}-${i + 1}`,`slide-${direction2}-${i + 1}`);
    });
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
        
        console.log('data.quoteText.length = ',data.quoteText.length)
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
        overlay.classList.replace('overlay-slide-left','overlay-slide-right');
        //Animate In - Nav Items
        navAnimation('out','in');
    }else{
        //Animate Out - Overlay
        overlay.classList.replace('overlay-slide-right','overlay-slide-left');
        //Animate Out - Nav Items
        navAnimation('in','out');
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

navItems.forEach((nav)=>{
    nav.addEventListener('click',toggleNav);
});

//On Load
getQuote();
