Hey there! Want to play Houston with some friends, but you're spread across the world? No biggie; with a few technical adjustments, you should be good to go!

*Note: This guide's in beta. We haven't actually had a chance to try this out in a real game, but I've demoed that all the parts work.*

In general, you should still have a good grasp on the [Local Rules](), since the Remote Rules are just a few additions.

## Additional Equipment/Tools

The additional equipment and tools that make the remote version possible are all managed on the Pilot Computer. Mainly, you need a way to stream KSP for Mission Control to view, you need a way for Mission Control to access Houston, and you need a way for the team to collaborate. Thankfully, there are some great tools to make this really easy!

* [Twitch](https://twitch.tv): The Pilot Computer will stream Kerbal Space Program using [Twitch.tv](https://twitch.tv). This acts as the "main display" Mission Control uses in the local version. Why twitch? It's popular, works (almost) everywhere, and has a ton of documentation!
* [ngrok](https://ngrok.com): ngrok allows you to quickly and painlessly setup a publicly accessible tunnel to a local server behind a firewall. This is how Mission Control will access Houston.
* [Google Hangouts](https://hangouts.google.com): This is how everyone will communicate. It's easy to setup, works on (almost) everything, and has free group video calling.

## What each Mission Control station will need

Each mission control station will need:

* A computer capable of running Google Hangouts and their Houston station in Safari/Chrome simultaneously. so, any decent computer from the past 5 years
* A TV or second monitor for the Twitch stream.

Mission Control stations should think of their computer as their station, Google Hangouts as the radio, and the Twitch display as a delayed live stream.

## Setting up the Pilot Computer

The pilot computer will need to:

1. Start KSP
2. Start streaming via Twitch
3. Start ngrok for the Telemachus port (usually 8085)
4. Start the Google Hangout

### Setting up remote Houston Access

[ngrok has a really great guide for getting started](https://ngrok.com/docs#expose), but here's the one-line command that should work for you:

```
ngrok http 8085
```

### Getting the party started

1. Share the Google Hangout with the team
2. Share the Twitch Stream URL with the team
3. Share your ngrox URL with the team
4. **Fire rockets into space over the internet** 🚀

## Additional notes

The Twitch stream will have a 15ish second delay. This might trip up Mission Control a bit, but it's pretty close to the actual missions! And it adds a fun wrinkle to make up for not being in the same room. :)