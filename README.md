# APCSP-Create
My APCSP Create Task Project from the 2019-2020 School Year.

### Circle Clicker
My create task is an html5 browser based game named "Circle Clicker"

### Mechanics
The object of the game is to click on the blue circles before the time runs out while avoiding clicking on the red circles.

The game progressively gets more difficult as the player's score increases.

The game ends when the player fails to click on a circle before the timer runs out or accidentally clicks on a red circle.

### Challenges
Some challenges I faced when making this game included
* Keeping track of all of the states of the individual circles on screen.
* Making sure the circles did not overlap as if they did it would be difficult for the player to select an individual circle
* Progressively increasing the difficulty of the game at a reasonable rate

I was able to overcome these challenges by doing the following:
* Saving each circle as an object to best organize all the data and states of all fo the individal circles.
* Using the distance formula to ensure the circls never overlapped.
* increased the difficulty of the game via exponental decay to progressively make it more difficult but not so much so that it would quickly become too difficult reasonably play.
