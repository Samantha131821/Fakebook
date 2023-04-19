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
     document.location.reload();
    } else {
      alert('Failed to create post');
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
      document.location.reload();
    } else {
      alert('Failed to delete post');
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

      document.location.reload();
    } else {
      alert('Failed to create comment');
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
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

const newpostform = document.querySelector('.new-post-form');
if(newpostform){
newpostform.addEventListener('submit', newPostHandler);
}