quizConfig = {
  quiz         : [
    {"question":"Question 1","a1":"Question 1 a1","a2":"Question 1 a2","a3":"Question 1 a3","a4":"Question 1 a4","a5":0,"a6":null,"correct_answer":4,"reader_answer":""},
    {"question":"Question 2","a1":"Question 2 a1","a2":"Question 2 a2","a3":"Question 2 a3","a4":"Question 2 a4","a5":null,"a6":null,"correct_answer":3,"reader_answer":""},
    {"question":"Question 3","a1":"Question 3 a1","a2":"Question 3 a2","a3":"Question 3 a3","a4":"Question 3 a4","a5":null,"a6":null,"correct_answer":3,"reader_answer":""},
    ],
  slug         : 'nameofquiz', // Gets used as hashtag, creates filename for log
  name         : 'name of quiz', // This gets inserted into Tweets and facebook posts
  thumbnailURL : 'http://www.example.com/path/to/image.jpg', //
  longURL      : 'http://www.example.com/path/to/quiz',
  shortURL     : 'http://bit.ly/example' // Used for Twitter
}

jQuery(document).ready(function(){
  quizziepoo(quizConfig);
});