<!DOCTYPE html>
<html>
  <head>
  	<meta charset="UTF-8">
  	<link type="text/css" rel="stylesheet" href="stylesheet/default.css" />
  	<title>John Polhill Home</title>
  </head>
  <body>
  	
  	<?php include("includes/header.php"); ?>
  
    <main>
    	<section>
  		<img id="profile" src="imgs/headshot.png" alt="John" />

    		<p>Hey! welcome to my website for Dev Bootcamp. Since the page looks very bland without content, I decided to try and fill as much space as I can using these couple paragraphs. As you can see, this certainly is filling up a significant amount of space. But, now I am running out of useless things to say, so I suppose I will try and write about myself.</p>
    		<p>My name is John Polhill, and am currently enrolled at Dev Bootcamp. My interests include both table top games and video games, weight lifting, drawing, other forms of art, rock climbing, programming, and game development. Mainly, I enjoy doing things that I feel improve my mental and physical capabilities. Also, dogs are cool.</p>
    		<p>I've been programming since I was 12 years old (currently 20 now). Most of the programming I have done has been in game development, as it is one of my interests. If I had the option to choose any job in the world it would be some kind of programming. So, to showcase my interest in game programming I decided to make a quick game real quick for everyone (probably just me) to enjoy. So look down below and play a game of snake. Try to go for a score of 100! Or the max score of 400, which would be the entire screen... Good luck!</p>
    	</section>

      <section id="game">
        Snake<br>
        Controls: W, A, S, D = Up, Left, Down, Right<br>
        Click Screen to Play<br>
        Score: <span id="score">0</span>
      </section>

    </main>

    <?php include("includes/footer.php"); ?>
    <script src="snake/game.js"></script>

  </body>

</html>