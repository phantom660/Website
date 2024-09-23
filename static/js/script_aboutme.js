;(function () {
    // all package will be available under zxcvbnts
    const options = {
        translations: zxcvbnts['language-en'].translations,
        graphs: zxcvbnts['language-common'].adjacencyGraphs,
        dictionary: {
            ...zxcvbnts['language-common'].dictionary,
            ...zxcvbnts['language-en'].dictionary,
        },
    }
    zxcvbnts.core.zxcvbnOptions.setOptions(options)
})()

function checkPassword() {
    const passwordInputElement = document.getElementById("passwordInput");
    const pword = passwordInputElement.value;

    let outputText;
    let bgColor = "pink"
	let pwscore = zxcvbnts.core.zxcvbn(pword).score;
	
	outputText = "To Be Determined," + " Score is: " + pwscore;
		
    if (pword.length === 0) {
        outputText = "Enter a password";
    } else {
		if (pwscore == 0) {
			outputText = "Horrible password";
			bgColor = "red";
		} else if (pwscore == 1) {
			outputText = "Bad password";
			bgColor = "orange";
		} else if (pwscore == 2) {
			outputText = "Mediocre password";
			bgColor = "yellow";
		} else if (pwscore == 3) {
			outputText = "Good password";
			bgColor = "lightblue";
		} else if (pwscore == 4) {
			outputText = "Great password";
			bgColor = "limegreen";
		}
	}
    document.getElementById("passwordCheckerResult").textContent = outputText;
    passwordInputElement.style.backgroundColor = bgColor;
}