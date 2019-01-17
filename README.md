# MuQuiz

MuQuiz is a web application created as a final project at Academy, a part of Academic Work, 
in January 2019 by [Fredrik Jäderland](https://github.com/Freddeeeee), [Natalie Barbour](https://github.com/natalie-barbour), [Nils Nyman](https://github.com/nilnym) and [Scharolta Siencnik](https://github.com/scharolta).

### What is MuQuiz?
MuQuiz is a web application to play the music intro game. 
A game leader starts a session which other players can join on their devices. 
The game leader then plays the intro of a song and the participants guess what song is being played.
MuQuiz chooses the songs and questions, plays the music and
keeps track of points so that you can focus on having fun!

This game was developed using primarily ASP.Net Core 2.2, Entity Framework Core, SignalR and the Spotify Web Playback SDK. 

### How to use?
To run it locally you will need to
- configure the database
- configure the Spotify Web Playback SDK

*Note: You will also need a Spotify Premium account.*

##### Configure the database
We use database tables both to authenticate the webhost and an admin role and
to keep track of our game sessions, players, songs as well as answer alternatives.
We are currently not implementing the option to enter different question types but think this could be fun to explore. To get started we suggest you create tables using 
the SQL commands below and include your database connection string in the appsettings.json file (or as a secret) as below.

```
  "ConnectionStrings": {
    "MuQuizConnString": "YOURCONNECTIONSTRING"
  },
```

###### Create identity tables
This should all be fairly straightforward and is already configured with MyIdentityContext. See the [Microsoft documentation](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-2.2&tabs=visual-studio) for further information.

###### Create all other tables
Replace `schema` in the commands below and add fun songs and answer alternatives (we've given you three examples). The SpotifyId is a code in the following format: `6nLvaCZFR1wEzW3sIKpsnr`.
 
```
CREATE TABLE [schema].[Song] (
    [ID]        INT           IDENTITY NOT NULL,
    [SpotifyID] NVARCHAR (32) NOT NULL,
    [SongName]  NVARCHAR (64) NOT NULL,
    [Artist]    NVARCHAR (64) NOT NULL,
    [Year]      INT           NOT NULL
);

CREATE TABLE [schema].[Question] (
    [ID]            INT           IDENTITY NOT NULL,
    [SongID]        INT           REFERENCES schema.Song(ID)	NOT NULL,
    [CorrectAnswer] NVARCHAR (64) NOT NULL,
    [Answer1]       NVARCHAR (64) NOT NULL,
    [Answer2]       NVARCHAR (64) NOT NULL,
    [Answer3]       NVARCHAR (64) NOT NULL,
    [QuestionType]  INT           NOT NULL
);

CREATE TABLE [schema].[GameSession] (
    [ID]               INT          IDENTITY NOT NULL,
    [GameID]           VARCHAR (8)  NOT NULL,
    [IsPlaying]        BIT          NOT NULL,
    [HostConnectionID] VARCHAR (32) NULL
);

CREATE TABLE [schema].[Player] (
    [ID]            INT           IDENTITY NOT NULL,
    [Name]          NVARCHAR (32) NOT NULL,
    [ConnectionID]  VARCHAR (32)  NOT NULL,
    [Score]         INT           NOT NULL,
    [GameSessionID] INT           REFERENCES schema.GameSession(ID)	NOT NULL,
    [AvatarCode]    VARCHAR (16)  NULL
);

INSERT INTO [schema].[Song] ([SpotifyID], [SongName], [Artist], [Year]) 
VALUES ('3XVozq1aeqsJwpXrEZrDJ9', 'Ice Ice Baby', 'Vanilla Ice', 1989),
	('4h8VwCb1MTGoLKueQ1WgbD', 'Wake Me Up', 'Avicii', 2013),
	('2TxCwUlqaOH3TIyJqGgR91', 'Mamma Mia', 'ABBA', 1975)

INSERT INTO [schema].[Question] ([SongID], [CorrectAnswer], [Answer1], [Answer2], [Answer3], [QuestionType]) 
VALUES (KEYINSONGTABLE, 'Vanilla Ice - Ice Ice Baby', 'Queen - Under Pressure', 'Vanilla Vice - Ice Baby', 'Queen - Pressure', 1),
	(KEYINSONGTABLE, 'Avicii - Wake Me Up', 'Avicii - Waiting For Love', 'Avicii - Levels', 'Avicii - Hey Brother', 1),
	(KEYINSONGTABLE, 'ABBA - Mamma Mia', 'ABBA - Dancing Queen', 'ABBA - The Winner Takes It All', 'ABBA - Waterloo', 1)
```

##### Configure the Spotify Web Playback SDK
For this application to run you will need to add the following to application.json (or again as a secret).

```
  "Spotify": {
    "ClientId": "YOURCLIENTID",
    "ClientSecret": "YOURCLIENTSECRET",
    "RefreshToken": "GENERATEDREFRESHTOKEN",
    "ReturnURL": "RETURNURL"
  }
```

To achieve this first login on the [Spotify developer page](https://developer.spotify.com/dashboard/) and add an application. There you will find your client ID and your client secret.

Next, we have built a [simple application](https://github.com/nilnym/SpotifyAuthCode) to help you generate the refreshable Spotify token. We are using Spotify's authorization code flow. See the [Spotify documentation](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow) for more info.

###### Good luck testing and please get in touch if you develop our code and make our project even more fun.

### License
MIT © Fredrik Jäderland, Natalie Barbour, Nils Nyman and Scharolta Siencnik
