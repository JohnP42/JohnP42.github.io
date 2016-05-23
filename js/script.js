var trivia = [
  "My favorite super hero is Spider-man.",
  "My favorite color is red (that's probably obvious).",
  "I've lived in all corners of the US and have even been to Panama.",
  "The first programming language I masted was GML (Game Maker Language).",
  "I chose Bulbasaur as my first pokemon.",
  "I sang Mr. Grinch in a talent show; I didn't win.",
  "I have an army of Dwarfs.",
  "I've never seen Star Wars.",
  "I've hand made 2 bows and arrows.",
  "My favorite super hero movie is The Dark Knight.",
  "My favorite Chirstmas characters are The Grinch and Ebenezer Scrooge.",
  "Personally, I prefer Luigi to Mario.",
  "I can't whistle (yet).",
  "I have a bad habit of swallowing my gum (but I'm still alive).",
  "Captain America: Civil War was great, you should go see it!"
]

$(document).ready(function() {
  slides();
  projects();

  $("#trivia").text(trivia[Math.floor(Math.random() * trivia.length)]);
});
