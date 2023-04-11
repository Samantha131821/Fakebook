const newPostHandler = async (event) => {
    event.preventDefault();
      
    const postCreate = document.querySelector('#new-post').value.trim();
    
        if (postCreate) {
          const response = await fetch(``, {
            method: 'POST',
            body: JSON.stringify({postCreate}),
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
      
      const delButtonHandler = async (event) => {
        if (event.target.hasAttribute('data-id')) {
          const id = event.target.getAttribute('data-id');
      
          const response = await fetch(`/api/post${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            document.location.replace('/post');
          } else {
            alert('Failed to delete post');
          }
        }
      };
      
      document
        .querySelector('.post-form')
        .addEventListener('submit', newPostHandler);
      
      document
        .querySelector('.post-list')
        .addEventListener('click', delButtonHandler);
    
