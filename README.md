# Math Worksheet - Rounding Off to Nearest 10

A simple React app for practicing rounding numbers to the nearest 10.  
Includes a quiz-style worksheet with automatic scoring and answer review.

## Features

- Interactive quiz with instant feedback
- Score calculation and summary dialog
- Prevents submission unless all questions are answered
- Reset functionality to retake the quiz

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the app locally:**

   ```bash
   npm run dev
   ```

### Build for production

```bash
npm run build
```

The build will be in the `dist` folder (for Vite).

## File Structure

```
src/
  ├─ App.jsx        # Main React component
  ├─ questions.js   # Questions data
  ├─ App.css        # Styles
  └─ ...
public/
  └─ index.html     # Main HTML template
```

## Customization

- **To change questions:**  
  Edit `src/questions.js`.

## License

MIT

---

**Author:**  
Annur Eirfan

**Credits:**  
www.mathinenglish.com for sample content inspiration.
