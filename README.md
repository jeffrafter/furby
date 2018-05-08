# Furby electron

This app is meant to communicate with a Furby connect. 

## Developing

By default, this works great with https://github.com/tclem/atom-furby

Clone the repo and run:

```
npm install
npm start
```

### That annoying warning

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add $(pwd)/node_modules/electron/dist/Electron.app
```

# Thanks

Much of the code (fluffcon, fluffaction and some of the server patterns) come directly from https://github.com/Jeija/bluefluff