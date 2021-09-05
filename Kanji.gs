var listSheet = spreadsheet.getSheetByName("list");

var kanjiColumn = 1;
var furiganaColumn = 2;
var wikiColumn = 3;

/**
 * Returns a random Kanji Quiz.
 * @returns {string} A template message in json.
 */
function setupKanjiQuestion() {

  var questionRow = Math.floor(Math.random() * listSheet.getLastRow());

  return {
    "type": "template",
    "altText": "難読漢字",
    "template": {
      "type": "buttons",
      "title": listSheet.getRange(questionRow, kanjiColumn).getValue(),
      "text": "この漢字の読み方は？",
      "actions": [
        {
          "type": "postback",
          "label": "答えを見る",
          "data": "action=kanji&row=" + questionRow
        }
      ]
    }
  };
};


/**
 * Returns a kanji answer message.
 * @param {string} data A row number.
 * @returns {string} A template message in json.
 */
function setupKanjiAnswer(data) {

  var row = parseInt(data)

  return {
    "type": "template",
    "altText": "難読漢字",
    "template": {
      "type": "buttons",
      "title": listSheet.getRange(row, furiganaColumn).getValue(),
      "text": listSheet.getRange(row, kanjiColumn).getValue() + "の読み方",
      "actions": [
        {
          "type": "uri",
          "label": "Wikipedia",
          "uri": listSheet.getRange(row, wikiColumn).getValue()
        }
      ]
    }
  };
};