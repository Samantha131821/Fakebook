const newPostHandler = async (event) => {
  event.preventDefault();

  const postCreate = document.querySelector('#post-desc').value.trim();

  if (postCreate) {
    console.log(postCreate);
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ postCreate }),
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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

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

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);

const deleteBtn = document.querySelector('.delete-button');
if(deleteBtn){
deleteBtn.addEventListener('click', delButtonHandler);
};
