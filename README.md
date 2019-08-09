# IHG
NUS IHG Website AY19/20

### Installing dependencies for project
At root folder, run `npm i` to install the dependencies. `cd` to **/frontend** and run `npm i` again.

### Running the project
At root folder, run `nodemon`. Using another terminal, `cd` to **/frontend** and run `npm start`

### Setting up database
1. Go to https://www.mongodb.com/download-center/community to download (MSI) & install MongoDB Community Server. 
2. For installation setup, make sure to check the *Install MongoDB as A Service* box and select *Run service as Network Service User*.
3. Uncheck the *Install MongoDB Compass* box (as it runs into error for some users)
4. Search on your window for environment variables setup. Click on environment variables. Add **C:\Program Files\MongoDB\Server\4.0\bin** to `PATH` under system variables.
5. At your C: drive, add a folder named **data**.
6. In the data folder, create another folder named **db**.
7. Open your terminal and run `mongod` and check that the connection is established. Look out for the line *"waiting for connection on port 27017"*
8. Go to https://www.mongodb.com/download-center/compass to manually download MongoDB Compass and install.
9. Open MongoDB Compass and connect with the default settings.
10. Create a database named **ihg**. 
11. Enter **schedules** as collection name if required to. (optional)

