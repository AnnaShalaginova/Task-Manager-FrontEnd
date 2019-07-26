
# WELCOME TO FUN TASK MANAGER

# About the app

The app allows users to view all tasks. Signed in users can create tasks, edit tasks and delete tasks. Ruby on Rails powers the app on the back end. The front end is built in React with the help of Bootstrap.

How the app works:

 1. Sign up with fake email and password
 2. Sign in with created email and password
 3. Change password
 4. Create a task
 5. Edit a task
 6. Delete a task
 7. Sign out
 8. View all tasks at any point

# User Stories

 1. As an unregistered user, I would like to sign up with email and password.
 2. As a registered user, I would like to sign in with email and password.
 3. As a signed in user, I would like to change password.
 4. As a signed in user, I would like to sign out.
 5. As a signed in user, I would like to create a task.
 6. As a signed in user, I would like to update tasks that I own.
 7. As a signed in user, I would like to delete tasks that I own.
 8. As any user, I would like to view all tasks.

# ERD Diagram [here](https://drive.google.com/file/d/1IgkqNm8ascZDetzq0V2oO9RfljGVpN1Q/view)

# Wireframe [here](https://drive.google.com/file/d/1x9DtJ74TjZMbjc9DE9rHHxAIK7LZu1j7/view)

# Front-end Repo https://github.com/AnnaShalaginova/Task-Manager-FrontEnd

# Back-end Repo https://github.com/AnnaShalaginova/TaskManager-BackEnd

# Deployed Front-end Site 
https://annashalaginova.github.io/Task-Manager-FrontEnd/

# Deployed Back-end Site
https://git.heroku.com/fun-task-manager.git

# Technologies Used

**Front End** React, JSX, Bootstrap, Javascript, CSS 

**Back End** Postgres, Ruby on Rails

# Planning, Process and Problem Solving

The planning process involved wire framing for the front-end and drawing an ER Diagram (one to many relationship) on the back-end. The back end (Ruby on Rails) was set up and tested first. Then work began on the front-end: carving out React components and user flows. 

The development process focused on one feature or update at a time, thorough testing on localhost and remote. The browser console and server logs were leveraged during the troubleshooting and debugging process. If tackling a specific problem took more than half an hour, the developer approached her colleagues and consultants. All issues were thoroughly documented in the issue queue. 

# Unresolved Issues

On the back end I have job title, department, first name and last name as additional fields for the user. I will need to incorporate that into the front end in future iterations.

Also, in the next post-MVP sprint, the Tasks resource will be linked to Projects resource. The Projects resource will need to be created. One project will have many tasks. One task will only belong to one project. 

# Set Up and Installation

Sign up to be able to edit and update tasks.
