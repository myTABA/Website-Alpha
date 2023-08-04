`RecommendationPane` handles the left side of the page.
`Map` handles the map component for rendering map canvas

`RecommendationPane` houses the `RecommendationList` component and this component is essetntially a generator function.
This component takes the json data and passes each entry to the `RecItem` component which returns a single rendered entry.

## Things to do
1. Need to prepare a mobile design
2. Need to update the data from backend instead of local json
3. Need to update markers to load coordinates from json response via axios