class Game {
	constructor(playeruno, playerdos) {
		this.board = new Board();
		this.ready = false;
		this.players = this.createPlayers(playeruno, playerdos);
	}

	/**
	 * Creates two player objects
	 * @return (array)  An array of two player objects.
	 */

	createPlayers(playeruno, playerdos) {
		const players = [
			new Player(playeruno, "FFA000", true),
			new Player(playerdos, "3688C3", false)
		];
		return players;
	}

	/**   Present a new empty board to play    */

	startGame(playeruno, playerdos) {
		var gamefinished = false;
		var board1 = new Board();
		var lastColor = "FFA000";
		board1.fromStartScreentoBoardScreen(lastColor, playeruno, playerdos);
		this.playYourTurn(playeruno, playerdos, gamefinished);
	}

	get activePlayer() {
		return this.players.find(player => player.active);
	}

	/**  Switches active player   */

	switchPlayers(playeruno, playerdos) {
		this.players[0].name = playeruno;
		this.players[1].name = playerdos;
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
	}

	/**   New play   */

	playYourTurn(playeruno, playerdos, gamefinished) {
		if (gamefinished === false) {
			if (this.activePlayer === this.players[0]) {
				/**  hovering the box: activating/deactivating the symbol in gray  */

				$("li.box").hover(
					function() {
						var boxfilledcolor = $(this).css("background-color");
						if (boxfilledcolor === "rgb(239, 239, 239)") {
							$(this).css("background-image", "url(./img/o.svg)");
						}
					},
					function() {
						var boxfilledcolor = $(this).css("background-color");
						if (boxfilledcolor === "rgb(239, 239, 239)") {
							$(this).css("background-image", "none");
						}
					}
				);

				/**  indicating in the upper part of the board who´s turn it is   */

				$("#player1").addClass("active");
				$("#player2").removeClass("active");

				$(".nowplaying").remove();

				if (gamefinished === false) {
					$("h1").after(
						'<div class="nowplaying"> Now playing: ' + playeruno + "</div>"
					);
				}

				/**   how do we manage the click   */
				var self = this;
				$("li.box").on("click", function() {
					boxNumber = parseInt(this.id, 10) - 1;
					$(this).css("background-color", "#ffa000");
					$(this).css("background-image", "url(./img/o.svg");

					/**
					 * updating the Board object with the box identifying parameters that it is not available anymore
					 */

					if (self.board.canClickInBox(boxNumber, playeruno, playerdos)) {
						self.board.clickBox(
							boxNumber,
							self.activePlayer,
							playeruno,
							playerdos,
							gamefinished
						);

						gamefinished = self.board.clickBox(
							boxNumber,
							self.activePlayer,
							playeruno,
							playerdos,
							gamefinished
						);

						if (gamefinished === false) {
							self.switchPlayers(playeruno, playerdos);
							self.playYourTurn(playeruno, playerdos, gamefinished);
						}
					}
				});
			} else {
				/**   indicating in the upper part of the board who´s turn it is   */

				$("#player2").addClass("active");
				$("#player1").removeClass("active");
				$(".nowplaying").remove();

				if (playerdos !== "the computer") {
					if (gamefinished === false) {
						$("h1").after(
							'<div class="nowplaying"> Now playing: ' + playerdos + "</div>"
						);
					}

					/**  hovering the box: activating/deactivating the symbol in gray  */

					$("li.box").hover(
						function() {
							var boxfilledcolor = $(this).css("background-color");
							if (boxfilledcolor === "rgb(239, 239, 239)") {
								$(this).css("background-image", "url(./img/x.svg)");
							}
						},
						function() {
							var boxfilledcolor = $(this).css("background-color");
							if (boxfilledcolor === "rgb(239, 239, 239)") {
								$(this).css("background-image", "none");
							}
						}
					);

					/**  how do we manage the click  */

					self = this;

					$("li.box").click(function() {
						boxNumber = parseInt(this.id, 10) - 1;
						$(this).css("background-color", "#3688c3");
						$(this).css("background-image", "url(./img/x.svg");

						if (self.board.canClickInBox(boxNumber, playeruno, playerdos)) {
							self.board.clickBox(
								boxNumber,
								self.activePlayer,
								playeruno,
								playerdos,
								gamefinished
							);

							gamefinished = self.board.clickBox(
								boxNumber,
								self.activePlayer,
								playeruno,
								playerdos,
								gamefinished
							);

							if (gamefinished === false) {
								self.switchPlayers(playeruno, playerdos);
								self.playYourTurn(playeruno, playerdos, gamefinished);
							}
						}
					});
				} else {
					/**   Return a random number between 0 and 8 that is not already occupied*  */

					var boxNumber = Math.floor((8 / 9) * Math.floor(Math.random() * 10));
					self = this;

					for (var k = 0; k < 9; k++) {
						if (
							self.board.board[boxNumber] === "FFA000" ||
							self.board.board[boxNumber] === "3688C3"
						) {
							boxNumber = Math.floor((8 / 9) * Math.floor(Math.random() * 10));
						} else {
							k = 9;
						}
					}
					k = 0;

					if (self.board.canClickInBox(boxNumber, playeruno, playerdos)) {
						for (var j = 0; j < 9; j++) {
							if (j === boxNumber) {
								var aux1 = "#" + (j + 1);
								$(aux1).css("background-color", "#3688c3");
								$(aux1).css("background-image", "url(./img/x.svg)");
								self.board.clickBox(
									boxNumber,
									self.activePlayer,
									playeruno,
									playerdos,
									gamefinished
								);
							}
						}

						gamefinished = self.board.clickBox(
							boxNumber,
							self.activePlayer,
							playeruno,
							playerdos,
							gamefinished
						);

						if (gamefinished === false) {
							self.switchPlayers(playeruno, playerdos);
							self.playYourTurn(playeruno, playerdos, gamefinished);
						}
					}
				}
			}
		}
	}
}
