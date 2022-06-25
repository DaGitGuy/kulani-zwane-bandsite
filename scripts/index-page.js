const apiKey = '14eb8db8-b39d-4958-abef-1182ed6d530b'; 

let currentComments = []; //source of truth

const formElement = document.querySelector('#commentForm');
const commentsContainer = document.querySelector('#currentCommentsContainer');

console.log(currentComments);

axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
    .then((response) => {
        currentComments = response.data;
        //sort array received from API in descending order (newest to oldest):
        currentComments.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });

        currentComments.forEach((currentComment) => {
            displayComment(currentComment);
        });
    });

formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const newComment = {
        name: e.target.fullName.value,
        comment: e.target.comment.value  
    };

    axios.post(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`, newComment)
         .then((response) => {
            currentComments.unshift(response.data);

            commentsContainer.innerHTML = ""; //clear HTML in current comments container before appending to avoid duplication

            currentComments.forEach((currentComment)=> {
                displayComment(currentComment);
            });
         })
         .catch((error) => {
            alert("Failed to post your comment! Please try again.");
         });

    //clear the inputs
    e.target.reset();
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

    if (date.getMonth() < 10 && date.getUTCDate() < 10) {
        commentDate.innerText = '0' + monthAdjust + '/' + '0' + date.getUTCDate() + '/' + date.getFullYear();
    } else if (date.getMonth() < 10 && date.getUTCDate() > 9) {
        commentDate.innerText = '0' + monthAdjust + '/' + date.getUTCDate() + '/' + date.getFullYear();
    } else if (date.getMonth() > 9 && date.getUTCDate() < 10) {
        commentDate.innerText = monthAdjust + '/' + '0' + date.getUTCDate() + '/' + date.getFullYear();
    } else {
        commentDate.innerText = monthAdjust + '/' + date.getUTCDate() + '/' + date.getFullYear();
    };

    commentNameDateContainer.appendChild(commentDate);

    //Comment text
    const commentText = document.createElement('p'); 
    commentText.innerText = commentInfo.comment;
    commentTextContainer.appendChild(commentText);

    commentsContainer.appendChild(commentArticle);
};



