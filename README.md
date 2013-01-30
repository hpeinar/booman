booman
======

Bomberman in html5

Changelog
==
<strong>v0.6</strong>
- map generation is now seeded using David Bau's script (see credits)
- Player no longer spawns on top of a wall. There is still a chance to get stuck, but it's reaaaaaly low.
- Spritesheet is now pre-loaded

<strong>v0.5</strong>
- introduced camera. Board size is currently 60 * 60 tiles to test camera out
- fixed a bug where space wasn't removed from keyqueue when no bombs were left to place

<strong>v0.4.1</strong>
- made a background canvas for drawing grass just one time, instead of every time on update. Removed CSS background.

<strong>v0.4</strong>
- introduced floating texts. Info texts are shown on bonus pickup and death
- player now spawns onto a random tile (reduces the risk of spawning into a wall or no-way-out position)

<strong>v0.3</strong>
- grass tiles are no longer drawn, background is set with CSS
- player movement is now "animated" meaning that after the key click, player is locked into the animation for 4 updates
- update rate changed from 50 to 25

<strong>v0.2</strong>
- introduced spritesheet
- player is now the same size as every other tile
- fixed moving check

<strong>v0.1</strong>
- first release

Little about it:
==
- ~1000 lines of js (v0.5)
- took me around 2 weeks, after the work development time to create (v0.1)
- everything is written in OOP style, so all the things are objects which have their own properties and methods
- Game update and draw functions are called every 25ms
- Input is handled using queue system. All keystrokes are put into an queue which is handled on the game update. This should give pretty responsive gameplay.
- Sprites are drawn using <a href="http://calebevans.me/projects/jcanvas/index.php" title="jCanvas">jCanvas</a>.
- It has no levels, so after blowing all the blocks up there is nothing else to do.
- Map generation is now seeded (as of v0.6)

Future plans:
==
I ran into a performance problem with client side script. One day I wondered myself that a 10 000 tiles big bomberman map would be awesome. After little testing and playing around with numbers I understood that anything over 100x100 is getting tricky. Even then I need to have background as a "static" layer and just draw the tiles I really need. But with more tiles, arrays just get too big to handle and browsers start lagging and as I couldn't come up with a solution which could be made from client-side, I need to move my 10 000 tile map to a server-side. Plan is to make it so, that client holds 100x100 tiles at the most at any given time. If the player moves on the map, I'll request needed tiles from the server and empty up the array from other end, so it'll still be 100x100. Server will just act as a very big storage, holding all the tiles I've used and generating new ones if needed.

demo
==
http://projekt406.ee/codeblog/demos/booman/ (latest)<br />
http://projekt406.ee/codeblog/demos/boomanv1/ (first release)

blogpost
==
http://projekt406.ee/codeblog/booman

license
==
Do whatever you please, but refer to me as an original author :)

credits
==
All the credits for tiles and the character go to <strong>Klex1992</strong> on <a href="http://www.rpgmakervx.net/index.php?showtopic=31465" title="rpgmakervx.net" target="_blank">rpgmakervx.net</a><br />
<strong>Big</strong> thanks to <a href="https://github.com/r3ality" title"R3ality's github" target="_blank">R3ality</a> for brainstorming with me and helping with finding ideas and solutions to some problems I ran into.<br />
Thanks to <a href="http://davidbau.com/" title"David Bau" target="_blank">David Bau</a> for providing the javascript <a href="http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html#more" target="_blank">Math.random() seeding script</a>.
Thanks to <a href="http://foorum.hinnavaatlus.ee/profile.php?mode=viewprofile&u=25169" target="_blank">raul72</a> for the movement improvement.