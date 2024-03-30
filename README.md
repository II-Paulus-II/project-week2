# Project Week 2 - Cookie Clicker

## Overview

JavaScript and CSS together give us the power to transform our pages into an interactive experience. Though the web began as a way to share documents, it has evolved to support games, real-time chat, and even live video - all of it works in the same browser, from anywhere in the world in an instant by typing in or clicking a memorable address.  

We're going to build a simple interactive game to include on the website as a fun distraction for our visitors.  

It's known as an "idling game" or "incremental game": You run a cookie shop. Every second you produce some number of cookies. Clicking the master cookie gets you you more cookies, too. You can spend your cookies on upgrades to your Cookie factory to increase the number of cookies you have per click.  

## Walkthrough

* Workshop: Planning
* Workshop: Page structure and elements
* Workshop: The Button: Events and Style
* Workshop: The Timer and the DOM
* Workshop: The Cookie Counter
* Workshop: The Upgrades

## Prior Knowledge

* HTML Structure
* CSS Positioning, Layout, Box Model, Transitions and visual style
* Event Listeners
* DOM Manipulation
* JS Conditionals, Loops, Functions, Objects, Arrays, Variables
* Local Storage

## Workshop

### Planning & User Stories

This application is a little bit more complicated, so more planning up front will help all stakeholders come to a shared understanding of the requirements and the outcomes we want to achieve.  

Defining what the application should do using "user stories" is one way to set the scope for a whole app, website or just a new feature.  

When you can say the product delivers all of the agreed stories, that scope of work is finished (and you can request final payment!). Without this kind of planning it can be easy to get lost in the details and lose sight of the initial goals.  

User stories help keep the focus on the user, and what the product does to meet their needs.  

While a week of development work can save you a day of planning work, it's probably more sensible to do it the other way around!  

User stories are often written in a templated style:  

As a user, I can visit the page and see my current number of cookies As a user, I can click the giant cookie and increase my number of cookies by 1 As a user, I can spend cookies to buy upgrades for my cookie factory  

🎯 Have a look at the live demo of the game and see if you can come up with another story. There's something the app does that isn't quite so obvious. Hint: Close the tab or refresh the page. See how it remembers the number?  

### Wireframing

As with any website build, it can help to consider the layout and positioning of elements for the game.  

There are at least three main sections to the game:  

* The cookie itself
* The cookie count number
* The upgrade shop (optionally)

* Draw a wireframe including the main game sections, refer to the demo for inspiration

* You can lay these out however you want. Feel free to be creative.

### Workshop: Structure

#### Layout and basic styles

First things first, we need to get things on the page. So let's build out the HTML structure and set up some basic styles. Now's the time to add a giant cookie image too. I wonder how that's done in the demo?  

* Build out the wireframe using your knowledge of HTML and CSS.

* You can use dev tools to inspect the code from the demo!

#### The Button: Events and Style

* Style the button. Draw a cookie, use stock assets, or use a giant emoji! 🍪

* Add an event listener to the button to increment a cookie counter variable.  

* Add a CSS animation of some kind when you click the button  

#### The Timer and the Increment

setInterval which runs the same code repeatedly until stopped every x number of milliseconds is useful here.  

Given that we want our cookies to increment every second, it makes sense to use setInterval.  

⛳️ Set up the interval to increment the cookie count every second  

> let cookies = 0; // Start cookies count at zero
> setInterval(function () {
>  cookies = cookies + 1;
>  console.log("🍪", cookies);
> }, 1000); // 1000 milliseconds == 1 second


* You should see the cookie count incrementing in the console.  

### Updating the DOM  

* Select the HTML element for the cookie total and update it's contents so the cookie counter starts to increment on the page  

#### Saving the cookie count

Now we've got our initial functionality, it's a bit of a shame that we lose our progress every time we refresh the page.  

It'd be handy if we could store some values in the browser, wouldn't it. Local storage seems like the ideal solution. We can store the current cookie value on every increment, and then retrieve it and set it as the starting value when we load the page.  

* Use localStorage to store the cookie count value on every increment, and load it again when the app runs on page load  

#### Adding upgrades

The final piece for our initial scope is to add the ability to spend a few cookies to buy upgrades that increase the increment value. Buy more ovens to increase your cookie production per second.

This will draw on many of the skills we've learned so far: objects and arrays, loops, event listeners and DOM manipulation.  

* Create a list of upgrades available in your game, make them each available to purchase at a cost.

* Add an event listener to each upgrade button that checks if the user has enough cookies to buy it, and if so, subtracts the cost from the cookie count, and tracks the purchased items and their increment bonus.  

* Use the owned items and their increment bonus to calculate the total increment value to add every second or every click  

### Stretch Goals

#### Styling

* Add some more styling to the game to make it look more like the original, or your own design. Use CSS animations to make the cookie bounce when you click it, or add a background image.
More Upgrades

* Add more interesting upgrades to the game that have different effects on cookie production. Maybe you need a certain amount of grandmas to operate a certain amount of cookie ovens. Add a new section to the page to display the upgrades. Add a new upgrade that increases the cookie click value.
