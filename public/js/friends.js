const showAllFriendsHandler = async () => {
    fetch("/api/users/all")
    .then((response) => {
        if (response.ok) {document.location.replace('/api/users/all')}   
    })
    .catch((err) => { console.log(err) });
};


// Following button functionality
const followingHandler = async (event) => {
  console.log(event.user_id) ; 

    if (event) {
      const response = await fetch(`/follow`, {
        method: 'POST',
        body: JSON.stringify({ followee_id: event.user_id, followee_name: event.user_name, profile_picture: event.profile_picture }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log('User is followed');
        let followee = await response.json();

        console.log(followee[0].followee_name);
        alert(`${followee[0].followee_name} is followed`);
      } else {
        alert('Failed to follow user');
      }
    }
  };

  
  document.querySelector('#all-users').addEventListener('click', showAllFriendsHandler);
