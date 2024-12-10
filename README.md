# startup: idea-thing
## Startup Application for CS260: Web Development
## WEBSOCKET
To facilitate creativity and connection between users, we have enabled the prompt feature. Located on your accounts page you will find a prompt to answer, and upon answering it, you may submit your response to be seen by all users. You can also see the responses of other users in real time with a simple push of a button. Happy ideating!

## LOGIN
All of your data is now safely stored in our database, so you don't need to worry about losing it. It will be right there waiting for you when you get back.

## SERVICE
We now have endpoints for:
- Logging in!
- Logging out!
- Creating user!
- Getting a user's projects!
- Getting a user's friends!
- Updating a user's projects!
- Updating a user's friends!
#### But wait - there's more...
Once you log in and navigate to the Account Page, you can get random character ideas, courtesy of the [Fantasy Roleplaying API](https://www.freepublicapis.com/fantasy-role-playing-api). Try it out and see what you find!

## REACT
This just in: you can now create projects, delete projects, add cards, edit cards, delete cards, change shared lists and friend lists. You can even log in! This and more due to the wonderful world of React. See [startup.idea-thing.click](https://startup.idea-thing.click/) for further details.

## CSS
Now includes an organized header and navigation bar, responsive design on all pages, organization of projects and cards into grids, and more! Friends lists, tags lists, and an input field on the card edit page that grows as you type. See [startup.idea-thing.click](https://startup.idea-thing.click/) for further details.

## HTML
Now includes a login page, a home page, a project page, a card page, and a card-edit page in HTML. The home page includes a friends section and a list of projects. I also put a menu for updating the user's profile picture, which is where the API connection to random animal pictures will be. This menu is hidden by default but you can see it in the HTML for the home page header. See [startup.idea-thing.click](https://startup.idea-thing.click/) for further details.

## Pitch
Idea-thing is a tool to help story creators organize ideas. Create character, item, or place cards, connect them with tags and add them to projects! Share your projects with your friends to build ideas together.
Soon to be hosted at [startup.idea-thing.click](https://startup.idea-thing.click/).

### Key Features
Key features of idea-thing include:
- Ability to create projects and cards.
- Ability to edit, update, and delete projects and cards.
- Ability to friend other users and share projects with them.

### Technology
Idea-thing will implement the following technologies:
- **HTML:** For correct structure for login page, homepage, project and card pages.
- **CSS:** For styling, colors, fonts, and icons within the application.
- **Javascript/React:** To allow the user to login, add projects/cards, edit current projects/cards, delete projects/cards, and more.
- **Service:** Will include endpoints for:
  - saving changes to projects/cards
  - retrieving the projects/cards belonging to a user
  - retrieving random animal pictures for the user avatars using public APIs 
- **Authentication:** The user will login to access their projects/cards, ensuring only those with permission will be able to view and edit them.
- **Database:** Authentication data for users, project and card data, friend lists, and more will be stored on the database.
- **WebSocket:** Users can make friend connections with other users and share their projects with their friends. Changes that friends make to a shared project will be visible to the user in real time.

### Preliminary Design
![design docs for idea-thing, including a sketch of a projects page, a page for a specific project showing all the cards within the project, and a page for a specific card](startup-prelim-design.png) From left to right: The home page, featuring a list of the user's projects; a sample project page featuring the cards within a project; a sample card page for a character card.
