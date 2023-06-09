## Transkriptorium Prototype 

The App simulates a simple user dashboard with a list of drafts.
There's only one draft that's being consumed from a static JSON file

## Usage

1. Click "Last Draft" or double click the draft Card to access the Editor
2. Refresh the page if you change the window size to fit to screen (this behavior could be automated in the future)
3. To restore to initial state (discard all changes you've made) you would have to manually clear the local storage

:warning: The editor is not yet mobile compatible.

- The editor resizes the image and polygons in every refresh of the page to fit the whole screen

For small devices the image gets distorted so I opted to limit the minimum viewFinder width to 768px (medium and up devices).
As a user:
\*If you change the window size below 768px the viewFinder will not fit in the screen.

---

### how to clear local storage

1. press (ctrl + shift + i) on the browser (or right click on browser and select "inspect") to enter inspect mode
2. on console tab run
   ```
   localStorage.clear()
   ```

### on why I use this approach

Surely you are thinking (or not) why not:
a) use session storage or b) provide the user with a "restore to default" button?

The answer is simple, tit doesn't make sense when you think about the final use of the App.

- I want the user to have the option to retrieve the session in case of accidentally closing the tab or window.
- Can you imagine another button floating there in an already crowded interface? It's just bad user experience to me. Besides, how many times the user would use this hypothetical button?

The solution to this problem in the real app is to just delete the whole draft and create another one. Of course this another problem, to tackle, another day.

## Installation

## Requirements

Before installing the App, you need to ensure that Node.js is installed on your system. If you haven't installed Node.js yet, you can download it from the official Node.js website: https://nodejs.org/es/download.

### How to run it

Clone or download this repository

On the project root folder run

```
npm install
npm run dev
```

Check it on `http://localhost:5173/`.

## Commands

- `npm run dev`: Runs App in dev mode.
- `npm test`: Runs testing environment.
- `npm run build`: Build for production
- `npm run preview`: Runs production build locally
