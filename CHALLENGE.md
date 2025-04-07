## Project Overview:
The client would like to build a web application that helps them compare the configs for network devices against a baseline config that can be either on another network path or in Github.

The comparison will be just a diff of the two files and will be displayed in the web app with some additional searching and filtering functionality.

This challenge will implement a prototype using Angular Material (https://material.angular.io/) that we can eventually tie into the backend services

## Challenge Overview:
For this challenge we are going to build a simple Angular Material UI app that meets some basic diff display requirements that can later be skinned with the client's design language.

A separate challenge will build a backend REST service that can accept a file upload of both a source and target file for comparison.  The response will be an object that allows the caller (this challenge) to display the diffs properly.  The backend will be integrated into the results of this challenge in a future challenge.

## Technology:
We will target the latest version of Angular and the Material toolkit.  Note that you are free to use any MIT or BSD licensed npm modules that could help with the requirements here.  

## Requirements:
The user will be expected to select two files:
- Source file
- Target file

They will upload those, along with the filter strings (detailed below) and the UI will display the diff, like you would see on Github or in any comparison app, like Kaleidoscope or File Merge on macOS, or WinDiff or WinMerge on Windows.

## UI
Note that the UI is not fully defined.  You as the competitor are free to define this a bit, as long as it's easy to use, meets the requirements, and uses Angular Material.  A sample screen will be provided in the forum, but it is not complete and shows things that aren't required.  You can use the sample screen for reference though.

We need to show these items in the diff display:
- An indication if a line is in the source but not the target
- An indication if a line is in the target but not the source
- An indication of any diffs inside of a given line between the source and target, if they both contain a given line

## General UI requirements:
### Scrolling
The user should be able to scroll and *both* the source and target will scroll together, allowing the user to see the diffs easily.
Line numbers
Please ensure that line numbers are displayed, to make it easy to track the changes

### Searching
The searching should be a text box above the diffs that the user can use to search for specific text.  Once they enter the value and hit next, it will highlight the next instance of that string from wherever the cursor is and the options to find the "next" or "prev" will be available in the menu.  The scrolling should happen automatically, and both the source and target should scroll together.

### Filter out
The user will be able to provide a list of strings to the REST API to filter out of the diff.  When the user selects to exclude a particular string; the displayed values are refreshed and any lines containing that string are no longer visible.  We need to support a list of filter out strings in the request, and any line that does contain a string from the filter out list will be removed from the response.

### Filter in
Similar to the list of strings to filter out, the user can also provide a list of strings to the REST API to filter in, meaning that any line that doesn't contain a string from the filter in list will be removed from the response.

### Heroku deployment
Please ensure your solution is easily deployable to Heroku via a simple push.  This will make it easy to demo to the client for their approval.

### Unit tests
Unit tests are not required for this challenge.

### UI mockup
A sample mockup will be provided in the forum, for reference

### Mock data
Please ensure that data to represent a diff is read from a JSON file in your submission. A future challenge will tie the frontend into the backend we're also developing.

## Scoring guidelines

### Major requirements:
- UI looks good, is intuitive, and easy to use
- UI is implemented and meets the requirements
- Code passes eslint

### Minor requirements:    
- Internal code documentation is clear and complete
- Code is easily deployable to Heroku

### Submission must include
- Frontend source code
- README.md covering the deployment and how to ensure the app is running
