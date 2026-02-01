# LocEngine V5: AI-Driven Curriculum Architect

LocEngine is a "System-First" authoring platform that decouples **Pedagogical Logic** (Math/Science tasks) from **Narrative Skin** (Themes/Characters). It uses Generative AI (Gemini Pro) to orchestrate lessons based on strict schemas.

---

## 🏗 System Architecture

### 1. The Core Philosophy: "Everything is a Task"
We do not build "pages"; we build a linear **Task Stream**. A lesson is simply a JSON array of Task Objects. The Player component indiscriminately renders these objects based on their `template` ID.

### 2. The Data Flow
1.  **Teacher Intent:** User selects constraints via the **Lesson Wizard** (Grade, Topic, Theme, Characters).
2.  **AI Orchestration:** The "Prompt Engineer" middleware constructs a strict prompt for Gemini Pro.
3.  **JSON Generation:** Gemini returns a valid JSON array adhering to the `Task Schema`.
4.  **The Editor:** The teacher polishes the raw AI output.
5.  **The Player:** A dedicated route (`/play/:id`) renders the lesson for students.

---

## 🧩 The MVP Stack

* **Framework:** React + Vite
* **Styling:** Tailwind CSS (Cyberpunk/Glassmorphism Theme)
* **Icons:** Lucide React
* **AI Engine:** Google Gemini Pro (via API)
* **Persistence:** LocalStorage (MVP) -> Firestore (V2)

---

## 📜 Task Schema & Templates

We currently support 4 core templates for the MVP Math Module:

| Template ID | Description | Usage |
| :--- | :--- | :--- |
| `readonly` | Static content (Text/Image/Video) | Story setting, introductions, explanations. |
| `activity-conversation` | Character Dialogue | Concept building through narrative (e.g., Hero teaching Sidekick). |
| `activity-mcq` | Multiple Choice Question | Assessments, logic checks. |
| `activity-input` | Text/Number Input | Practice problems requiring specific answers. |

### Sample Task Object
```json
{
  "taskId": "uuid-1234",
  "type": "activity-conversation",
  "config": {
    "theme": "space_exploration",
    "background": "mars_surface_day"
  },
  "content": {
    "script": [
      { "speaker": "hero", "text": "Captain! We have 1/2 tank of fuel left." },
      { "speaker": "sidekick", "text": "We need 3/4 to reach orbit. How much more do we need?" }
    ]
  }
}

```

---

## 🚀 Roadmap

### Phase 1: The Foundation (Completed)

* [x] **Registry Engine:** Dynamic component rendering based on JSON.
* [x] **Editor UI:** Split-screen (Code + Preview) editing.
* [x] **Dashboard:** Project management and archives.
* [x] **Visual System:** Cyberpunk styling and typography.

### Phase 2: The AI Integration (Current Sprint)

* [ ] **Lesson Wizard:** UI for selecting Grade, Topic, Theme, Characters.
* [ ] **Prompt Engineer Service:** Logic to convert UI selections into Gemini prompts.
* [ ] **Schema Validator:** Ensure AI output matches our `registry.jsx`.

### Phase 3: The Player & Distribution

* [ ] **Player Route:** Read-only view (`/play/:id`) hiding all editor tools.
* [ ] **Deployment:** Public access via GitHub Pages.

---

## 🛠 Setup & Commands

```bash
# Install dependencies
npm install

# Run Development Server
npm run dev

# Build for Production
npm run build

# Deploy to GitHub Pages
npm run deploy

```

---

## 🎨 Design System

* **Font:** JetBrains Mono (Code/UI), Inter (Body).
* **Colors:** Deep Cyber Black (`#02040a`), Cyan (`#22d3ee`), Fuchsia (`#d946ef`).
* **Effects:** Glassmorphism, Neon Glows, Antialiased Typography.

**Shall I proceed with creating the "Lesson Wizard" (Phase 2) now that we have locked the scope?**

```
