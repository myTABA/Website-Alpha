Several inline onclick handlers which handle post requests and simultaneously change state

There is a table in the code files for reference. Readded here.
|       |   id                  |   type                |   info                                    |
|   1   |   menu1               |   wheregoing          |   first question                          |
|   2   |   menu2               |   triptype            |   select category                         |
|   3   |   menupoi             |   ratepoi             |   rating pois                             |
|   4   |   fin                 |   fin                 |   finish page                             |
|   5   |   wheregoingrequest   |   wheregoingrequest   |   request page for destination            |
|   6   |   menu1 [variant]     |   wheregoing          |   return to menu1 but with edited title   |       

The submiut and back buttons trigger the `changeState()` function which calls a `selectionHighlight()` function.
This selects the breadcrumb and sets colour on it.
Then the state is changed to a predefined one, with parameters being updated as necessary and this causes component updation.


## Things to do:
1. Endpoint axios connections for location-action
2. Shifting the useEffect code that selects items on back button for location-action and type-action to run after axios completes. (Put it in the then portion of the code, should work)
3. Endpoint updation for rate poi
