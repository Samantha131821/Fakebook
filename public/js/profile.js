const newPostHandler = async (event) => {
    event.preventDefault();
  
    const post = document.querySelector('#project-name').value.trim();
   
  
    if (post) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({post}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-post')
    .addEventListener('submit', newPostHandler);
  
  document
    .querySelector('.')
    .addEventListener('click', delPostHandler);
  