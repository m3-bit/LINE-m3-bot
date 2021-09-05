var quizSheet = spreadsheet.getSheetByName("quiz");

var questionColumn = 1;
var choiceOneColumn  = 2;
var choiceFourColumn  = 5;
var answerColumn   = 6;

/**
 * Returns a question message.
 * @param {string} question
 * @returns {string} A flex message in json.
 */
function setupQuestion(question) {
  return {
    "type": "flex",
    "altText": "問題",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "問題",
            "color": "#8C8C8C",
            "size": "sm",
          },
          {
            "type": "text",
            "text": question,
            "wrap": true,
            "weight": "bold",
            "gravity": "center",
            "size": "xl"
          }
        ]
      }
    }
  };
};


/**
 * Returns a choice message.
 * @param {string} id - A choice number.
 * @param {string} item - A choice item.
 * @param {string} isCorrect - true or false.
 * @returns {string} A flex message in json.
 */
function setupChoice(id, item, isCorrect) {
  return {
    "type": "flex",
    "altText": "選択肢",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "選択肢 " + id,
            "color": "#8C8C8C",
            "size": "sm"
          },
          {
            "type": "text",
            "text": item,
            "wrap": true,
            "weight": "bold",
            "gravity": "center",
            "size": "xl"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "回答する",
              "data": "action=mc&correct=" + isCorrect
            },
            "style": "primary",
            "margin": "10px"
          }
        ]
      }
    }
  };
};


/**
 * Returns either Yes or No sticker.
 * @param {string} isCorrect true or false.
 * @returns {string} A Yes sticker or a No sticker in json.
 */
function setupSticker(isCorrect) {

  return {
  "type": "sticker",
  "packageId": "789",
  "stickerId": isCorrect === "true" ? "10859" : "10860"
  };
};