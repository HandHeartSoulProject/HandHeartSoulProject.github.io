# Installation
## How to run the repository locally
1. Open the terminal application
2. If not already installed, [install git](https://github.com/git-guides/install-git)
3. If not already installed, [install node](https://nodejs.dev/en/download/)
4. In terminal, navigate to the folder you want to clone the repository into: `cd {folder path}`. To view a list of files & folders in the current directory, run `ls` on Mac/Linux or `dir` on Windows
5. Clone the repository onto your computer: `git clone {repository url}.git`
6. Navigate into the folder: `cd Hand-Heart-and-Soul`
7. Install yarn globally: `npm install -g yarn`
8. Install dependencies: `yarn`
9. Start the development server: `yarn dev`

## How to [generate types](https://supabase.com/docs/guides/api/generating-types)
1. Log in to the supabase CLI: `npx supabase login`
2. Generate the types: `yarn gen`

## Creating a production build
1. Run `yarn build` to create a build
2. Run `npx serve -s dist` to run the build

## Deploying
 - To configure github pages, go to the settings tab of the repository. Then underneath Code and Automation, select the Pages tab on the left. You can configure a custom domain (along with other settings) there.
 - Run `yarn run deploy` to build fresh & deploy to github pages

## Troubleshooting
 - If you have the dependencies installed but the project still won't run, try deleting the node_modules folder and running `yarn` again
 - When in doubt, try googling the error and there will often be a Stack Overflow post with the solution

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
