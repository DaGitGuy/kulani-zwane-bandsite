const apiKey = '14eb8db8-b39d-4958-abef-1182ed6d530b'; 

let currentComments = []; //source of truth

const formElement = document.querySelector('#commentForm');
const commentsContainer = document.querySelector('#currentCommentsContainer');

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

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const newComment = {
        name: e.target.fullName.value,
        comment: e.target.comment.value  
    };

    if (e.target.fullName.value.trim().length === 0 || e.target.comment.value.trim().length === 0) {
        newComment.name = null;
        newComment.comment = null;
    };
    
    const headers = {
        'Content-Type': 'application/json'  
    };
    
    axios.post(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`, newComment, {
        headers: headers
        })
         .then((response) => {
            currentComments.unshift(response.data);

            commentsContainer.innerHTML = ""; //clear HTML in current comments container before appending to avoid duplication

            currentComments.forEach((currentComment)=> {
                displayComment(currentComment);
            });
         })
         .catch((error) => {
            alert('Failed to post your comment!\n' + error.response.data.message + '.\nPlease try again.');
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
    commentTextContainer.classList.add('comment-article__text-container');
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

const inputState = document.querySelector('input[type="text"]');
const textAreaState = document.getElementById('comment');

inputState.addEventListener('focus', (e) => {
    e.target.classList.add('active');
})
inputState.addEventListener('blur', (e) => {
    e.target.classList.add('error');
    if (e.path[0].value.trim().length === 0) {
        console.log('Capturing user input...');
    } else {
        e.target.classList.remove('error');
    }
})

textAreaState.addEventListener('focus', (e) => {
    e.target.classList.add('active');
})
textAreaState.addEventListener('blur', (e) => {
    e.target.classList.add('error');
    if (e.path[0].value.trim().length === 0) {
        console.log('Capturing user input...');
    } else {
        e.target.classList.remove('error');
    }
})


