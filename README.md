# 🐊 ZooKepper: The Rebel Bot 🐊

### Created by: [NABlackFox 🦊](https://github.com/NABlackFox)

## 🤖 About
🚀 **"ZooKepper: The Rebel Bot"** 🚀  
Normal bots follow the rules. **ZooKepper?** It doesn’t even follow spelling rules! Breaking conventions and *kepping* the chaos in check—one **kepp** at a time.  

Currently, ZooKepper is a **music bot**, but in the long run, it aims to be a **multi-purpose bot** with even more features. **Stay tuned for updates!** 🎵🔥  

---

## 🛠 Setup & Run
To run the bot, make sure you have **Node.js** installed and then execute the following:

### 🔥 Get the latest development version  
If you want access to the **latest features**, clone the `development` branch:  
```bash
# Clone the repository
git clone -b development https://github.com/NABlackFox/DiscordBot-ZooKepper.git
cd DiscordBot-ZooKepper
```
### 📥 Download the latest release  
If you prefer a **stable version**, clone the `main` branch of the project

<!-- #### 🔗 [**Latest Release**](https://github.com/NABlackFox/DiscordBot-ZooKepper/releases/latest)   -->

### ⚙️ Configure Environment Variables 

Create ".env" file in the root folder and adding the following varriable:
``` js
TOKEN = YourBotToken
CLIENT_ID = YourBotID
GUILD_ID = YourServerID 
```

### ▶️ Run the bot
After dowload and install the bot time to run it
```bash
# Install dependencies
npm install
# Run the bot
node ./src/index.js
# or
npm run dev
# or if you have nodemon installed
nodemon ./src/index.js 

# replace the "npm" with any Package Manager you use

# If you want to publish the slash to all servers the bot in please use the option "--global-deploy". Global deploy will take one to several hours to deploy to all servers

node ./src/index.js --global-deploy
# or
npm run product # not recommend
# or 
nodemon ./src/index.js --global-deploy # not recommend
```
---
## 📜Commands
### 🎵 Music Commands 

| Command       | Available Options        | Description |
|--------------|--------------------------|-------------|
| `/play`      | `<song>`                  | Plays a song in a voice channel. |
| `/pause`     | N/A                        | Pauses the currently playing song or resume if the sonng is paused. |
| `/queue`      | N/A                        | Display the queue inforamtion. |
| `/skip`  | [`skip-options`](#skip-options) | Skips the current song. |
| `/stop`      | N/A                        | Stops the music and clears the queue. |

 
> - `N/A` → The command does not require options.  
> - `[]` → Optional parameters.  
> - `<>` → Required parameters.  
### 📝 Options List

#### Skip Options <a name="skip-options"></a>
- `amount` → number of tracks skip deafult is 1.
---
### 🎭 Random Commands (initial commands when I learn coding, put here for fun 😃)
| Command       | Available Options        | Description |
|--------------|--------------------------|-------------|
| `/ping`      | N/A                  | Reply with "Pong!" |
| `/user`     | N/A                        | Display user information |
| `/server`      | N/A                        | Display server inforamtion |
---

## 🎖 Credits  
ZooKepper is powered by open-source libraries:  

- [**discord.js**](https://discord.js.org/) - A powerful JavaScript library for interacting with the Discord API.  
- [**discord-player**](https://discord-player.js.org/) - An easy-to-use and feature-rich music framework for Discord bots.  

A huge thanks to the developers of these projects for making ZooKepper possible! 🚀  
