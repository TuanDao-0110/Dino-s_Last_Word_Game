# Hangman Game with React & Redux Toolkit

This is a Hangman game built with React and Redux Toolkit. The game allows the user to guess a randomly generated word by entering letters one at a time. The user has a limited number of incorrect guesses, and each incorrect guess adds a part to a hangman figure. The game is won by guessing the word before the hangman is fully drawn, or lost by making too many incorrect guesses.

## Reference: 

1. we using concept introducted by "freecodecamp.org". 
https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

## Technologies

|  | Technology |
|------|----------------|
| Front_End | React Typescript|
| State Management | Redux Tool Kit |
| UI | Figma, |
| Tesing | Jest, |

## CLI: 

1. run install main folder
```
npm i
```
2. run install all back-end front-end
```
npm run installAll
```
3. 

## Features
1. Randomly generated word for each game
2. Keeps track of correct and incorrect guesses
3. Displays hangman figure as incorrect guesses are made
4. Shows a win or loss message at the end of the game
## Getting Started
1. Clone the repository: git clone https://github.com/TuanDao-0110/Hang_Man_Game.git
2. Install dependencies: npm install or yarn install
3. Start the development server: npm start or yarn start
4. Open your browser to http://localhost:3000 to play the game.
## Contributing

This project is contributed by: 


| Name | GitHub Address |
|------|----------------|
| Valeria | https://github.com/pixelsnow |
| Eyvaz Alishov | https://github.com/CodeLaMat |


## Back End router: 
# Testing document API: 

https://documenter.getpostman.com/view/19888757/2s93JtR3uK#5877637a-3b0c-4673-87d8-962edb4f5a19 

```mermaid
graph LR;
  A[Express.js] --> B[CORS] --> C[Body Parser] --> D[Morgan] --> E[Static Files];
  A[Express.js] --> F[Welcome Router];
  A[Express.js] --> G[Word Router];
  A[Express.js] --> H[User Router];
  A[Express.js] --> I[Unknown Endpoint];
  A[Express.js] --> J[Error Handler];
  G --> GA[getALlWord];
  G --> GB[getWordBaseOnLevel];
  G --> GC[postNewWord];
  H --> HA[postingNewScore];
  H --> HB[getAllScore];
  H --> HC[getUserScore];

```

## API Examples: 

* Welcome Page 
  * Method
    ```
    POST / HTTP/1.1 
    Host: localhost:4000
    Content-Type: text/html; charset=utf-8
    ```
  * Request Body
  * Response Body
    ```
    {
    statuscode:200
    text: welcome  to our hang man game
    }
    ```
* Word Router
  * Method GET all word
    ```
    GET /api/word HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    ```
  * Request Body
  * Response Body
    ```
    {
    statusCode:200,  
    "result": {
        "easy": [
            "easyword"
        ],
        "hard": [
            "supperhard",
            "newword"
        ],
        "medium": [
            "mediumword"
        ]
    
      }
    }
    ```
  * Method GET word by level
    ```
    GET /api/word/:level HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    ```
  * Request Body
  * Response Body
    ```
    {
    statusCode:200,  
    "result": [ "supperhard","newword"]
    }
    ```
  * Method POST new word
    ```
    POST /api/word/:level HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    ```
  * Request Body
    ```
    {
      newword:'newword',
      level:'hard'
    }
    ```
    * Response Body
    ```
    {
    statusCode:201,  
   msg: add success
    }
    ```
* User Router 
  * Method Post new score
  ```
    POST /api/user/ HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Authorization: 'Bearer ${token}'
    ```
  * Request Body
    ```
    {
    score:100
    }
    ```
  * Response Body
    ```
    {
    statusCode:201,  
   msg: add success
    }
    ```
  * Method GET all score 
    ```
    GET /api/user/ HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Authorization: 'Bearer ${token}'
    ```
  * Request Body
  * Response Body
    ```
    {
    statusCode:200 
    result { 
      fowjfiewfijfowijf_uid:[
        {
          score:2424
          timeStamps:242042048
        },
         {
          score:2424
          timeStamps:242042048
        }
      ],
      2408jc2084hr2309d_uid:[
        {
          score:2424
          timeStamps:242042048
        },
         {
          score:2424
          timeStamps:242042048
        }
      ]
    }
    }
    ```
  * Method GET score by user uid
    ```
    GET /api/user/:uid HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Authorization: 'Bearer ${token}'
    ```
  * Request Body
  
  * Response Body

    ```
    {
    statusCode:200 
    scoreData:[
      {
        score:100,
        timeStamps:402422042
      },
      {
        score:100,
        timeStamps:402422042
      }
    ]
    userInfo:{
      name:
    }
    }
    ```


License
This project is licensed under the MIT License. See LICENSE for more information.




# game play : 

1. player can register or login, 
2. game can play until user lose, require login/register, to store the score. 
3. game rule: 
  3.1 player win then move to next round, next round's word not duplicate/same to previous rounds. (use localstore)
  3.2 player can choose specific category to play, each time win play got 1 point
  3.3 player can choose play all kind of category, each time win play got 2 point, in case player stuck, they can get hint by show what kind of category right now, by that each time win play got 1 point
4. leaderboard is
  4.1 a place where user can see their score position
  4.2 leader board is display during the game, no matter user already login/register or not. 
