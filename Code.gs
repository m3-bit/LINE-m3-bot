var channelAccessToken = "YOUR_API_KEY";

var spreadsheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");

/**
 * Apps Script automatically runs this function
 * when a program sends the app an HTTP POST request.
 * @param {event} e
 */
function doPost(e) {

  var json = JSON.parse(e.postData.contents);
  var replyToken = json.events[0].replyToken;

  var messages = [];

  if (json.events[0].type === "postback") {

    var data = json.events[0].postback.data;

    switch (getParameterByName("action", data)) {

      case "mc":
        messages.push(setupSticker(getParameterByName("correct", data)));
        break;

      case "kanji":
        messages.push(setupKanjiAnswer(getParameterByName("row", data)));
        break;

      default:
        return;
    };

  } else {

    switch (json.events[0].message.text) {

      case "問題":

        var questionRow = Math.floor(Math.random() * quizSheet.getLastRow());

        messages.push(setupQuestion(quizSheet.getRange(questionRow, questionColumn).getValue()));

        for (var i = choiceOneColumn; i <= choiceFourColumn; i++) {
          var choice = quizSheet.getRange(questionRow, i).getValue();
          var isCorrect = quizSheet.getRange(questionRow, answerColumn).getValue() === i;
          messages.push(setupChoice(i - 1, choice, isCorrect));
        };

        break;

      case "漢字":
        messages.push(setupKanjiQuestion());
        break;

      case "ウシィ":
        messages.push(setupTextMessage("ウシィ(「🐮・ω・)「🐮"));
        break;

      default:
        messages.push(setupRandomSticker());
        break;
    };
  };

  sendReply(replyToken, messages);
};


/**
 * Returns a text message.
 * @returns {string} A text message json.
 */
function setupTextMessage(message) {
  return {
    "type": "text",
    "text": message
  };
};


/**
 * Returns a random sticker.
 * @returns {string} A sticker message json
 *
 *  List of available LINE stickers:
 *  https://developers.line.biz/en/docs/messaging-api/emoji-list/
 * 
 */
function setupRandomSticker() {

  var min = 11069848;
  var max = 11069871;

  return {
    "type": "sticker",
    "packageId": "6359",
    "stickerId": Math.floor(Math.random() * (max - min) + min).toString()
  };
};


/**
 * Makes a request to send a reply.
 * @param {string} replyToken
 * @param {(string|Array)} messages
 */
function sendReply(replyToken, messages) {

  var endpoint = "https://api.line.me/v2/bot/message/reply";

  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + channelAccessToken,
  };

  var options = {
    'headers': headers,
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages
    }),
  };

  UrlFetchApp.fetch(endpoint, options);
};


/**
 * Returns the value of specific parameter.
 * @param {string} name Parameter name
 * @param {string} query Query string
 * @returns {string} Parameter value from the query string.
 */
function getParameterByName(name, query) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp(name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(query);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};