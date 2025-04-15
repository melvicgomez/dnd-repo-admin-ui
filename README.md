This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm i # install dependencies
npm run dev # run the app locally

# or

npm run build
npm run start # serve the build files

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- NextJS
- DnD Kit for drag-n-drop features
- Lucide React for icons
- TailwindCSS for styling utility
- uuid for ID generation
- Zustand for state management

## Features
1. Add new field (by default "Text" field)
2. Added new field are *read-only* and *draggable*
3. Field are dragged to other browser or tab are changed to *Edit* state/mode
4. Field in *Edit* state/mode are not draggable

## Production Deployment

Deployed in Vercel and routed in my AWS account. You can access the production in this URL https://dnd.melvicgomez.com/