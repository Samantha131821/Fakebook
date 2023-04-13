const showAllFriendsHandler = async () => {
    fetch("/api/users/all")
    .then((response) => {
        if (response.ok) {document.location.replace('/api/users/all')}   
    })
    .catch((err) => { console.log(err) });
};

document.querySelector('#all-users').addEventListener('click', showAllFriendsHandler);