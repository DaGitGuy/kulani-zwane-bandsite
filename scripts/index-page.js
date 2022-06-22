const apiKey = '61c0e2cf-298d-46c5-8566-447849b3e892'; 

const currentComments = [
    {
        name: 'Connor Walton',
        timestamp: new Date(2021, 1, 17),
        text: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.' 
    },

    {
        name: 'Emilie Beach',
        timestamp: new Date(2021, 0, 9),
        text: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },

    {
        name: 'Miles Acosta',
        timestamp: new Date(2020, 11, 20),
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." 
    }
];

const formElement = document.querySelector('#commentForm');
const commentsContainer = document.querySelector('#currentCommentsContainer');

currentComments.forEach((currentComment) => {
    displayComment(currentComment);
 });

formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const newComment = {};
    newComment.name = e.target.fullName.value; 
    newComment.timestamp = new Date();
    newComment.text = e.target.comment.value;

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

function displayComment(comment) {

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
            commentName.innerText = comment.name;
            commentNameDateContainer.appendChild(commentName);

            //Date
            const commentDate = document.createElement('p');
            const monthAdjust = comment.timestamp.getMonth()+1;

            if (comment.timestamp.getMonth() < 10 && comment.timestamp.getDate() < 10) {
                commentDate.innerText = '0' + monthAdjust + '/' + '0' + comment.timestamp.getDate() + '/' + comment.timestamp.getFullYear();
            } else if (comment.timestamp.getMonth() < 10 && comment.timestamp.getDate() > 9) {
                commentDate.innerText = '0' + monthAdjust + '/' + comment.timestamp.getDate() + '/' + comment.timestamp.getFullYear();
            } else if (comment.timestamp.getMonth() > 9 && comment.timestamp.getDate() < 10) {
                commentDate.innerText = monthAdjust + '/' + '0' + comment.timestamp.getDate() + '/' + comment.timestamp.getFullYear();
            } else {
                commentDate.innerText = monthAdjust + '/' + comment.timestamp.getDate() + '/' + comment.timestamp.getFullYear();
            };

            commentNameDateContainer.appendChild(commentDate);

        //Comment text
        const commentText = document.createElement('p'); 
        commentText.innerText = comment.text;
        commentTextContainer.appendChild(commentText);


    commentsContainer.appendChild(commentArticle);
};



