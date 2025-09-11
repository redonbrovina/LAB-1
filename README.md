# LAB-1



Before running server and/or client there are a few steps that need to be completed. Follow instructions for database implementation as well.



### DATABASE --- Ignore for Now



In the documentation you will find Shneta.sql which is the script you can use to create the current version of the Shneta database on your own devices. Each personal device serves as a database server.



Before running server, both the .net commands and the database you must set the connection string for the database. This can be changed for each person in Backend/Shneta.API/appsettings.json



"DefaultConnection": "Server=LAPTOPHOQ77UM1;Database=Shneta;Trusted\_Connection=True;TrustServerCertificate=True;"



You can find your own server name using:



sqlcmd -L





WARNING: You need to have SQL SERVER MANAGEMENT STUDIO (SSMS)

The Shneta database is not automatically in your devices. You need to actually run the script to create it in order to use it. If you don't know how to run the script you can use a database name that you currently have on your device in order for the server to run successfully.



The server does not run without the proper connection string.





### Server



1. Before starting the run on the server, check if you have dotnet installed in your CLI:



dotnet --version



If you do not you will need to install the .NET 9.0 SDK (https://dotnet.microsoft.com/en-us/download)

After intstall check with the previous command if dotnet was installed successfully.



2\. Check to see that you are in the project root (LAB-1) and navigate to Backend:



cd Backend



3\. Then run to restore project dependencies for .NET:



dotnet restore



4\. To run only server go:



dotnet watch run --project Shneta.API/





Note: Only after you first pull commits do you need to run dotnet restore. After installing dependencies, you can run the server whenever you want.





### Client



Before running the client application always install dependencies in the LAB-1/ folder using the following command in the command prompt/terminal:



1. First check that you are in the project root and navigate to frontend:



cd Frontend



2\. Then install dependencies using:



npm install



3\. To run only the client:



npm run dev





### CLIENT AND SERVER RUN



To run both client and server you need to be on the main directory (LAB-1) and type the following commands:



1. npm install



2\. npm start





npm start will run both server and client concurrently. To run npm start, please check that you have installed dependencies on both the server and the client.







Note: Same as the Server, only after pulling commits do you need to run npm install. After installing dependencies you can run the client application whenever you want.

