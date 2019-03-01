/**
 * Giving a number to each of the nine boxes. The number identifies the box.
 */
for (var i = 1; i < 10; i++) {
	$("li.box:nth-of-type(" + i + ")").attr("id", i);
}

/**  When you click the start button
 * (I)  You are prompted for the player names when not playing against the computer
 * (II) you see the board in the center
 *      (A) In the upper part two indicators for the two players.
 *      (b) One of the indicators is highlighted indicating who is playing
 */

/**  show as a start page a green background with two components:
 *  (I)   The TicTacToe headline and
 *  (II)  A start button
 */
$("li").hide();
$("div").removeClass("board");
$("div").addClass("screen screen-start");
$("#board").attr("id", "start");
$("h1").after('<button class="button" type="button">Start game</button>');

$("button").before("<form></form>");
$("form").attr("id", "playertime");
$("form").append(
	'<input type="radio" name="vscomputer" value="true">Versus computer<br>'
);
$("form").append(
	'<input type="radio" name="vscomputer" value="false">Versus someone<br>'
);

var playeruno = "";
var playerdos = "human";

var newboard = new Board();
newboard.definingBoardForOneOrTwo(playeruno, playerdos);
