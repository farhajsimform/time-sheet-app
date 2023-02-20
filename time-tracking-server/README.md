# Time Tracker Application Backend

This is backend for time tracker application.

https://drive.google.com/file/d/1pu7KD_utpLHTp9tXAr8_eSy1g6oYhthx/view

Video Demo : https://drive.google.com/file/d/1krB7bmnFeE59TQvF9J8q_7b3CdqQUOMj/view?usp=share_link

## Steps to run the backend server

1. clone the repo from url https://github.com/farhajsimform/time-sheet-app after cloning repo 
switch into the /time-tracking-server directory and then start the below process


   ```bash
       git clone https://github.com/farhajsimform/time-sheet-app
   ```

2. After switching into project directory and run npm install command

   ```bash
       npm install
   ```

3. First setup or install mysql database on your local machine and then create .env file in the root project directory 

   ```env
   NODE_ENV= "development"
   # Database name is required before running migrations and seeding data
    PORT = 8080
    SECRET = '$$jshjkdsjdjk'
   ```

4. After adding the credentials in .env run the migrations and seed data using below commands

   ```bash
   // Below command will run the migrations and create database tables for you
   npm run run:mig
   // Below command will run the seeds and fill the basic data in the database
   npm run run:seed
   ```

5. After running above commands successfully you can start the server using below commands

   ```bash
   npm start
   ```

  After running all above commands server will running on http://localhost:8080 

