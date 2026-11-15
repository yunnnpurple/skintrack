# AGENTS.md — SkinTrack Project Guidelines

## 1. Project Overview

SkinTrack is a personal skincare management and tracking website.

The goal is to help users organize their skincare products, plan morning and evening routines, and track their daily skincare habits.

The website should be simple, intuitive, and suitable for everyday use.

## 2. Technology Requirements

- Use HTML5, CSS3, and vanilla JavaScript.
- Do not require a backend server for the initial version.
- Use browser localStorage to save user data.
- The website must work on GitHub Pages.
- Do not include API keys or other secrets in frontend code.
- Avoid unnecessary frameworks and dependencies.

## 3. Website Structure

The website should contain three main sections:

### Dashboard

- Display today's date.
- Show morning and evening skincare routines.
- Allow users to mark steps as completed.
- Display daily completion progress.

### My Products

- Allow users to add products by entering brand and product name.
- Display all saved skincare products.
- Allow users to edit or delete existing products.
- Allow users to assign products to morning or evening routines.

### Tracker

- Save completed skincare activities by date.
- Display previous skincare records.
- Show a simple weekly completion summary.

## 4. Design Guidelines

- Use a clean, minimal, skincare-inspired design.
- Main colors: baby blue (#DCEBF5), soft white (#F5F9FC), coffee brown (#725747), and milk tea brown (#A88B78).
- Use consistent typography, spacing, and rounded cards.
- The interface should support Traditional Chinese.
- The website must be responsive on desktop and mobile devices.
- Navigation and buttons should be clear and easy to use.

## 5. File Organization

Use the following structure:

```text
skintrack/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── storage.js
├── assets/
│   └── images/
├── AGENTS.md
└── README.md
```

File naming rules:

- Use lowercase English filenames.
- Use hyphens for multiword filenames.
- Keep HTML, CSS, and JavaScript in separate files.
- Store images in the assets/images directory.
- Do not create unnecessary duplicate files.

## 6. Data Structure

Each skincare product should use a consistent data structure.

Example:

```json
{
  "id": "product-001",
  "brand": "Example Brand",
  "name": "Hydrating Serum",
  "category": "Serum",
  "routine": ["morning", "evening"]
}
```

- Each product must have a unique ID.
- Store user products and tracking records in localStorage.
- Validate user inputs before saving.
- Preserve existing saved data when adding new features.

## 7. Development Rules for AI

When modifying this project, AI must follow these rules:

1. Read AGENTS.md before making changes.
2. Understand the existing file structure and functionality.
3. Reuse existing components and functions whenever possible.
4. Do not remove working features unless explicitly requested.
5. Keep code readable and add comments for complex logic.
6. Follow the existing design system and naming conventions.
7. Avoid unrelated changes.
8. Update README.md when important functionality changes.
9. Test affected functionality after every modification.
10. Explain which files were modified and why.

## 8. Testing Requirements

Before completing a task, verify that:

- The website loads correctly.
- Navigation between sections works.
- Users can add, edit, and delete products.
- Daily skincare steps can be checked and unchecked.
- Saved data remains available after refreshing the page.
- The layout works on both mobile and desktop.
- No unnecessary errors appear in the browser console.

## 9. Future Expansion

The project may later include:

- AI-powered product information search.
- Automatic ingredient and usage information lookup.
- Personalized skincare recommendations.
- Automatic morning and evening routine planning.
- Weekly skincare scheduling.
- Skin condition tracking and visualization.

When implementing new features:

1. Review the existing architecture.
2. Follow the same design and naming conventions.
3. Add new functions without breaking existing ones.
4. Extend existing data structures carefully.
5. Update documentation and test the new functionality.

## 10. Expected AI Workflow

For every new development request:

1. Read AGENTS.md.
2. Identify the requested feature.
3. Review relevant existing files.
4. Plan the smallest necessary changes.
5. Implement the feature.
6. Test the result.
7. Summarize the changes and any remaining limitations.

The goal is to make SkinTrack easy to maintain, reuse, and extend consistently over time.
