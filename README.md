# MuQuiz

MuQuiz is a web application created as a final project at Academy, a part of Academic Work, 
in January 2019 by Fredik Jäderland, Natalie Barbour, Nils Nyman and Scharolta Siencnik.

### What is Muquiz?
MuQuiz is a web application to play the music intro game. 
A game leader starts a session, which other players can join on their devices. 
The game leader then plays the intro of a song and the participants guess what song is being played. 
MuQuiz eliminates all the boring and time-consuming parts like preparing songs and questions, playing the music, 
keeping track of points, etc. so that you can focus on having fun! MuQuiz let's the game leader choose 
how many songs that the game will consist of, the rest is handled by MuQuiz.

This game was developed using primarily ASP.Net Core 2.2, Entity Framework Core and SignalR. 

### How to use?
We will be hosting it temporarily at https://muquiz.azurewebsites.net/.
To run it locally you will need to
- configure the database
- configure the Spotify API

##### Configure the database
We use database tables both to authenticate the webhost and an admin role and
to keep track of our game sessions, players, songs as well as answer alternatives.
Primarily in the answer alternatives there is scope for expansion, e.g. through different types
of questions (year only, artist only etc.). To get started we suggest you build tables using 
the SQL commands below and include your database connection string in the appsettings.json file
(or wherever else `Configuration.GetConnectionString` will find it).

##### Configure the Spotify API


### License
MIT © Fredik Jäderland, Natalie Barbour, Nils Nyman and Scharolta Siencnik
