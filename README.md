booman
======

Bomberman in html5

Little about it:
==
- ~750 lines of js
- took me around 2 weeks, after the work development time to create
- everything is written in OOP style, so all the things are objects which have their own properties and methods
- Game update and draw functions are called every 50ms
- Input is handled using queue system. All keystrokes are put into an queue which is handled on the game update. This should give pretty responsive gameplay.
- Sprites are drawn using <a href="http://calebevans.me/projects/jcanvas/index.php" title="jCanvas">jCanvas</a>. Source images are .png (I know it's bad, but I needed the alpha channel)
- It has no levels, so after blowing all the blocks up there are nothing else to do.
- It's missing sprite pre-loading, so you might see some flickering with the images.
- It is possible that you spawn on a wall and cannot move, either blow yourself up with the wall or just refresh to get new map

demo
==
http://projekt406.ee/codeblog/booman

license
==
Do whatever you please, but refer to me as an original author :)

credits
==
All the credits for tiles and the character go to <strong>Klex1992</strong> on <a href="http://www.rpgmakervx.net/index.php?showtopic=31465" title="rpgmakervx.net" target="_blank">rpgmakervx.net</a>

