export const JUNGLE_MODULE = [
  // --- INTRO SEQUENCE ---
  {
    "moduleId": "NM02001",
    "rank": 1,
    "template": "readonly",
    "content": {
      "title": "MISSION START",
      "body": "Welcome to Sector 7. Your task is to master Number Names to unlock the ancient gate.",
      "visual": "https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2000"
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 2,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2000",
      "characters": [
        {
          "name": "MAX",
          "color": "#2CC3BF",
          "dialogues": [{ "type": "text", "value": "Ray, look! The gate has a keypad. We need to enter the correct code." }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Max"
        },
        {
          "name": "RAY",
          "color": "#E85146",
          "dialogues": [{ "type": "text", "value": "I see the clues. They are written in 'Number Names'. Let's decipher them." }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ray"
        }
      ]
    }
  },

  // --- TASK SET 1: MCQ (COUNTING) ---
  {
    "moduleId": "NM02001",
    "rank": 3,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "How many stone lions are guarding the entrance?" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "Five" }], "isCorrect": false },
        { "id": 2, "contents": [{ "type": "text", "value": "Seven" }], "isCorrect": true },
        { "id": 3, "contents": [{ "type": "text", "value": "Ten" }], "isCorrect": false }
      ]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 4,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Identify the number for: Twenty-Three" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "32" }], "isCorrect": false },
        { "id": 2, "contents": [{ "type": "text", "value": "23" }], "isCorrect": true },
        { "id": 3, "contents": [{ "type": "text", "value": "203" }], "isCorrect": false }
      ]
    }
  },

  // --- TASK SET 2: CONVERSATION BRIDGE ---
  {
    "moduleId": "NM02001",
    "rank": 5,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1599593259877-6225b969d763?q=80&w=2000",
      "characters": [
        {
          "name": "RAY",
          "color": "#E85146",
          "dialogues": [{ "type": "text", "value": "The first lock is open! But the path splits into three." }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ray"
        }
      ]
    }
  },

  // --- TASK SET 3: INPUT (FILL BLANKS) ---
  {
    "moduleId": "NM02001",
    "rank": 6,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "Type the digits for: <span style='color:#22d3ee'>One Hundred</span>",
      "sentence": [{ "type": "input", "value": "100" }]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 7,
    "template": "activity-fill-blanks",
    "fillBlanks": {
      "question": "Type the digits for: <span style='color:#d946ef'>Five Hundred Fifty</span>",
      "sentence": [{ "type": "input", "value": "550" }]
    }
  },

  // --- TASK SET 4: ADVANCED MCQ ---
  {
    "moduleId": "NM02001",
    "rank": 8,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Which number is larger?" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "99" }], "isCorrect": false },
        { "id": 2, "contents": [{ "type": "text", "value": "105" }], "isCorrect": true },
        { "id": 3, "contents": [{ "type": "text", "value": "88" }], "isCorrect": false }
      ]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 9,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "What comes after 399?" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "398" }], "isCorrect": false },
        { "id": 2, "contents": [{ "type": "text", "value": "400" }], "isCorrect": true },
        { "id": 3, "contents": [{ "type": "text", "value": "300" }], "isCorrect": false }
      ]
    }
  },

  // --- TASK SET 5: READONLY LORE ---
  {
    "moduleId": "NM02001",
    "rank": 10,
    "template": "readonly",
    "content": {
      "title": "ARTIFACT FOUND",
      "body": "You discovered a 'Golden Abacus'. It adds +50 XP to your inventory.",
      "visual": "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?q=80&w=2000"
    }
  },

  // --- TASK SET 6: RAPID FIRE MCQ ---
  {
    "moduleId": "NM02001",
    "rank": 11,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Select: Six Hundred" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "600" }], "isCorrect": true },
        { "id": 2, "contents": [{ "type": "text", "value": "60" }], "isCorrect": false }
      ]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 12,
    "template": "activity-mcq",
    "mcq": {
      "question": {
        "contents": [{ "type": "text", "value": "Select: Ninety-Nine" }]
      },
      "options": [
        { "id": 1, "contents": [{ "type": "text", "value": "909" }], "isCorrect": false },
        { "id": 2, "contents": [{ "type": "text", "value": "99" }], "isCorrect": true }
      ]
    }
  },

  // --- OUTRO ---
  {
    "moduleId": "NM02001",
    "rank": 13,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000",
      "characters": [
        {
          "name": "MAX",
          "color": "#2CC3BF",
          "dialogues": [{ "type": "text", "value": "We did it! The path to the river is clear." }],
          "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Max"
        }
      ]
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 14,
    "template": "readonly",
    "content": {
      "title": "MODULE COMPLETE",
      "body": "System Sync: 100%. Data Uploaded. Proceed to Module 2.",
      "visual": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000"
    }
  },
  {
    "moduleId": "NM02001",
    "rank": 15,
    "template": "readonly",
    "content": {
      "title": "RANK UP",
      "body": "Current Rank: DATA CADET. Next Rank: CYPHER SCOUT.",
      "visual": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000"
    }
  }
];