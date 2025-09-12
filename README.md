# LAB-1





### Before Startup



To start up the application you need to first install Node (https://nodejs.org/en/download/)



The database is connected locally using XAMPP.

Start Apache and MYSQL from the XAMPP Control Panel.



After starting both up you will find in the /current\_database folder the database file (shneta.sql). You must import this database in phpMyAdmin in order for the database connection to be successful and the application to run.


For any changes made to the database, you must export and replace the current version of the database in the /current\_database folder.





------------------------------------------------------------------------------------------------------



### App Startup



To start up the application you must first install dependencies. Do this with the command:



npm install



To start up the actual application you use:



npm run dev





This command runs the server and the client concurrently. You can find details on how this works in the package.json file in the main directory under 'scripts'.



-------------------------------------------------------------------------------------------------------



### 

### General Information



The server runs on port 5000, while the client runs on port 5173 (vite default)

In \_documentation you will find the .drawio files for the erd and physical diagrams of the database.





















