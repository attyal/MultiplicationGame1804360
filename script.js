
    // Storing player registration data
    var PlayerRegistrationData = [];

    function Register() {
      var firstName = document.getElementById('firstName').value;
      var lastName = document.getElementById('lastName').value;
      var dob = document.getElementById('dob').value;
      var gender = document.getElementById('gender').value;

      var player = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender,
        questions: [],
        correctAnswers: 0,
        incorrectAnswers: 0
      };

      PlayerRegistrationData.push(player);

      document.getElementById('firstName').disabled = true;
      document.getElementById('lastName').disabled = true;
      document.getElementById('dob').disabled = true;
      document.getElementById('gender').disabled = true;
    }
function RegisterNewPlayer() {
  document.getElementById('firstName').disabled = false;
  document.getElementById('lastName').disabled = false;
  document.getElementById('dob').disabled = false;
  document.getElementById('gender').disabled = false;

  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('gender').selectedIndex = 0;

  // Resetting the game for the new player
  document.getElementById('game-play').style.display = 'none';
  document.getElementById('registration-form').style.display = 'block';

  // Clearing previous player data
  genderCounts = { male: 0, female: 0 };
  percentageCounts = [0, 0, 0, 0, 0, 0, 0];
}

    function PlayGame() {
      document.getElementById('registration-form').style.display = 'none';
      document.getElementById('game-play').style.display = 'block';
      GenerateQuestion();
    }

    function GenerateQuestion() {
      document.getElementById('message').textContent = "";

      var num1 = Math.floor(Math.random() * 9) + 1;
      var num2 = Math.floor(Math.random() * 5) + 1;

      document.getElementById('question').textContent = "What is " + num1 + " x " + num2 + "?";
      document.getElementById('answer').value = "";
    }

    function CheckAnswer() {
      var answer = document.getElementById('answer').value;
      var currentPlayer = PlayerRegistrationData[PlayerRegistrationData.length - 1];

      var num1 = parseInt(document.getElementById('question').textContent.split(" ")[2]);
      var num2 = parseInt(document.getElementById('question').textContent.split(" ")[4]);
      var correctAnswer = num1 * num2;

      if (answer == correctAnswer) {
        currentPlayer.correctAnswers++;
        currentPlayer.questions.push({ question: num1 + " x " + num2 + "?", answer: answer, status: "Correct" });
        document.getElementById('message').textContent = "Correct!";
      } else {
        currentPlayer.incorrectAnswers++;
        currentPlayer.questions.push({ question: num1 + " x " + num2 + "?", answer: answer, status: "Incorrect" });
        document.getElementById('message').textContent = "Incorrect!";
      }

      GenerateQuestion();
    }

    function ShowStatistics() {
      document.getElementById('game-play').style.display = 'none';
      document.getElementById('statistics').style.display = 'block';
      findPercentageScore();
      showAllStats();
    }
function EndGame() {
  ShowStatistics(); // Directly show the statistics when the game ends
}

    function findPercentageScore() {
      var currentPlayer = PlayerRegistrationData[PlayerRegistrationData.length - 1];
      var totalQuestions = currentPlayer.questions.length;
      var percentageScore = (currentPlayer.correctAnswers / totalQuestions) * 100;

      document.getElementById('showpercentage').textContent = "Player: " + currentPlayer.firstName + " " + currentPlayer.lastName +
        " | Total Questions: " + totalQuestions + " | Correct Answers: " + currentPlayer.correctAnswers +
        " | Percentage Score: " + percentageScore.toFixed(2) + "%";
    }

    function showAllStats() {
      var displayArea = document.getElementById('showallplayers');
      displayArea.textContent = "";

      for (var i = 0; i < PlayerRegistrationData.length; i++) {
        var player = PlayerRegistrationData[i];
        var stats = player.firstName + " " + player.lastName + ", Questions: ";

        for (var j = 0; j < player.questions.length; j++) {
          var question = player.questions[j];
          stats += question.question + " = " + question.answer + " (" + question.status + "), ";
        }

        stats += "Percentage Score: " + ((player.correctAnswers / player.questions.length) * 100).toFixed(2) + "%";

        displayArea.textContent += stats + "\n";
      }
    }


    function showCharts() {
      var femalesCount = PlayerRegistrationData.filter(person => person.gender === 'female').length;
      var totalPersons = PlayerRegistrationData.length;
      var malesCount = totalPersons - femalesCount;
      var percentageCounts = [0, 0, 0, 0, 0, 0, 0];

      for (var i = 0; i < PlayerRegistrationData.length; i++) {
        var percentageScore = (PlayerRegistrationData[i].correctAnswers / PlayerRegistrationData[i].questions.length) * 100;

        if (percentageScore < 50) {
          percentageCounts[0]++;
        } else if (percentageScore >= 50 && percentageScore < 60) {
          percentageCounts[1]++;
        } else if (percentageScore >= 60 && percentageScore < 70) {
          percentageCounts[2]++;
        } else if (percentageScore >= 70 && percentageScore < 80) {
          percentageCounts[3]++;
        } else if (percentageScore >= 80 && percentageScore < 90) {
          percentageCounts[4]++;
        } else if (percentageScore >= 90 && percentageScore < 100) {
          percentageCounts[5]++;
        } else if (percentageScore === 100) {
          percentageCounts[6]++;
        }
      }

      var femalesPercentage = (femalesCount / totalPersons) * 100;
      var malesPercentage = (malesCount / totalPersons) * 100;
/*REmember to add the pictures to the charts*/
      var genderChart = "<h3>Gender Frequency Chart</h3>";
      genderChart += "Females: <img src='' width='" + femalesPercentage + "'> " + femalesPercentage.toFixed(1) + "%<br>";
      genderChart += "Males: <img src='' width='" + malesPercentage + "'> " + malesPercentage.toFixed(1) + "%<br>";

      var percentageChart = "<h3>Percentage Score Chart</h3>";
      var percentageRanges = ["<50", "50-59", "60-69", "70-79", "80-89", "90-99", "100"];
      for (var i = 0; i < percentageRanges.length; i++) {
        percentageChart += percentageRanges[i] + ": <img src='' width='" + percentageCounts[i] + "'> " + ((percentageCounts[i] / totalPersons) * 100).toFixed(1) + "%<br>";
      }

      document.getElementById('showcharts').innerHTML = genderChart + percentageChart;
    }

    setInterval(showCharts, 5000);
