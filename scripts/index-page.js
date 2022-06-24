const apiKey = '61c0e2cf-298d-46c5-8566-447849b3e892'; 

// const currentComments = [
//     {
//         name: 'Connor Walton',
//         timestamp: new Date(2021, 1, 17),
//         text: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.' 
//     },

//     {
//         name: 'Emilie Beach',
//         timestamp: new Date(2021, 0, 9),
//         text: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
//     },

//     {
//         name: 'Miles Acosta',
//         timestamp: new Date(2020, 11, 20),
//         text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." 
//     }
// ];

const formElement = document.querySelector('#commentForm');
const commentsContainer = document.querySelector('#currentCommentsContainer');

// currentComments.forEach((currentComment) => {
//     displayComment(currentComment);
//  });

axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
    .then((responses) => {
        // responses.forEach((response) => {
        //     displayComment(response);
        // });
        responses.data.forEach((response) => {
            displayComment(response);
        });
    });

formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const newComment = {};
    newComment.name = e.target.fullName.value; 
    newComment.timestamp = new Date();
    newComment.comment = e.target.comment.value;

    currentComments.push(newComment);

    currentComments.sort((a, b) => {
        return b.timestamp - a.timestamp;
    }); 

    commentsContainer.innerHTML = ""; //clear HTML in current comments container before appending to avoid duplication

    currentComments.forEach((currentComment)=> {
        displayComment(currentComment);
    });

    document.querySelector('#commentForm').reset();
});

function displayComment(commentInfo) {

    //Article element
    const commentArticle = document.createElement('article'); 
    commentArticle.classList.add('comment-article');

    //Image
    const commentImageElement = document.createElement('img');
    commentImageElement.setAttribute('height', 36);
    commentImageElement.setAttribute('width', 36)
    commentImageElement.classList.add('comment-article__image');
    commentArticle.appendChild(commentImageElement);

    //Text container
    const commentTextContainer = document.createElement('div');
    commentArticle.appendChild(commentTextContainer);

        //Name & date container
        const commentNameDateContainer = document.createElement('div');
        commentNameDateContainer.classList.add('comment-name-date');
        commentTextContainer.appendChild(commentNameDateContainer);

            //Name
            const commentName = document.createElement('p');
            commentName.innerText = commentInfo.name;
            commentNameDateContainer.appendChild(commentName);

            //Date
            const commentDate = document.createElement('p');
            const date = new Date(commentInfo.timestamp);
            const monthAdjust = date.getMonth()+1;
            const dayAdjust = date.getDate()+1;

            if (date.getMonth() < 10 && date.getDate() < 10) {
                commentDate.innerText = '0' + monthAdjust + '/' + '0' + dayAdjust + '/' + date.getFullYear();
            } else if (date.getMonth() < 10 && date.getDate() > 9) {
                commentDate.innerText = '0' + monthAdjust + '/' + dayAdjust + '/' + date.getFullYear();
            } else if (date.getMonth() > 9 && date.getDate() < 10) {
                commentDate.innerText = monthAdjust + '/' + '0' + dayAdjust + '/' + date.getFullYear();
            } else {
                commentDate.innerText = monthAdjust + '/' + dayAdjust + '/' + date.getFullYear();
            };

            commentNameDateContainer.appendChild(commentDate);

        //Comment text
        const commentText = document.createElement('p'); 
        commentText.innerText = commentInfo.comment;
        commentTextContainer.appendChild(commentText);


    commentsContainer.appendChild(commentArticle);
};



