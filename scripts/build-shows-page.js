const apiKey = '14eb8db8-b39d-4958-abef-1182ed6d530b'; 

const concerts = [
    {
        date: new Date(2021, 8, 6),
        venue: 'Ronald Lane',
        location: 'San Francisco, CA' 
    },

    {
        date: new Date(2021, 8, 21),
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },

    {
        date: new Date(2021, 9, 15),
        venue: 'View Lounge',
        location: 'San Francisco, CA' 
    },

    {
        date: new Date(2021, 10, 6),
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA' 
    },

    {
        date: new Date(2021, 10, 26),
        venue: 'Moscow Center',
        location: 'San Francisco, CA' 
    },

    {
        date: new Date(2021, 11, 15),
        venue: 'Press Club',
        location: 'San Francisco, CA' 
    }
];

const concertsContainer = document.querySelector('#showsInformation');

concerts.forEach((concert) => {
    displayConcert(concert);
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
            showDateString.innerText = show.date.toDateString();
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
            showVenueString.innerText = show.venue;
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
}