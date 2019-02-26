class Board {
	constructor() {
		var board = [];
		for (var i = 0; i < 9; i++) {
			board.push("grey");
		}
		this.board = board;
	}

	definingBoardForOneOrTwo(playeruno, playerdos) {
		playeruno = "";
		playerdos = "human";

		$("#playertime").on("change", function() {
			if ($("input[name=vscomputer]:checked", "#playertime").val() === "true") {
				playerdos = "auto";
			} else {
				playerdos = "human";
			}
			return playerdos;
		});

		$(".button").on("click", function() {
			playeruno = "";

			if (playeruno === "") {
				playeruno = prompt("What is the name of the first player?");
			}
			if (playerdos === "human") {
				playerdos = prompt("What is the name of the second player?");
			} else {
				playerdos = "the computer";
			}
			var game = new Game(playeruno, playerdos);
			game.startGame(playeruno, playerdos);
		});
	}
	/**
	 *1. is the click box already marked
	 */

	canClickInBox(boxNumber, playeruno, playerdos) {
		if (this.board[boxNumber] === "grey") {
			return true;
		} else {
			return false;
		}
	}

	/**
	 *2. click the box and update the Board status
	 */

	clickBox(
		boxNumber,
		activeplayer,
		playeruno,
		playerdos,
		counter,
		gamefinished
	) {
		this.board[boxNumber] = activeplayer.color;
		var lastColor = this.board[boxNumber];

		this.checkIfWinner(lastColor, playeruno, playerdos, gamefinished);

		gamefinished = this.checkIfWinner(
			lastColor,
			playeruno,
			playerdos,
			gamefinished
		);

		if (gamefinished === false) {
			this.checkIfEmptyBoxesOrTie(
				lastColor,
				playeruno,
				playerdos,
				gamefinished
			);
		}
		return gamefinished;
	}

	fromStartScreentoBoardScreen(lastColor, playeruno, playerdos) {
		$("form").hide();
		$("button").hide();
		$("div").removeClass("screen screen-start");
		$("li").show();
		$("ul").show();
		$("li.box").css("background-color", "#efefef");
		$("li.box").css("background-image", "none");
		$("div").addClass("board");
		$("#start").attr("id", "board");

		if (lastColor === "FFA000" && playerdos !== "the computer") {
			$("h1").after(
				'<div class="nowplaying"> Now playing:' + playerdos + "</div>"
			);
		} else if (playerdos === "the computer") {
			$("h1").after(
				'<div class="nowplaying"> Now playing:' + playeruno + "</div>"
			);
			$("#player1").addClass("active");
			$("#player2").removeClass("active");
		}
	}

	fromBoardToWinnerOrTieBoard(lastColor, playeruno, playerdos, gamefinished) {
		$("p").remove();
		$(".success").remove();
		$(".newgamebutton").remove();
		$(".nowplaying").remove();

		$(".players").hide();
		$(".box").hide();
		$(".board").removeClass("board");
		$("#board").attr("id", "finish");

		$("form").after(
			'<button type="button" class="newgamebutton">New game</button>'
		);

		$("#finish").removeClass("screen screen-win screen-win-tie");
		$("h1").after("<p>Winner</p>");

		if (lastColor === "FFA000" && gamefinished === true) {
			$("#finish").addClass("screen screen-win screen-win-one");
			$("p").after(
				"<span class='success'> The winner is " +
					playeruno.toUpperCase() +
					"</span>"
			);
		} else if (lastColor === "3688C3" && gamefinished === true) {
			$("#finish").addClass("screen screen-win screen-win-two");
			$("p").after(
				"<span class='success'> The winner is " +
					playerdos.toUpperCase() +
					"</span>"
			);
		}

		if (gamefinished === false) {
			$("p").remove();
			$("h1").after("<p>It is a tie</p>");
			$("#finish").removeClass("screen-win-one screen-win-two");
			$("#finish").addClass("screen screen-win screen-win-tie");
		}
	}

	fromWinnerOrTieScreenToStartScreen(lastColor, playeruno, playerdos) {
		$(".newgamebutton").remove("button");
		$(".nowplaying").remove();
		$(".success").remove();
		$("p").remove();
		$("#finish").attr("id", "start");
		$("#start").addClass("screen-start");
		$(".button").remove();
		$("h1").after('<button class="button2" type="button">Second game</button>');
		$("form").remove();
		$("#start").removeClass("screen-win-tie screen-win-one screen-win-two");

		$(".button2").click(() => {
			if (lastColor === "FFA000" && playerdos !== "the computer") {
				$("#player2").addClass("active");
				$("#player1").removeClass("active");
			} else {
				$("#player1").addClass("active");
				$("#player2").removeClass("active");
			}

			this.fromStartScreentoBoardScreen(lastColor, playeruno, playerdos);
		});
	}

	checkIfWinner(lastColor, playeruno, playerdos, gamefinished) {
		for (var i = 0; i < 3; i++) {
			if (
				(this.board[3 * i] !== "grey" /** Horizontal Alignment */ &&
					this.board[1 + 3 * i] !== "grey" &&
					this.board[2 + 3 * i] !== "grey" &&
					(this.board[3 * i] === this.board[1 + 3 * i] &&
						this.board[3 * i] === this.board[2 + 3 * i])) ||
				(this.board[i] !== "grey" /** Vertical Alignment */ &&
					this.board[3 + i] !== "grey" &&
					this.board[6 + i] !== "grey" &&
					(this.board[i] === this.board[3 + i] &&
						this.board[i] === this.board[6 + i])) ||
				(this.board[0] !== "grey" /** Diagonal Aligment Left To Right */ &&
				this.board[4] !== "grey" &&
				this.board[8] !== "grey" &&
				i ===
					0 /** Only one possible diagonal vs 3 potential horizontal or vertical */ &&
					(this.board[0] === this.board[4] &&
						this.board[0] === this.board[8])) ||
				(this.board[2] !== "grey" /** Diagonal Alignment Right to  Left*/ &&
					this.board[4] !== "grey" &&
					this.board[6] !== "grey" &&
					i === 0 &&
					(this.board[2] === this.board[4] && this.board[2] === this.board[6]))
			) {
				if (
					this.board[3 * i] !== "grey" &&
					this.board[1 + 3 * i] !== "grey" &&
					this.board[2 + 3 * i] !== "grey" &&
					(this.board[3 * i] === this.board[1 + 3 * i] &&
						this.board[3 * i] === this.board[2 + 3 * i])
				) {
					lastColor = this.board[3 * i];
				}

				if (
					this.board[i] !== "grey" &&
					this.board[3 + i] !== "grey" &&
					this.board[6 + i] !== "grey" &&
					(this.board[i] === this.board[3 + i] &&
						this.board[i] === this.board[6 + i])
				) {
					lastColor = this.board[3 + i];
				}

				if (
					this.board[0] !== "grey" &&
					this.board[4] !== "grey" &&
					this.board[8] !== "grey" &&
					i === 0 &&
					(this.board[0] === this.board[4] && this.board[0] === this.board[8])
				) {
					lastColor = this.board[0];
				}

				if (
					this.board[2] !== "grey" &&
					this.board[4] !== "grey" &&
					this.board[6] !== "grey" &&
					i === 0 &&
					(this.board[2] === this.board[4] && this.board[2] === this.board[6])
				) {
					lastColor = this.board[2];
				}
				gamefinished = true;

				this.fromBoardToWinnerOrTieBoard(
					lastColor,
					playeruno,
					playerdos,
					gamefinished
				);

				$(".newgamebutton").click(() => {
					if (lastColor === "FFA000") {
						$("div").removeClass("screen-win screen-win-one");
					} else {
						$("div").removeClass("screen-win screen-win-two");
					}

					var board = [];
					for (var j = 0; j < 9; j++) {
						board.push("grey");
					}
					this.board = board;

					$("p").remove();
					$("form").remove();

					this.fromWinnerOrTieScreenToStartScreen(
						lastColor,
						playeruno,
						playerdos
					);
				});
			}
		}
		if (gamefinished !== true) {
			gamefinished = false;
			this.checkIfEmptyBoxesOrTie(
				lastColor,
				playeruno,
				playerdos,
				gamefinished
			);
		}
		return gamefinished;
	}

	checkIfEmptyBoxesOrTie(lastColor, playeruno, playerdos, gamefinished) {
		var countertie = 0;
		for (var j = 0; j < 9; j++) {
			if (this.board[j] !== "grey") {
				countertie = countertie + 1;
			}
		}
		if (countertie === 9) {
			this.fromBoardToWinnerOrTieBoard(
				lastColor,
				playeruno,
				playerdos,
				gamefinished
			);
			$(".newgamebutton").click(() => {
				var board = [];
				for (var j = 0; j < 9; j++) {
					board.push("grey");
				}
				this.board = board;
				$("p").remove();
				$("form").remove();
				this.fromWinnerOrTieScreenToStartScreen(
					lastColor,
					playeruno,
					playerdos
				);
			});
		}
	}
}
