The profile page is the entry point to the page. 

Account page is currently the only other page here. For other sections, i recommend a new jsx file.

Every navigation button on the left triggers the changeState function which calls the highlight function for the highlight.
Then it sets the appropriate state and react uses this hook to update content.

## Items to be done:
1. Adding the Liked and Saved Destination pages
2. If security tab needs to be removed, delete the thing from `changeState()` as well as from the return value, the `<button>`