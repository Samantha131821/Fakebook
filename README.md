# Fakebook

The purpose of this project was to create an application where users can create a new profile, create posts on their profile, and view other users profiles and posts.  

## User Stories

* As a user, I want to be able to create an account.

* As a registered user, I want to create posts and view other users profiles and posts.

### Acceptance Criteria

* It's done when the `/` homepage route renders an option to login or signup.

* It's done when the `/login` route renders a form to log in and a form to create a new account.

* It's done when an existing user can enter their credentials on the login page to create a session on the server.

* It's done when a new user can create an account on the login page and then be immediately logged in with a session.

* It's done when the `/profile` route renders the logged-in user's profile and a form to create a new post.

* It's done when only a logged in user can visit the `/profile` route.

* It's done when a logged in user is redirected to `/profile` when they try to visit `/login` again.

* It's done when a user on the profile page can use the form to create a new post in the database.

* It's done when a user on the profile page can select a "Delete" button to remove their post from the database.

* It's done when a logged-in user can select a "Logout" button to remove their session.

* It's done when the session for a logged-in user expires after a set time.

* It's done when the API routes to create and delete posts are protected from non logged-in users.

## Specifications 

* The database models have the following fields and associations:

  * `User`

    * `id`: primary key

    * `name`

    * `email`

    * `password`

 * Users have many posts, and posts belong to a user.

    * If a user is deleted, all associated posts are also deleted.