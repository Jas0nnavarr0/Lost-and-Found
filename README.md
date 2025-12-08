# lost-found
    Lost and found webapp for SJSU
Full-stack software engineering project implementing a lost and found management system. Demonstrates system design, REST APIs, database modeling, authentication, and item-claim workflows.

# Warning

Because there were merge conflicts that were really difficult to resolve, the features may have to be tested in different branches. 
* For the main functionality with creating posts and starting conversations: messaging-wo-websocket branch
* For moderator dashboard and reporting: reporting branch
* For filtering and searching functionality: main branch

# Admin Testing 
There is a default admin account created that can be used for testing purposes
* username: main_admin
* password: password

# Instructions 

Make sure you 'git clone' this project in your desired directory

## Database 

* Install postgresql and pg admin
* For windows: https://www.postgresql.org/download/windows/
* For mac: https://www.postgresql.org/download/macosx/
* Click download the appropriate installer
* Go through installation steps
    * When selecting components, default installations should be sufficient
    * Set a password that you can remember easily. When running the backend, you must use this password
    * Make sure you use the default port (5432)
* Launch pg admin
* Open this directory
* <img width="217" height="75" alt="image" src="https://github.com/user-attachments/assets/dfc0b1e8-d5cf-49a1-b2ac-58e9ce130666" />
* <img width="568" height="156" alt="image" src="https://github.com/user-attachments/assets/57c4882d-ff99-4735-822b-a9dafdc150f6" />
* Name the database exactly as "lostnfound"

## Backend

* Launch the backend using intellij. Open the directory 'backend' using intellij
* You must setup a custom configuration for running BackendApplication.java
  * Open BackendApplication.java on intellij
  * <img width="348" height="126" alt="image" src="https://github.com/user-attachments/assets/89340023-5750-4a07-a186-f5048dc3f2c9" />
  * Click on the three dots and click edit to make a custom configuration
  * CLI Arguments: --spring.profiles.active=dev
  * DB_PASSWORD=same_password_as_postgres_password;JWT_SECRET=b3c872977cb64c1da45a52b1814f1a78dfd1abe974988575cc35f0e1d9c28452d7755665
  * Run the backend using this configuration

## Frontend

* cd into the frontend directory on the terminal, then type in the command 'npm install'
* then run 'npm run dev'
* In your browser go to localhost:5173 to start testing

# Libraries used

* Backend
    * Spring WEB and JPA
    * Lombok
    * JsonWebToken
    * Spring security
    * Springdoc openapi
* Frontend
    * Tailwindcss
    * React hook forms
    * Redux
    * React router dom
