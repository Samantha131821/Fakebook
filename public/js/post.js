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
  event.preventDefault();

  const commentCreate = document.querySelector('#comment-desc').value.trim();
  const postID = this.post_id;
  console.log(postID);
  console.log(commentCreate);
  if (commentCreate) {
    console.log(commentCreate);
    const response = await fetch(`/api/posts/comment`, {
      method: 'POST',
      body: JSON.stringify({ post_content: commentCreate, comment_likes: 0, post_id: postID }),
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



// document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);

// const deleteBtn = document.querySelector('.new-comment-form');
// if(deleteBtn){
// deleteBtn.addEventListener('click', delButtonHandler);
// };