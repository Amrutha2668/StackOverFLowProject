# About Project

# About npm's

### In order to avoid restarting of the server nodemon module is used in the project

1. nodemon(to run use the given command) - npm run watch
2. watch script added into the package.json
3. watch is the script name given to nodemon.

## Backend

1. Creation of DataBase if doesn't exists. (database/database)
2. Connecting to the Created DataBase. (database/database)
3. Tables creation if doesn't exists. (js/models)
4. SignUp (app.js)
   1. Fetching data from sign-up page.
   2. Ensuring the uniqueness of the Email id.
   3. Updating that values to table.
   4. If already exists redirecting to the login page.
5. Login (app.js)
   1. Fetching data from Login-in page.
   2. Checking if the email and password matches.
   3. If matches then redirect that to home page.
   4. If not redirect to login page again.
6. Questions Update (app.js)
   1. Fetching the provided field from the browser.
   2. Update the table with the fetched table.
   3. Redirect to home, along with fetching the updated question to the home page.
7. For Merge conflict.
