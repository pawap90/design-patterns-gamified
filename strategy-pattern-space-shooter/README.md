
Space shooter strategy is a tiny game designed to demonstrate the **strategy pattern**.

Move and shoot to prevent the asteroids from destroying your ship. 
Get upgrades for your ship's gun to help you destroy any asteroids that may hit you.

![The ship shooting asteroids](https://user-images.githubusercontent.com/2507959/161647393-177c8835-cecf-408c-9e76-375c9f053451.png)

**Table of contents**
- [The strategy pattern](#the-strategy-pattern)
- [The project](#the-project)
- [Dependencies](#dependencies)
- [Quick start](#quick-start)

# The strategy pattern
Let’s begin with a quick definition:

- The strategy pattern defines a set of **encapsulated and interchangeable algorithms**. 
- Each *algorithm* represents a **strategy**.
- All *strategies* can be used and interchanged **at runtime** by one or more **clients**.
- To make sure strategies are interchangeable, every one of them will have to **implement the same interface**.

![Strategy class diagram](https://user-images.githubusercontent.com/2507959/161648131-aabefb57-926d-46fb-b551-195240e75337.png)

So, in our example:

- **Each gun behavior** we defined (simple, double, bubble) is a **strategy**. So  we’ll encapsulate the behavior in a separate class.
- We’ll also have a `GunStrategy` **interface** that each gun will implement.
- Our `Ship` **class** will define a `gunStrategy` **field** where we can set the currently selected strategy.

![The ship shooting using different upgrades/strategies](https://user-images.githubusercontent.com/2507959/161646869-1b8ebd13-9225-4dab-95c3-c33d0be67620.png)



# The project

```
└───src/
    ├───game-objects/             Our game objects
    │   ├───Asteroid.ts             Handles the asteroids' texture and movement
    │   ├───Bullet.ts               Represents any type of bullet
    │   ├───GunUpgrade.ts           Represents upgrades for the gun
    │   └───ShipCharacter.ts        Our main character logic (movement, shooting, etc.)
    │
    ├───gun-strategy/             The strategies algorithms are implemented here
    │   ├───BubbleGun.ts            Strategy for the bubble gun
    │   ├───DoubleGun.ts            Strategy for the double gun
    │   ├───GunStrategy.ts          Strategy  interface
    │   └───SimpleGun.ts            Strategy for the simple gun (the default)
    │
    ├───scenes/                   The game's scenes
    │   ├───GameOverScene.ts        Scene that is displayed when the player gets hit
    │   ├───GameScene.ts            The game's main logic
    │   └───PreloaderScene.ts       Loader for the assets
    │
    └───Main.ts
```


# Dependencies
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

# Quick start

1. Navigate to this project's root folder:

```sh
cd strategy-pattern-space-shooter
```

2. Install dependencies: Run the following command:

```sh
npm install
```

3. Start the local development server: 

```sh
npm start
```

4. Go to your browser and navigate to http://localhost:8000. 

That's it! You should see the game running in your browser.

---

<br>

[![](https://i.imgur.com/40L9uPk.png)](https://paulasantamaria.com)

Let's connect!: [Instagram](https://www.instagram.com/pau.codes/) | [Twitch](https://www.twitch.tv/paulasantamaria) | [Twitter](https://twitter.com/pauxdsantamaria)
 
