export const SAMPLE_PROJECT = [
  {
    "moduleId": "NM02001",
    "rank": 1,
    "template": "readonly",
    "content": {
      "title": "MISSION START",
      "body": "Welcome to the Jungle. Your task is to master Number Names. Follow the path to escape.",
      "visual": "/assets/modules/NM02001/image/NM02001_bg1.png"
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 2,
    "template": "activity-conversation",
    "conversation": {
      "characters": [
        { "name": "MAX", "color": "#2CC3BF", "dialogues": [{ "type": "text", "value": "Ray, look! This map says we need to spell the number names to find the way out!" }] },
        { "name": "RAY", "color": "#E85146", "dialogues": [{ "type": "text", "value": "Roger that. Reading coordinates now." }] }
      ]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 3,
    "template": "activity-mcq",
    "content": {
      "question": "Count the lions in the sector:",
      "options": [
        { "id": 1, "value": "Five" },
        { "id": 2, "value": "Six" },
        { "id": 3, "value": "Seven" }
      ]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 4,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "How do you write 523 in digits?",
      "sentence": [
        { "type": "text", "value": "The number is " },
        { "type": "input", "value": "{{answer}}" }
      ]
    }
  }
];