# LAB-1



Before running server and/or client there are a few steps that need to be completed

Currently both need to be started up with different commands.



### Server



1. Before starting the run on the server, check if you have dotnet installed in your CLI:



dotnet --version



If you do not you will need to install the .NET 9.0 SDK (https://dotnet.microsoft.com/en-us/download)

After intstall check with the previous command if dotnet was installed successfully.



2\. Check to see that you are in the project root (LAB-1) and navigate to Backend:



cd Backend



3\. Then run to restore project dependencies for .NET:



dotnet restore



4\. Finally, to run the server:



dotnet run --project Shneta.API/





Note: Only after you first pull commits do you need to run dotnet restore. After installing dependencies, you can run the server whenever you want.





### Client



Before running the client application always install dependencies in the LAB-1/ folder using the following command in the command prompt/terminal:



1. First check that you are in the project root and navigate to frontend:



cd Frontend



2\. Then install dependencies using:



npm install



3\. To run the application:



npm run dev





Note: Same as the Server, only after pulling commits do you need to run npm install. After installing dependencies you can run the client application whenever you want.

