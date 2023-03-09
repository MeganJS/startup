# startup
CS260 startup project and notes:

Midterm Notes:<br>
Intro
<br>Web design skills involve tech, art, social, and discovery.
<br>Develop social skills, and value discovery.
<br>Make mistakes! =)

Demo
<br>HTML, CSS and JS make a basic webpage. 
<br>HTML - structure and content.
<br>CSS - stylization.
<br>JS - interactability and function.

History
<br>started as ARPANET - network of computers
<br>started IP and DNS, later transferred to public
<br> World wide web - HTML and hyperlinks to connect related documents
<br>CSS - Wium Lie - stylization seperate from content/structure
<br>JavaScript for scripting webpages - allowing them to change dynamically based on user interaction

Tech Stack
<br>web framework: React, web server (hosted by AWS): Caddy, web services run with Node.js, MongoDB as database.
<br>lots of different tech involved - key is be adaptive

Console
<br>POXIX compliant - supports a standard set of console commands. Git Bash will help.
<br>WSL will work because it's linux.
<br>ls -la lists all the files and info, even the hidden files.

DOM
<br> you can type "document" into the console in the browser debugging window (click "inspect") to see the DOM for the document currently being rendered
<br> DOM - document object model
<br> Each DOM is like a tree, with a branch/node for each thing in an HTML - elements, attributes, text, comments, whitespace, etc.
<br> textContent contains all of an element's text
<br> querySelector selects a the first element by that name, and querySelectorAll will select all of the elements by that name
<br> ex: document.querySelectorAll('div');
<br> you can createElement, appendChild and removeChild
<br> be careful that any input you get from the user (even http and URL stuff) isn't directly injected into your HTML via DOM. Easy way for hackers to mess with stuff.
<br> you can addEventListener to call a function when a thing happens

Promises:
<br>JS is single threaded. Only one thing being executed at any given time. Use Promise to execute code in parallel.
<br>Promise will be - pending (running asynchronously) fullfilled or rejected
<br>create a promise using promise object constructor
<br>use setTimeout to create a delay of milliseconds. Nested for loops can be neat.
<br>then is called if promise fullfilled. Catch is called if rejected, and finally will be called no matter what. These allow you to do something with the outcome of a promise.
<br> use resolve for a fulfilled result and reject for a rejected/failed result

Async/Await:
<br>making a function async means it is a promise that is immediately resolved and it's value is the return value of the function. It's a function that returns a promise? 
<br>await keyword goes in front of a call to a promise and blocks execution until the promise has resolved, and returns the result of the promise.
<br>await and async are very useful in letting code run asynchronously but still has a flow to it that makes sense. Great for when working with many promises.





js notes: 
in order to include variables or js code in a string, string must be surrounded by `, which are tick marks and _not_ apostrophes!

Simon-CSS notes:
Choose simple over nice to do things quickly. I want to use Bootstrap more; I spent a lot of time wrestling with flex trying to figure out how to make things line up how I wanted in CSS and there was probably tools in Bootstrap I could have used to help me. On the upside, you can totally use images you upload as the background of buttons, which I think is fun.

Simon-html Assignment notes: 
I think it's neat how, when creating hyperlinks between pages, as long as the html file is part of the same folder you can just put "fileName.html" in the html code. 
Right now it looks very basic and is not functional. However, I was able to get a lot of the structure and links in place. An interesting project. Make sure to commit and push early and often!


Going to try to figure out how to set up links to open in new tab on click.
[frogs are cute](https://en.wikipedia.org/wiki/Frog)

<a href="https://en.wikipedia.org/wiki/Frog" target="_blank">frogs are cute</a>

Okay neither of those things worked. I don't think there's an efficient way to do this. I'll just use ctrl-click for now.



Notes on Caddy set up:
VI is interesting to use. Remember to press i to go into insert mode and ESC to go back into command mode. In command mode, use :w to save and :q to quit. Or combine them and use :wq to save and quit. Caddy is free to use and comes installed, which is pretty useful.

Notes on AWS EC2 set up:

command for ssh:
➜  ssh -i ~/CS260code/frogsong.pem ubuntu@18.117.47.246

REMEMBER
After this semester, terminate service AND release elastic IP. Don't be afraid to reevaluate if I need a faster service or if I need a cheaper service.

---
Start Up Specification

I love creating stories, but organizing my ideas is often tricky, and I know I'm not alone in that. My start up application aims to assist writers. Users will be able to create and manage character profiles, worldbuilding blocks, and a story outline for any number of projects on their account. The planning page will allow them to make goals and break them down into steps. They'll also be able to connect with friends, share their ideas, and get supportive feedback. Creativity will expand and focus with a little help from organization.


Key Features:
- Ability to create and edit projects.
- Ability to create and edit project aspects (characters, worldbuilding, etc.)
- Ability to "friend" other users.
- Ability to share projects or project aspects with other users.
- Ability to recieve feedback via comments and/or chat.
- Ability to make goals and record progress.


A rough design for a user's homepage:
![homePageDesign](https://user-images.githubusercontent.com/105321453/215239073-c86f2d68-8e5f-476d-a9b6-fb41390af449.png)

A rough design for a project homepage:
![projectPageDesign](https://user-images.githubusercontent.com/105321453/215239078-f69e7d52-beba-44a4-bb4b-173ed2062b58.png)

A rough design for the character management page:
![characterPageDesign](https://user-images.githubusercontent.com/105321453/215239082-7c72f9ac-a71e-4c74-b8f1-b7d9c14e1486.png)

---

(from previous assignment)
Why Hello There! Welcome to this place.
Well, I suppse it's about time we got started. I need to edit this document so there's something new to pull in VS code.

Penguins are okay.

Going so soon? Well, I suppose I shouldn't keep you. Safe travels!


TODAY I LEARNED: it is very important to commit and push your code after you edit it and to pull your VS code as necessary.
Also, in order to commit in VS code you need to have a comment, and after leaving the comment you need to look for the little checkmark on the right in upper taskbar.

IDEA:
Links to character profiles and worldbuilding objects can be embedded in this outline and elsewhere to create a more cohesive concept.
Collaboration on projects.


Putting this here for use somewhere else:
![lowerFalls](https://user-images.githubusercontent.com/105321453/217152680-a6177c8f-946d-4dc0-a944-82b144769e3e.jpg)

