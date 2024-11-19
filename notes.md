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
