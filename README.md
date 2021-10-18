# Welcome to gravy-n-curds!

gravy-n-curds is a web application that allows users to view poutine dish options and see what others thought about them. User can also check-in and rate poutine dishes so they can remember what they have tried and what they thought of it. This project is inspired by [Untappd](https://untappd.com/), a website where individuals can search for beer, check-in and leave reviews on beer they try and unlock acheivements by trying new and different beer styles.

<p align="center">
  <img src="https://github.com/verykenny/gravy-n-curds/blob/main/planning/gravyncurds.png" alt="gravy and curds home page">
</p>



#### Live link: [gravy-n-curds](https://gravy-n-curds.herokuapp.com/)
***

### Index
[Launch](#launch)

[Technologies](#technologies)

[Key Features](#key-features)

[Code Snippets](#code-snippets)

[Wiki Pages](#wiki-pages)

[Future Goals](#future-goals)

***

### Launch
- You can read more about the project using the wiki located at: https://github.com/verykenny/gravy-n-curds/wiki
- To start a development environment:
  - Clone the repository at: https://github.com/verykenny/gravy-n-curds
  - Install front-end locally using npm from the frontend directory:
    ```
    npm install
    npm start
    ```
  - Install back-end locally using npm from the backend directory:
    ```
    npm install
    npm start development
    ```
  - Navigate to the localhost port specified in the frontend console output (e.g. http://localhost:3000)


### Technologies
#### Front End
- JavaScript
- React-Redux
- CSS styling
- [Favicon.io](https://favicon.io/) for favicon
- Heroku (Hosting)

#### Back End
- Express.js
- PostgreSQL (Database)
- Sequelize.js
- AJAX
- Express Validator Library
- CSURF Library

***

### Key Features

- Users can check-in, rate, and leave comments on poutine dishes that they try.

<p align="center">
  <img src="https://github.com/verykenny/gravy-n-curds/blob/main/planning/gravyncurds_checkin.gif?raw=true" alt="gravy and curds check in and comment">
</p>


- User profile page allows users to keep track of their favorite poutines by reviewing their past checkins, editing them and deleting them.

<p align="center">
  <img src="https://github.com/verykenny/gravy-n-curds/blob/main/planning/gravyncurds_profile.png" alt="gravy and curds profile page">
</p>

- Top ranking poutine dishes can be found on the Top Rated page where users can easily check-in for dishes or review possible dishes to try.

<p align="center">
  <img src="https://github.com/verykenny/gravy-n-curds/blob/main/planning/gravyncurds_top.png?raw=true" alt="gravy and curds top rated dishes page">
</p>

- Bcryptjs library to secure authentication (w/ Demo User) to ensure user security
- CSRUF library used to prevent csrf attacks
- Session cookies used to authorize users when displaying check-in buttons and profile option.

***

### Code Snippets
#### Example 1

Route with authorization and form input validation middleware to confirm if user is allowed to make the update and to confirm that the information provided to update the check-in is valid. Eager loading when querying the object to be updated allows the Redux state to be updated with the required poutine and store information when the object is returned as a json string:

````javascript
router.put('/:checkinId(\\d+)', requireAuth, validateCheckin, asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const checkinId = Number(req.params.checkinId);
    const userId = req.user.id;

    const checkin = await Checkin.findByPk(checkinId, {
        include: {
            model: Poutine,
            include: Store
        }
    });

    if (userId !== checkin.userId) return res.json({ message: 'unauthorized' })

    checkin.comment = comment;
    checkin.rating = rating;
    await checkin.save();

    res.json({ checkin });
}))
````

***

### Wiki Pages
#### [API Documentation](https://github.com/verykenny/gravy-n-curds/wiki/API-Route-Documentation)
#### [Database Schema](https://github.com/verykenny/gravy-n-curds/wiki/Database-Schema)
<img src="https://github.com/verykenny/gravy-n-curds/blob/main/planning/database-schema.png?raw=true" alt="database-schema.png" height="300">

#### [Feature List](https://github.com/verykenny/gravy-n-curds/wiki/Feature-List)
#### [Frontend Routes](https://github.com/verykenny/gravy-n-curds/wiki/Front-End-Routes)
#### [User Stories](https://github.com/verykenny/gravy-n-curds/wiki/User-Stories)

***

### Future Goals
- Badges
- Search
- Google Maps API
