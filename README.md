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
## Version 0.4.0
### New Features
 - Added restrictions to the admin portal to only allow admins or employees to view all data
 - Added data visualization tab to allow users to view data in a more visual way
### Bug Fixes
 - Fixed a few typescript errors by increasing verbosity of type definitions
### Known Issues
 - When switching from community events to children's events in the data visualization tab, if food pounds is selected an error will occur

## Version 0.3.0
### New Features
 - Added new events table to allow users to see both childrens and community events
 - Added user input feedback to allow only email users with hhs domains to take employee/admin roles
### Bug Fixes
 - Changed some styling issues and changed theme
### Known Issues
 - There are still some future fixes that we need to implement to protect the database schema
 
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
