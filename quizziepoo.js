var _gaq = _gaq || [];

function quizziepoo(quizConfig) {
  var currentQuestion   = 0,
    quiz                = quizConfig.quiz,
    totalQuestions      = quizConfig.quiz.length,
    answerKeys          = ['a1','a2','a3','a4','a5','a6'],
    score               = 0,
    slug                = quizConfig.slug,
    name                = quizConfig.name,
    thumbnailURL        = quizConfig.thumbnailURL,
    redirectURL         = quizConfig.longURL,
    longURL             = quizConfig.longURL,
    shortURL            = quizConfig.shortURL || longURL
    FB_APP_ID           = ''; // If you want users to share to Facebook after taking the quiz

  loadQuestion(0);

  jQuery('#quiz-wrapper').addClass('clearfix');

  jQuery('#quiz-skip').on('click', function() {
    quiz[currentQuestion].reader_answer = 'Skipped';
     _gaq.push(['_trackEvent', 'Quiz', slug + ' skip ' + quiz[currentQuestion].question.substring(0,30)]);
    if (currentQuestion + 1 < quiz.length) {
      currentQuestion += 1;
      loadQuestion(currentQuestion)
    }
    else {
      scoreQuiz();
    }
  })


  function showProgress () {
    var p = jQuery('#quiz-progress'),
    progress = '<table><tr>'
    for (var i = 0 ; i < currentQuestion; i++ ){
      if (quiz[i].correct_answer === quiz[i].reader_answer) {
        progress += '<td>+</td>';
      }
      else {
        progress += '<td>-</td>';
      }
    }
    for (var i = currentQuestion ; i < totalQuestions; i++) {
      progress += '<td>?</td>';
    }
    progress += '</tr></table>'
    p.html(progress);
  }

  function loadQuestion (question) {
    var quiz_el = jQuery('#quiz-wrapper'),
      q = quiz[question],
        answers = ['stub']; // So we can start index with 1

    if (question === 0) {
      quiz_el.append('<div id="quiz-progress"></div>');
      quiz_el
        .append('<h2 id="quiz-question">&nbsp;</h2>')
        .append('<div id="quiz-options">&nbsp;</div>')
        .append('<button id="quiz-skip">Skip &rarr;</button>')
    }

    for (var j = 0; j < answerKeys.length; j++) {
      if (answerKeys[j] !== null) {
        answers.push(q[answerKeys[j]]);
      }
    }

    showProgress();
    jQuery('#quiz-question').html(q.question)

    var options_el = jQuery('#quiz-options').html(' ');
    for (var i = 0 ; i < answerKeys.length; i++) {
      var option = q[answerKeys[i]],
          answerIndex = i + 1;
      if (option) {
        options_el.append(
          '<button class="quiz-option" data-quiz-option="' + answerIndex + '">' + option + '</button><br>'
          )
      }
    };

    jQuery('.quiz-option').on('click',function() {
      var answer = jQuery(this).data('quiz-option');
      registerAnswer(currentQuestion, answer);
      if (answer == quiz[currentQuestion].correct_answer) {
        jQuery(this).addClass('quiz-option-correct');
        _gaq.push(['_trackEvent', 'Quiz', slug + ' correct: ' + q.question.substring(0,30), answers[answer]]);
      }
      else {
        jQuery(this).addClass('quiz-option-incorrect');
        _gaq.push(['_trackEvent', 'Quiz', slug + ' wrong: ' + q.question.substring(0,30), answers[answer]]);
      }

      jQuery('.quiz-option').not(this).animate({opacity: 0},'fast');
      setTimeout( function() {
        if (currentQuestion + 1 < totalQuestions ) {
          currentQuestion += 1;
          loadQuestion(currentQuestion);
        }
        else {
          scoreQuiz();
        }
      }, 800);
    })
  }

  function scoreQuiz() {
    var quiz_el = jQuery('#quiz-wrapper').html(' ').addClass('quiz-wrapper-score');
    for (var i = quiz.length - 1; i >= 0; i--) {
      var q = quiz[i];
      if (q.correct_answer === q.reader_answer) {
        score += 1;
      }
    };

    var html  = '<div id="quiz-score-intro">You scored</div> <div id="quiz-score">0</div><div id="quiz-outof"> out of ' + totalQuestions + '</div>';
        html += '<div id="quiz-social" class="clearfix">'
        html += '<a id="quiz-facebook" href="" class="btn" target="_blank" onclick="_gaq.push([\'_trackEvent\', \'Sharing\', \'Facebook share from quiz results\',\''+slug+'\','+score+']);">Tell your friends <span class="nowrap">on Facebook</span></a>';
        html += '<a id="quiz-twitter" href="" class="btn"  target="_blank" onclick="_gaq.push([\'_trackEvent\', \'Sharing\', \'Twitter share from quiz results\',\''+slug+'\','+score+']);">Tell your friends <span class="nowrap">on Twitter</span></a></div>';
        html += '<div id="quiz-answerkey"></div>';
    quiz_el.html(html);
    scoreReveal();
    loadSocial();
    showAnswers();
  }

  function scoreReveal() {
    jQuery('#quiz-score').html(score)
  }

  function loadSocial() {
    var twitterURL = '';
    var facebookURL = 'http://www.facebook.com/dialog/stream.publish?app_id='+FB_APP_ID+'&redirect_uri='+redirectURL+'&link='+longURL + '?utm_source=FB%26utm_medium=referral%26utm_campaign=' + slug+'%20quiz';
    var title = name.replace(' ','+');
    if (facebookURL) {
      facebookURL += '&picture='+thumbnailURL;
    }
    if (score < 3) {
      twitterURL  = 'http://twitter.com/intent/tweet?hashtags='+slug+'&text=Ugh.+I+went+'+score+'+for+'+totalQuestions+'+at+the+'+title+'+quiz.+Can+you+do+better?++'+shortURL;
      facebookURL += '&description=The+shame.+I+hope+you+can+do+better.&name=I+went+'+score+'+for+'+totalQuestions+'+at+the+'+title+'+quiz.'
    }
    else if (score === totalQuestions) {
      twitterURL  = 'http://twitter.com/intent/tweet?hashtags='+slug+'&text=I+went+a+perfect+'+score+'+for+'+totalQuestions+'+at+the+'+title+'+quiz.+Bet+you+can’t+match+that.++'+shortURL;
      facebookURL += '&name=I+went+'+score+'+for+'+totalQuestions+'+at+the+'+title+'+quiz.&description=Can+you+match+that?'
    }
    else {
      twitterURL  = 'http://twitter.com/intent/tweet?hashtags='+slug+'&text=I+went+'+score+'+for+'+totalQuestions+'+at+the+'+title+'+quiz.+Bet+you+can’t+beat+that.++'+shortURL;
      facebookURL += '&name=I+went+'+score+'+for+'+totalQuestions+'+at+the+'+title+'+quiz.&description=Bet+you+can’t+beat+that.'
    }
    jQuery('#quiz-twitter').attr('href',twitterURL);
    jQuery('#quiz-facebook').attr('href',facebookURL)
  }

  function showAnswers() {
    var key_el = jQuery('#quiz-answerkey'),
        output = '<h2>Answer key</h2>';
    for (var i = 0; i < quiz.length; i++) {
      var q = quiz[i],
          correct = q.correct_answer === q.reader_answer,
          answers = ['stub']; // So we can start index with 1
      for (var j = 0; j < answerKeys.length; j++) {
        if (answerKeys[j] !== null) {
          answers.push(answerKeys[j]);
        }
      }
      output += '<div class="quiz-key-item">';
      output += '<strong>' + q.question + '</strong><br>';
      if (correct) {
        output += q[answers[q.correct_answer]];
        output += ' +</i>';
      }
      else {
        if (q.reader_answer === 'Skipped') {
          output += '<strike>Skipped</strike>';
        }
        else {
          output += '<strike>' + q[answers[q.reader_answer]] + '</strike> ';
        }
        output += ' -<br>';
        output += q[answers[q.correct_answer]];
      }
      if (q.correct_answer_explanation.length > 1) {
        output += '<br><span class="quiz-answer-explanation">' + q.correct_answer_explanation + '</span>';
      }

      output += '</div>';

      key_el.html(output).fadeIn('slow')
    }
  }

  function registerAnswer(question,answer) {
    quiz[currentQuestion].reader_answer = answer;
  }
}