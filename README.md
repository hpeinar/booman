booman
======

Bomberman in html5

Changelog
==
<strong>v0.6 (upcoming)</strong>
- map generation is now seeded using David Bau's script (see credits)

<strong>v0.5</strong>
- introduced camera. Board size is currently 40 * 40 tiles to test camera out
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
- ~750 lines of js (v0.1)
- took me around 2 weeks, after the work development time to create (v0.1)
- everything is written in OOP style, so all the things are objects which have their own properties and methods
- Game update and draw functions are called every 25ms
- Input is handled using queue system. All keystrokes are put into an queue which is handled on the game update. This should give pretty responsive gameplay.
- Sprites are drawn using <a href="http://calebevans.me/projects/jcanvas/index.php" title="jCanvas">jCanvas</a>.
- It has no levels, so after blowing all the blocks up there is nothing else to do.
- It's missing sprite pre-loading, so you might see some flickering with the images.
- It is possible that you spawn on a wall and cannot move, either blow yourself up with the wall or just refresh to get new map

demo
==
http://projekt406.ee/codeblog/demos/booman/

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
Also thanks to <a href="http://davidbau.com/" title"David Bau" target="_blank">David Bau</a> for providing the javascript <a href="http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html#more" target="_blank">Math.random() seeding script</a>.
