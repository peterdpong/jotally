# Jotally
A note taking web app. Frontend build on React, and Backend build on Node, Express, and MongoDB.


### Deployed Example
[View Live on Heroku](http://jotally.herokuapp.com/)

> Currently missing some features as working on refactoring.

### Frontend
Run ```npm install``` to download dependencies before running

To launch, run following ```npm start``` in root of project. 
This runs the React app in development mode, viewable at [http://localhost:3000](http://localhost:3000).
Frontend tests written using Jest and Cypress for E2E Testing.

To build a production app, run ```npm run build```. This will create a production app in the ```build``` folder.

### Backend
Run ```npm install``` to download dependencies before running
To launch in dev state ```npm run dev``` in root. (Mimics database use Nodemon)
MongoDB URI is configured in a .env file.

