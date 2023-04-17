# Hangman Game with React & Redux Toolkit

[Play it live!](https://dino-game-guesting.onrender.com/)

![Screenshot](./front-end/src/assets/dino_screenshot_small.png)

A simple Hangman-inspired game, except it's dinosaur vs. meteor. The game allows the user to guess a randomly generated word by entering letters one at a time. The user has a limited number of incorrect guesses, and each incorrect guess adds a part to a hangman figure. The game is won by guessing the word before the hangman is fully drawn, or lost by making too many incorrect guesses.

## Reference:

1. We are using [this concept introduced by freecodecamp.org](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/)

## Technologies

|                  | Technology                                  |
| ---------------- | ------------------------------------------- |
| Front_End        | React, Typescript, Bootstrap                |
| Back_End         | Express/Node, Typescript                    |
| State Management | Redux Tool Kit                              |
| UI               | Figma, Adobe Illustrator                    |
| Tesing           | Jest, Postman for backend                   |
| Authentication   | Firebase Authentication vs Context provider |
| DataBase         | Firebase                                    |

## CLI:

1. Install all dependencies

```
npm run install:All
```

2. Run backend development mode

```
npm run backendDev
```

3. Run the app

```
npm run startall
```

4. Build the app

```
npm run buildall
```

5. Testing

```
cd back-end && npm run test

```

## Features

1. Word is randomly generated from many categories.
2. Player can choose to play all categories to get 2 point per completed round, or play a specific category and get 1 point per round.
3. Hint feature: player can click any unopened letter to show it, which deducts 1 point from the user's score.
4. With each incorrect guess the meteor gets closer and closer to the ground. When it hits the ground, dino dies and the game is over 😢
5. Player can see leaderboard of all players' scores.
6. Player can store their score and join the leaderboard by logging in / signing up.

## Getting Started

1. Clone the repository: git clone https://github.com/TuanDao-0110/Hang_Man_Game.git
2. Install dependencies: npm install or yarn install
3. Run the app: npm run startall
4. Open your browser to http://localhost:3000 to play the game.

## Contributing

This project is contributed by:

| Name             | GitHub Address               |
| ---------------- | ---------------------------- |
| Valeria Vagapova | https://github.com/pixelsnow |
| Eyvaz Alishov    | https://github.com/CodeLaMat |

# Back End router

## Testing document API:

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

- Welcome Page
  - Method
    ```
    POST / HTTP/1.1
    Host: localhost:4000
    Content-Type: text/html; charset=utf-8
    ```
  - Request Body
  - Response Body
    ```
    {
    statuscode:200
    text: welcome  to our hang man game
    }
    ```
- Word Router

  - Method GET all word
    ```
    GET /api/word HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    ```
  - Request Body
  - Response Body

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

  - Method GET word by level
    ```
    GET /api/word/:level HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    ```
  - Request Body
  - Response Body
    ```
    {
    statusCode:200,
    "result": [ "supperhard","newword"]
    }
    ```
  - Method POST new word
    ```
    POST /api/word/:level HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    ```
  - Request Body
    ```
    {
      newword:'newword',
      level:'hard'
    }
    ```
    - Response Body
    ```
    {
    statusCode:201,
    msg: add success
    }
    ```

- User Router

  - Method Post new score

  ```
    POST /api/user/ HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Authorization: 'Bearer ${token}'
  ```

  - Request Body
    ```
    {
    score:100
    }
    ```
  - Response Body
    ```
    {
    statusCode:201,
    msg: add success
    }
    ```
  - Method GET all score
    ```
    GET /api/user/ HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Authorization: 'Bearer ${token}'
    ```
  - Request Body
  - Response Body
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
  - Method GET score by user uid
    ```
    GET /api/user/:uid HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Authorization: 'Bearer ${token}'
    ```
  - Request Body

  - Response Body

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

## License

This project is licensed under the MIT License. See LICENSE for more information.
