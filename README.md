# Getting started

Install deps

```shell
npm install
```

Create config files

```shell
# For production
cp .example.env .env

# For dev
cp .example.env .dev.env
```

Setup env file:
```dotenv
# You must register a new user on Twitch, which will be used by the bot
BOT_USERNAME=mychannel_bot

# Token you can get here by login via bot https://twitchapps.com/tmi/
BOT_OAUTH_TOKEN=oauth:abc123asd512zxc

# Your twitch username
CHANNEL=devkucher
```

## Developing

Run TSC in watch mode & restart bot via nodemon

```shell
npm run watch
```

### After making the changes:
Commit

```shell
npx git-cz
```

Prepare release

```shell
npm run release
```

Bump version

```shell
npm run bump
```

Publish release

```shell
npm run publish
```

## Usage

Start bot

```shell
npm run start
```
