const apiKey = '14eb8db8-b39d-4958-abef-1182ed6d530b'; 

const concertsContainer = document.querySelector('#showsInformation');

axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`)
    .then((response) => {
        response.data.forEach((datum) => {
            displayConcert(datum);
         });
    });

function displayConcert(show) {
    //Article element
    const showArticle = document.createElement('article'); 
    showArticle.classList.add('show-article');

    //Date container
    const showDateContainer = document.createElement('div'); 
    showDateContainer.classList.add('show-date');
    showArticle.appendChild(showDateContainer);

    //Date header
    const showDateHeader = document.createElement('p');
    showDateHeader.classList.add('show-date__header');
    showDateHeader.innerText = 'Date';
    showDateContainer.appendChild(showDateHeader);

    //Date string
    const showDateString = document.createElement('p');
    showDateString.classList.add('show-date__string');

    const dateConvert = Number(show.date);
    const date = new Date(dateConvert);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getUTCDate(), 22));
    showDateString.innerText = utcDate.toDateString();
    showDateContainer.appendChild(showDateString);

    //Venue container
    const showVenueContainer = document.createElement('div');
    showVenueContainer.classList.add('show-venue');
    showArticle.appendChild(showVenueContainer);

    //Venue header
    const showVenueHeader = document.createElement('p');
    showVenueHeader.classList.add('show-venue__header');
    showVenueHeader.innerText = 'Venue';
    showVenueContainer.appendChild(showVenueHeader);

    //Venue string
    const showVenueString = document.createElement('p');
    showVenueString.classList.add('show-venue__string');
    showVenueString.innerText = show.place;
    showVenueContainer.appendChild(showVenueString);

    //Location container
    const showLocationContainer = document.createElement('div');
    showLocationContainer.classList.add('show-location');
    showArticle.appendChild(showLocationContainer);

    //Location header
    const showLocationHeader = document.createElement('p');
    showLocationHeader.classList.add('show-location__header');
    showLocationHeader.innerText = 'Location';
    showLocationContainer.appendChild(showLocationHeader);

    //Location string
    const showLocationString = document.createElement('p');
    showLocationString.classList.add('show-location__string');
    showLocationString.innerText = show.location;
    showLocationContainer.appendChild(showLocationString);

    //Buy Tickets button
    const buyTicketsButton = document.createElement('button');
    buyTicketsButton.innerText = 'Buy Tickets';
    showArticle.appendChild(buyTicketsButton);
    
    concertsContainer.appendChild(showArticle);
};