const newPostHandler = async (event) => {
  console.log(event);
  event.preventDefault();

  const postCreate = document.querySelector('#post-desc').value.trim();

  if (postCreate) {
    console.log(postCreate);
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ post_content: postCreate }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create post');
    }
  }
};



  

const newCommentHandler = async (event) => {

  console.log("here");
  
  const commentCreate = document.querySelector(`#comment-desc${event}`).value.trim();
  
  console.log(commentCreate);
  
  
  
  if (event) {
    console.log(event);
    const response = await fetch(`/api/comments/comments2`, {
      method: 'POST',
      body: JSON.stringify({ comment_content: commentCreate, comment_likes: 0, post_id: event }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create comment');
    }
  }
};






const delPostButtonHandler = async (event) => {
  console.log(event);
  if (event) {
    const id = event;

    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete post');
    }
  }
};




const delCommentButtonHandler = async (event) => {
  console.log(event);
  if (event) {
    const id = event;

    console.log(id);

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete post');
    }
  }
};



document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);


function newFunk(){
  preventDefault();
  console.log('suck my balls')
};