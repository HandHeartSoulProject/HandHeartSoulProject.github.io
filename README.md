# Installation
## How to run the repository locally
1. If not already installed, install node: [https://nodejs.dev/en/download/](https://nodejs.dev/en/download/)
1. Install yarn globally: `npm install -g yarn`
2. Clone the repository onto your computer
3. Navigate into the folder: `cd Hand-Heart-and-Soul`
4. Install dependencies: `yarn`
5. Start the development server: `yarn dev`

## How to [generate types](https://supabase.com/docs/guides/api/generating-types)
1. Log in to the supabase CLI: `npx supabase login`
2. Generate the types: `yarn gen`

## Creating a production build
1. Run `yarn build` to create a build
2. Run `npx serve -s dist` to run the build

## Deploying
Run `yarn run deploy` to create a new build & deploy to github pages


# Release Notes
## Version 0.2.0
### New Features
 - Updated events table to use new schema
 - Added navbar to navigate between pages
 - Added create users page to create new users
 - Added users page to view and manage existing users
   - This uses a customized modal to make edits to a user's email or role
### Bug Fixes
 - The updated routing system avoids bugs that would occur with HashRouter (where typing in a different url would sometimes not bring the user to a different page)
### Known Issues
 - The events table extends off the page on smaller screens

## Version 0.1.0
### New Features
 - Added authentication screen (currently unfunctional)
 - Created basic event display table
### Bug Fixes
 - N/A