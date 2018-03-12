function playGame() {
	var begBet = Number(document.forms["luckySevens"]["begBet"].value);
	if (begBet <= 0) {
		alert("Starting bet must be greater than zero.");
		document.forms["luckySevens"]["begBet"].value = "";
		document.forms["luckySevens"]["begBet"].focus();
		return false;
	}
	var winArray = [begBet];
	var rollCounter = 0;
	for (var gameMoney = begBet; gameMoney >= 1; rollCounter++) {
		// Did not simplify the function like the class example to show maximum amount on a die is 6, minimum is 1
		dieOne = Math.ceil(Math.random() * (1 + 6 - 1));		
		dieTwo = Math.ceil(Math.random() * (1 + 6 - 1));
		if (Number(dieOne + dieTwo) == 7) {
			gameMoney += 4;
			winArray[winArray.length] = gameMoney;
		} else {
			gameMoney -= 1;
			winArray[winArray.length] = gameMoney;
		}
	}
	/* Math.max.apply(null,winArray) does not work correctly for large starting bets (rich players).
	Using an array at all seems to drain memory once it hits the millions. */
	var maxWin = 0;
	for (var indexCounter = 0; indexCounter < winArray.length; indexCounter++) {
		if (winArray[indexCounter] > maxWin) {
			maxWin = winArray[indexCounter];
		}
	}
	document.getElementById("results").style.display = "block";
	//Used .toFixed(2) function to create a string of 2 decimals but game only pays attention to integers anyway
	document.getElementById("startBet").innerText = ("$" + begBet.toFixed(2));
	document.getElementById("totalRolls").innerText = rollCounter;
	document.getElementById("highAmount").innerText = ("$" + maxWin.toFixed(2));
	document.getElementById("highRollCount").innerText = winArray.indexOf(maxWin);
	document.getElementById("submitButton").innerText = "Play Again";
	document.forms["luckySevens"]["begBet"].focus();
	/* Used console.log(winArray); here during testing to see what the overall score was after each roll.
	Otherwise, could have skipped using an array and tracked the max money held at each roll within first for loop's if. */
	return false;
}