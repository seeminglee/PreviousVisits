# PreviousVisits

My first foray into writing Chrome extensions. I wrote it mainly to use as a dynamically and automatically updated bookmarks to track my progress when learning a new library.

## How it works

Here's a screenshot of it in action:

![Screenshot of PreviousVisits Chrome extention](http://f.cl.ly/items/1m2Q110w1e2R3U3y2U2Q/Screen%20Shot%202011-11-17%20at%209.01.29%20PM.png "Screenshot")

In a gist, the extension looks through history items to find URLs which share the same domain / hostname as your active tab. It then displays all the matches in list together with the URL and the last time visited.

## Future versions

I'm toying around with the idea to use local storage at the moment because there appears to be a limit as to the length of HistoryItem one can access. The downside of this, however, is that the user might forget that clearing out the history alone is not enough to remove all browsing history. 

Then perhaps some nicer icon and option pages are in order. Frankly I'm quite surprised how easy it has been to whip something like this up so quickly and easily!

## Typography

To keep the text at a comfortable type-size while keeping the interface narrow and light, a condensed and highly legible typeface is utilized here - but obviously it's not a requirement. The typeface used is from the [Roboto Family](http://www.fontsquirrel.com/fonts/roboto/ "Font Squirrel | Free Font Roboto by Google Android"). It was designed by the Google Android team and licensed under the Apahe License, Version 2.0. _This license can also be found at this permalink: [http://www.fontsquirrel.com/license/roboto](http://www.fontsquirrel.com/license/roboto)_

