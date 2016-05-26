# Quizziepoo
A simple quiz to embed in Web pages. [Example](http://www.chicagomag.com/Chicago-Magazine/February-2014/bar-trivia/).
## Usage
Insert this code in your HTML where you'd like the quiz to appear:
```
<div id="quiz-wrapper"></div>
```
Make sure your HTML links to `quizziepoo.css`, `quizziepoo.js` and `quiz-example.js` (or a similar file that contains the individual quiz’s configuration).

Questions, answers and a few other settings are stored in an array in `quiz-example.js`. This array can be edited manually, or the quiz can be entered in a spreadsheet [such as this](https://docs.google.com/spreadsheets/d/1anFFNjlS7LguxMh74TD-42tU_8wcTEH8C1artRQvb-U/pub?output=xlsx) and then run through good-old [Mr. Data Converter](http://shancarter.github.io/mr-data-converter/) (select `JSON - properties`).

CSS can and should be updated to fit your style.

Each question can accommodate up to 6 potential answers.

If Google Analytics is present on your page, events will be sent to log each answer.

After completing the quiz, users will be prompted to share on Twitter or Facebook. To allow Facebook sharing, an app ID is required.
## To do
[ ] Allow for direct linking to Google Sheets, rather than fussing with a JSON.
[ ] Change progress bar from a table to flexbox elements
[ ] Gussy up CSS
## Credits
Luke Seemann