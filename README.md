# About Project

# About npm's

### In order to avoid restarting of the server nodemon module is used in the project

1. nodemon(to run use the given command) - npm run watch
2. watch script added into the package.json
3. watch is the script name given to nodemon.

## Backend

1. Creation of DataBase if doesn't exists. (database/database)
2. Connecting to the Created DataBase. (database/database)
3. Three Tables creation if doesn't exists. (js/models)
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
   1. Fetches Email id when the user login to the account.
   2. Fetching the provided field from the browser.
   3. Update the table with the fetched table.
   4. Redirect to home, along with fetching the updated question to the home page.
7. Answer Update (app.js)
   1. Fetches Email id when the user login to the account.
   2. Fetches the question id when a question is searched.
   3. Accepts the answer from the entered field.
   4. Updates the table by questionId, answer, and email.
8. Search Field (app.js)
   1. Fetches Email id When user logins.
   2. Question is fetched from the search bar.
   3. Searching for the question in DataBase.
   4. If question is present then, will fetch question along with questionId.
   5. querying answer table using questionId , if at all answers w.r.t that questionId then fetch.
   6. Sending the fetched data to the browser(Home page).
9. About page (app.js)
   1. It is a static page containing about it's featuring products.
