# Heading!
## Slightly smaller heading...
### tiny heading
***why hello there***

_this is italic_ and *so is this*

__this is bold__ and **so is this**

*look we can even do them __inside__ each other!*

[link to formatting guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

<sub>subscript</sub><sup>superscript</sup> ~~I want you to be able to read this while pretending that you can't~~

> indenting (handy for quotes!)
## Notes for Websocket
I have learned: take the easy path if it means you'll get it done. Sometimes you'll find some really cool ideas along the way!
## Notes for Login
I have learned: try all the solutions, even if you think they don't apply to you. They might be more applicable than they look. Also ask for help! TAs are awesome.
## Notes for Service
I have learned: It's surprisingly really really easy to call an api. All you need is the url.
...I should definitely go back and make that better though.
Also I have learned: make one update projects function that calls the api to save the updated projectlists, and call it whenever the user makes an edit.
## Notes for React
This past weekend I learned that you need your images folder to be named 'public' in order to use it. Who knew! Also localStorage is very useful, modals are surprisingly easy with bootstrap. and npm run dev

## Notes for Sept. 11, 2024:
Today I learned to always pull from Github when I start working and commit whenever I make large changes, or at the end of a coding session.

command for updating startup:
> ./deployFiles.sh -k yourpemkey -h yourdomain -s startup
> 
from inside startup directory

Midterm Notes:
Midterm Questions
- In the following code, what does the link element do?
  - links to external sources like a stylesheet
- In the following code, what is the difference between the #title and .grid selector?
  - \# for id, . for class
- In the following code, what is the difference between padding and margin?
  - padding internal to the element borders, margin outside
- Given this HTML and this CSS how will the images be displayed using flex?
  - flex direction row: up and down
  - justify is sideways, align up and down
- What does the following padding CSS do?
- What does the following code using arrow syntax function declaration do?
  - ()=> "27"; //returns "27"
  - ()=>{27;} //returns undefined
  - ()=>{return "27";} //returns "27"
- What does the following code using map with an array output?
  - ???
- What does the following code output using getElementByID and addEventListener?
- What does the following line of Javascript do using a # selector?
- Which of the following are true? (mark all that are true about the DOM)
  - DOM: everything in HTML has an object in DOM, structured like a tree. Makes it accessible to JavaScript.
- By default, the HTML span element has a default CSS display property value of:
  - inline, often used for giving emphasis to a certain part of text
- How would you use CSS to change all the div elements to have a background color of red?
  div {
    background-color: red;
  }
- How would you display an image with a hyperlink in HTML?
  - img alt="Rainbow over Field" src="https://c.tadst.com/gfx/600x337/rainbow.jpg?1"
- In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
  - content, padding, border, margin
- Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
  - color:green; prehaps use span with a style?
  -  span style="color:green;"> html </span
- What will the following code output when executed using a for loop and console.log?
- How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
  - get element by id
  - setAttribute(color, "green")
  - or via style? or insertRule?
- What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
  - p,ol,ul,h2,h1,h3
- How do you declare the document type to be html?
  - !DOCTYPE html
- What is valid javascript syntax for if, else, for, while, switch statements?
  - if (a === 1) {
    //...
  } else if (b === 2) {
    //...
  } else {
    //...
  - a === 1 ? console.log(1) : console.log('not 1'); //ternary operator
  - for (name in thing) to iterate over an objects properties, using it on an array will iterate over indexes
  - for and while loops same as in Java
  - use for of to iterate over the items of a list, array, map, etc.
- What is the correct syntax for creating a javascript object? Is it possible to add new properties to javascript objects?
  - const obj = new Object({ a: 3 });
    obj['b'] = 'fish';
    obj.c = [1, 2, 3];
  - "properties and functions of classes private by prefixing them with a #." (see https://learn.cs260.click/page/javascript/objectClasses/objectClasses_md)
- If you want to include JavaScript on an HTML page, which tag do you use?
  - script
- Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
  - use innerHTML?
- Which of the following correctly describes JSON?
  - way to store and transfer objects as strings. JavaScript Object Notation
- What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
  - chmod - let's us modify permissions
  - pwd - print working direction
  - vim - enter vi editor
  - cd -change directory
  - ls - list contents of directory
  - nano - enters nano editor for file; creates file if not already existing
  - mkdir - creates directory
  - mv - moves file/director
  - rm - removes file
  - man - lets us view man pages
  - ssh - secure shell
  - ps - lists running processes
  - wget - web get, lets you download file from web (source: Wget Command in Linux/Unix Geeks to Geeks, also Hostinger)
  - sudo - do as superuser
  - do - execute group of commands?
- Which of the following console command creates a remote shell session?
  - ssh
- Which of the following is true when the -la parameter is specified for the ls console command?
  - ls -la	list long format including hidden files
  - source: https://www.rapidtables.com/code/linux/ls.html 
- Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
  - top level domain: .click
  - subdomain: banana.fruit
  - root: bozo
- Is a web certificate is necessary to use HTTPS.
  - Correct. Otherwise the HTTPS can't be sure the site is legit.
- Can a DNS A record can point to an IP address or another A record.
  - IP address
- Port 443, 80, 22 is reserved for which protocol?
  - Port 80 is default for HTTP
  - 443 for HTTPS
  - 22 for secure shell access - direct remote control access to device (source: https://www.cbtnuggets.com/common-ports/what-is-port-22)
- What will the following code using Promises output when executed?
  - Making promises is basically like making threads. We never know when they're going to finish once we make them.

## Final Notes
- What is the default port for HTTP/HTTPS/SSH?
  - HTTP: 80, HTTPS: 443, SSH: 22
- What does an HTTP status code in the range of 300/400/500 indicate?
  - 500 means server error
  - 400 means client error; request is invalid
  - 300 means redirect or "prev cached response is still valid"
- What does the HTTP header content-type allow you to do?
  - Specify the type of content stored in the body of the req/res
  - Types of requests: GET,POST,PUT,DELETE,OPTIONS
  - post is more for adding, put more for updating?
  - GET can't have req body
  - OPTIONS gets metadata abt resource - typically only HTTP header
- What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  - cookies: generated by server, passed to client via http header
  - secure: only sent via HTTPS. helps against man-in-the-middle attacks
  - http-only: can't be accessed by JavaScript; in their words, "can only be accessed when it reaches the server". helps against cross-site aka XSS attacks
  - same-site: only sends cookies to requests coming from this site. protects against forgeries coming from other sites ("cross-site forgeries")
- Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
- Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
- Given the following MongoDB query, select all of the matching documents {name:Mark}

- How should user passwords be stored?
  - by hash. never store directly!!!
- Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?

- What is the websocket protocol intended to provide?
  - connection between users??
  - enabling a peer-to-peer connnection (ie both client and server send and receive messages, rather than the client having to constantly ping the server)
  - server acts as go-between for different users
  - websocket upgrades initial http connection
- What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM
  - JS: JavaScript
  - JSX: JavaScript XML; lets us use HTML and JavaScript in same file; used to make React Components
  - AWS: Amazon Web Services
  - NPM: Node Package Manager; used to install packages, run scripts?
  - NVM: Node Version Manager
- Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.

- Given a set of React components that include each other, what will be generated

- What does a React component with React.useState do?
  - lets you update and rerender that component using the "set" function declared when you set up the useState
- What are React Hooks used for?
  - keeping track of information, rerendering components when data changes, getting contextual info from parents, etc.
- What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks
  - Hook - (useState, useReducer) used to keep track of specific information, like user input
  - Context Hook - (useContext) gets information from distant parent without using props
  - Ref Hook - (useRef) holding non-rendering info; doesn't re-render when updated, unlike UseState (normal hook)
  - Effect Hook - called whenever componenent is rendered; great way to keep up with external changes, hiding/displaying, etc.
  - Performance Hook - use caching to skip unecessary calculations and re-rendering (useMemo, useCallback)
- Given React Router code, select statements that are true.

- What does the package.json file do?
  - takes care of "package dependencies and script commands". also has metadata like name, default JS file, etc.
- What does the fetch function do?
  - JavaScript function that makes and HTTP request and receives a response. default method is GET
- What does node.js do?
  - "deploys JavaScript outside of a browser" - ie on the serverside, so you can use it to manage backend and frontend.
- What does pm2 do?
  - process manager 2; lets you easily stop and start your service and register it as a daemon (which runs even after a computer shutdown).
- What does Vite do?
  - Is a Command Line Interface. Bundles code, hosts it?
