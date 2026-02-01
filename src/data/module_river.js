export const RIVER_MODULE = [
  // --- INTRO ---
  {
    "moduleId": "NM_RIVER_02",
    "rank": 1,
    "template": "readonly",
    "content": {
      "title": "THE DATA STREAM",
      "body": "We have reached the Data River. The bridge is broken. We must calculate the bridge segments to cross.",
      "visual": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 2,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000",
      "characters": [
        {
          "name": "ARJUN",
          "color": "#FBBF24",
          "dialogues": [{ "type": "text", "value": "The bridge needs exactly 100 data blocks to stabilize." }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Arjun"
        },
        {
          "name": "AAVYA",
          "color": "#A78BFA",
          "dialogues": [{ "type": "text", "value": "I have 60 blocks in my inventory. How many more do we need?" }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Aavya"
        }
      ]
    }
  },

  // --- TASK SET 1: MCQ (ADDITION) ---
  {
    "moduleId": "NM_RIVER_02",
    "rank": 3,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Calculate missing blocks: 60 + ? = 100" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "40" }], "isCorrect": true },
        { "id": 2, "contents": [{ "type": "text", "value": "30" }], "isCorrect": false },
        { "id": 3, "contents": [{ "type": "text", "value": "50" }], "isCorrect": false }
      ]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 4,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Arjun adds 25 more. What is 100 + 25?" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "125" }], "isCorrect": true },
        { "id": 2, "contents": [{ "type": "text", "value": "225" }], "isCorrect": false }
      ]
    }
  },

  // --- TASK SET 2: CONVERSATION ---
  {
    "moduleId": "NM_RIVER_02",
    "rank": 5,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000",
      "characters": [
        {
          "name": "ARJUN",
          "color": "#FBBF24",
          "dialogues": [{ "type": "text", "value": "Watch out! Data Pirates are subtracting our supplies!" }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Arjun"
        }
      ]
    }
  },

  // --- TASK SET 3: INPUT (SUBTRACTION) ---
  {
    "moduleId": "NM_RIVER_02",
    "rank": 6,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "We had 200 energy. Pirates took 50. Left?",
      "sentence": [{ "type": "input", "value": "150" }]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 7,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "Solve: 80 - 30 = ?",
      "sentence": [{ "type": "input", "value": "50" }]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 8,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "Solve: 1000 - 1 = ?",
      "sentence": [{ "type": "input", "value": "999" }]
    }
  },

  // --- TASK SET 4: ADVANCED LOGIC ---
  {
    "moduleId": "NM_RIVER_02",
    "rank": 9,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Bridge Limit: 900. Current: 850. Add max?" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "50" }], "isCorrect": true },
        { "id": 2, "contents": [{ "type": "text", "value": "100" }], "isCorrect": false }
      ]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 10,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Cost of 4 batteries at ₹20 each?" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "₹80" }], "isCorrect": true },
        { "id": 2, "contents": [{ "type": "text", "value": "₹60" }], "isCorrect": false }
      ]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 11,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "Double of 15 is?",
      "sentence": [{ "type": "input", "value": "30" }]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 12,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "Half of 100 is?",
      "sentence": [{ "type": "input", "value": "50" }]
    }
  },

  // --- OUTRO ---
  {
    "moduleId": "NM_RIVER_02",
    "rank": 13,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000",
      "characters": [
        {
          "name": "AAVYA",
          "color": "#A78BFA",
          "dialogues": [{ "type": "text", "value": "We crossed safely! The logic bridge held up." }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Aavya"
        }
      ]
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 14,
    "template": "readonly",
    "content": {
      "title": "CROSSING SUCCESSFUL",
      "body": "You have mastered Basic Operations. New region unlocked.",
      "visual": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000"
    }
  },
  {
    "moduleId": "NM_RIVER_02",
    "rank": 15,
    "template": "readonly",
    "content": {
      "title": "MODULE COMPLETE",
      "body": "Saving progress... Uploading to Neural Net...",
      "visual": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
    }
  }
];