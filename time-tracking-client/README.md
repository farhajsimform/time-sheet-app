
# Time Tracker Web Application

This is frontend of time tracker application

https://drive.google.com/file/d/1pu7KD_utpLHTp9tXAr8_eSy1g6oYhthx/view

Video Demo : https://drive.google.com/file/d/1mcyCPkpjXZhINjTWN95wATiEWc_5hI-k/view?usp=share_link

# Steps to run the application

1.  Clone the Repo from url this https://github.com/farhajsimform/time-sheet-app.git
and switch into the `/time-tracking-client`

```bash
git clone https://github.com/farhajsimform/time-sheet-app.git
```

2.  Switch into the project directory `/time-tracking-client` and follow below commands

Prerequisites: Please try to do setup and start the backend server https://github.com/farhajsimform/time-sheet-app/tree/main/time-tracking-server

3.  Run below commands

```bash
npm install
```

Before running the npm start make sure you create the .env file in project root directory and paste content from .env.example file and update
the Base url of backend server

sample .env.local

```env
REACT_APP_API_URL = 'http://localhost:8080'
```

4. Run project using npm run start

```bash
npm start
```

5.  The project will run on localhost:3000, Go to http://localhost:3000 on your browser

```javascript
Login credentials :-
Admin credentials :-
username: testadmin
password: testadmin
username: testadmin1
password: testadmin1
User creds:
username: testuser
password: testuser
username: testuse1
password: testuse1
username: testuse2
password: testuse2
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run lint:fix`

Using this command you can find lint issues and fix problems with JavaScript code

### `npm run prettier:fix`

Using this command you can fix the code format.