export const DEEP_SPACE_MODULE = [
  // SLIDE 1: Intro
  {
    "rank": 1,
    "template": "readonly",
    "content": {
      "title": "MISSION: NEBULA NINE",
      "body": "Welcome, cadets! We are approaching the Nebula Nine sector. Our mission is to collect Star-Crystals for the Galaxy Engine.",
      "visual": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
    }
  },
  // SLIDE 2: Characters Intro
  {
    "rank": 2,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2000",
      "characters": [
        { "name": "Cleo", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Cleo&backgroundColor=b6e3f4", "dialogues": [{ "type": "text", "value": "Systems check! Ari, how are the fuel cells looking?" }] },
        { "name": "Ari", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ari&backgroundColor=ffdfbf", "dialogues": [{ "type": "text", "value": "We have 20 cells in the main tank and 5 in the reserve." }] }
      ]
    }
  },
  // SLIDE 3: Task 1
  {
    "rank": 3,
    "template": "activity-mcq",
    "content": {
      "question": "How many fuel cells do they have in total? (20 + 5)",
      "options": [
        { "id": "A", "value": "25 Fuel Cells" },
        { "id": "B", "value": "205 Fuel Cells" },
        { "id": "C", "value": "15 Fuel Cells" }
      ],
      "correct": "A"
    }
  },
  // SLIDE 4: Asteroid Field
  {
    "rank": 4,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      "characters": [
        { "name": "Cleo", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Cleo&backgroundColor=b6e3f4", "dialogues": [{ "type": "text", "value": "Look out! Asteroids ahead. I see 12 on the left." }] },
        { "name": "Ari", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ari&backgroundColor=ffdfbf", "dialogues": [{ "type": "text", "value": "I see 12 more on the right! We need to dodge them all." }] }
      ]
    }
  },
  // SLIDE 5: Task 2
  {
    "rank": 5,
    "template": "activity-mcq",
    "content": {
      "question": "What is the double of 12? (12 + 12)",
      "options": [
        { "id": "A", "value": "24 Asteroids" },
        { "id": "B", "value": "22 Asteroids" },
        { "id": "C", "value": "20 Asteroids" }
      ],
      "correct": "A"
    }
  },
  // SLIDE 6: Landing
  {
    "rank": 6,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1614728853913-1e32005e3077?q=80&w=2000",
      "characters": [
        { "name": "Ari", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ari&backgroundColor=ffdfbf", "dialogues": [{ "type": "text", "value": "Touchdown! Look at those glowing crystals. I found a cluster of 30." }] },
        { "name": "Cleo", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Cleo&backgroundColor=b6e3f4", "dialogues": [{ "type": "text", "value": "I found a smaller cluster of 8. Let's combine them." }] }
      ]
    }
  },
  // SLIDE 7: Task 3
  {
    "rank": 7,
    "template": "activity-mcq",
    "content": {
      "question": "Add the crystal clusters together: 30 + 8",
      "options": [
        { "id": "A", "value": "38" },
        { "id": "B", "value": "308" },
        { "id": "C", "value": "83" }
      ],
      "correct": "A"
    }
  },
  // SLIDE 8: Alien Encounter
  {
    "rank": 8,
    "template": "readonly",
    "content": {
      "title": "ALIEN SIGNAL DETECTED",
      "body": "A friendly alien drone approaches. It wants to trade Star-Crystals for battery packs.",
      "visual": "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?q=80&w=2000"
    }
  },
  // SLIDE 9: Task 4
  {
    "rank": 9,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1614728853913-1e32005e3077?q=80&w=2000",
      "characters": [
        { "name": "Cleo", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Cleo&backgroundColor=b6e3f4", "dialogues": [{ "type": "text", "value": "The drone offers 45 crystals. We already have 38." }] },
        { "name": "Ari", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ari&backgroundColor=ffdfbf", "dialogues": [{ "type": "text", "value": "We need to sum these up carefully. 45 plus 38." }] }
      ]
    }
  },
  // SLIDE 10: Task 5
  {
    "rank": 10,
    "template": "activity-mcq",
    "content": {
      "question": "Calculate the sum: 45 + 38",
      "options": [
        { "id": "A", "value": "83" },
        { "id": "B", "value": "73" },
        { "id": "C", "value": "85" }
      ],
      "correct": "A"
    }
  },
  // SLIDE 11: Ship Repair
  {
    "rank": 11,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1541185933-710f50977434?q=80&w=2000",
      "characters": [
        { "name": "Ari", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ari&backgroundColor=ffdfbf", "dialogues": [{ "type": "text", "value": "The cargo hold is heavy! We need 100 power units to lift off." }] },
        { "name": "Cleo", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Cleo&backgroundColor=b6e3f4", "dialogues": [{ "type": "text", "value": "We have 60 units currently. How many more do we need?" }] }
      ]
    }
  },
  // SLIDE 12: Task 6
  {
    "rank": 12,
    "template": "activity-mcq",
    "content": {
      "question": "Solve for the missing part: 60 + ? = 100",
      "options": [
        { "id": "A", "value": "40 Units" },
        { "id": "B", "value": "30 Units" },
        { "id": "C", "value": "160 Units" }
      ],
      "correct": "A"
    }
  },
  // SLIDE 13: Final Flight
  {
    "rank": 13,
    "template": "activity-conversation",
    "conversation": {
      "background": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2000",
      "characters": [
        { "name": "Cleo", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Cleo&backgroundColor=b6e3f4", "dialogues": [{ "type": "text", "value": "Engines at full power! We are 500 lightyears from home." }] },
        { "name": "Ari", "url": "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ari&backgroundColor=ffdfbf", "dialogues": [{ "type": "text", "value": "If we jump 200 lightyears now, how far are we then?" }] }
      ]
    }
  },
  // SLIDE 14: Task 7
  {
    "rank": 14,
    "template": "activity-mcq",
    "content": {
      "question": "Subtract the distance: 500 - 200",
      "options": [
        { "id": "A", "value": "300 Lightyears" },
        { "id": "B", "value": "700 Lightyears" },
        { "id": "C", "value": "30 Lightyears" }
      ],
      "correct": "A"
    }
  },
  // SLIDE 15: Success
  {
    "rank": 15,
    "template": "readonly",
    "content": {
      "title": "MISSION ACCOMPLISHED",
      "body": "Excellent work, team! You used Addition to navigate the galaxy. The Galaxy Engine is now fully charged.",
      "visual": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
    }
  }
];