# Okv Music

- **[Okv Music](https://okv-music.netlify.app/) is a Progressive Web App (PWA) music app made with Javascript using React.js and YouTube Api that allows user to discover and listen to new music from around the world. The website features a clean and modern design, a user-friendly interface, and a powerful search feature of youtube.**

## Screenshots

![okv music](https://user-images.githubusercontent.com/106578262/224484464-6ef06a58-9aba-4f3e-99ac-150857672f2b.png)

## Demo video

https://github.com/onamkrverma/okv-music/assets/106578262/86e5d3c1-25fd-42e9-96e8-8660537a31fa

**[Demo Link](https://okv-music.netlify.app/)**

## Features

- Best Streaming Quality
- Trending and New Released songs list
- Play youtube song as audio only
- YouTube Search Support
- Controls player from notification
- Next/Prev song track controls
- Auto Song Recommendations
- No Ads

#### Upcoming features to be add

- Controls audio quality (done ✔)
- Direct click to watch youtube video (done ✔)
- Get song info button (done ✔)
- Import Youtube playlists (done ✔)
- Add explore page for diffrent playist (done ✔)
- Add trending page to show trending song list for global and india (done ✔)
- Download audio as mp3 (done ✔)
- many more..

### Don't forget to :star: the repo

## Technology used

- React js
- CSS3
- Redux toolkit
- React router dom
- React loading skeleton
- React icons

### Backend

- Node js
- Express js
- Ytdl-core package

### Note:

- Now this project is migrated from CRA to Vite + React app

## Getting Started with Vite React App

- This project is bootstrapped with [Create Vite + React App](https://github.com/vitejs/vite/tree/main/packages/create-vite).
- clone down this repositery. You will need to `node.js` and `git` installed globally on your machine.

## installation and setup instructions

1. installation: `npm install`
2. In the project directory, you can run: `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
The page will reload when you make changes.

### Sample code for backend to get audio url with youtube id

- setup backend with nodejs, expressjs and install Ytdl-core package

```
const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

app.get("/song/:id", async (req, res) => {
  try {
    let info = await ytdl.getInfo(req.params.id);
    let audioFormatHigh = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: "audioonly",
    });
    let audioFormatLow = ytdl.chooseFormat(info.formats, {
      quality: "lowest",
      filter: "audioonly",
    });
    res.status(200).json({
      audioFormatHigh: audioFormatHigh.url,
      audioFormatLow: audioFormatLow.url,
    });
  } catch (err) {
    // console.error(error);
    if (err instanceof Error)
      res.status(500).send(`internal server error "${err.message}"`);
  }
```

## Queries

If you have any query or suggestion, feel free to [create an issue](https://github.com/onamkrverma/okv-music/issues) or [submit feedback here](https://okv-music.netlify.app/feedback)
