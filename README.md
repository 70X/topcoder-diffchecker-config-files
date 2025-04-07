# Hercules - Network Config frontend

This was a [challenge on the TopCoder platform](https://www.topcoder.com/challenges/cb796805-44e8-4a8e-81d8-a52bd832d776) in July 2020 where I placed third. \
[You can view my account here](https://profiles.topcoder.com/70X).

## Project Overview
The client would like to build a web application that helps them compare the configs for network devices against a baseline config that can be either on another network path or in Github. 

For further info please take a look at the [CHALLENGE.md](./CHALLENGE.md) file

## Run locally

1. `npm i`
2. `npm start`

## Eslint check

`npm run eslint`

## For Heroku environment

1. `npm run heroku-postinstall`: to deploy in dist/ production code
2. `npm run heroku-start`: to run server.js express and take a look at http://localhost:8080 if everything is ok

# API

For the test environment `apiUrl` is not set, so the app responses to http://localhost:4200/api/...

```
[POST] ${environment.apiUrl}/api/files-upload
  - request: { source: File, target: File }

[PUT]  ${environment.apiUrl}/api/filter-in
[PUT]  ${environment.apiUrl}/api/filter-out
  - request: string[]
```


## Mock Data
There is an interceptor which intercepts any API calls. \
You can customized or turned off changing this line:
```js
// if you assign this string ['/files-upload'] you can intercept only the '.../api/files-upload' calls because it matches with the API
private API_PATH_ALLOWED: string[] = ['/'];

// so if you assign an empty array of string, the mock interceptor will turn off
private API_PATH_ALLOWED: string[] = [];
```
You can modify these json files to change the response for the three API call:
```
src/assets/api/files-upload.POST.json
src/assets/api/filter-in.PUT.json
src/assets/api/filter-out.PUT.json
```
To verify that everything is ok with API, you can find body data requests in the Console:

![Console](/docs/Console.png)

## Data Diff Response 
The responses are all the same with this structure:
```
{ source: string[], target: string[], diff: DiffObj[]}
```
Where DiffObj is:
```
{ source: string, target: string, action: string }
```
Possible values of source and target are:
- single number (in string type) refers to single line in the file
- range of number separated from a comma refer to a range of lines in the file

**The number of values are inclusive and start from 0. Please take a look at the example sections.** 

Possible values of action are:
- 'a': add,
- 'd': deleted,
- 'c': changes

These describe every changes from source to target.\
According to action you can find these possible scenarios:
- Action of add: source has to be a single value and target could be a range of values
- Action of delete: source could be a range of values and target has to be a single value
- Action of change: source and target have to be a single value

### Example Action:
```
    {
      "source": "0",
      "target": "0,5",
      "action": "a"
    },
```
This means that target has 6 new lines, from 0 to 5 and in source, this changes start from line 0.

### Example Delete:
```
    {
      "source": "4,6",
      "target": "10",
      "action": "d"
    },
```
This means that source had 3 lines from 4 to 6 that target doesn't have anymore at line 10.

### Example Change:
```
    {
      "source": "9",
      "target": "12",
      "action": "c"
    }
```
This means that source at line 9 has something different from target at line 12.

## APP UI

It starts with two huge buttons in order to upload source and target. You have to select both to continue.

It keeps original files in cache so it is possible to reset changes are made by filters through the (x) button on the right of the corner:

![Console](/docs/Header.png)

On the left of the corner you can go back to change files uploaded every time.

### Filters

Filters are pretty simple. According to requirements is possible to include/exclude some lines from the files passing to the right API (*see API section*). For multiple lines you can separate them from a comma. 
![Console](/docs/Filters.png)

### Search By
To search a text in both source and target files. The number of occurrances are double if search text is find in both files.
![Search](/docs/SearchBy.png)

