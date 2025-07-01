This project was built using React with TypeScript, which provided interactivity with API fetching, asynchronous operations, event handling, data manipulation, and DOM updates. Styling was done with Tailwind CSS utility classes in order to have combined TSX components and styling, which will be important with future projects in React. Development was done in VSCode using the Vite dev server to provide real-time previews during development. The design for the project came from the IP address tracker challenge, which we extended with the country/flag data from the REST country challenge to spice up the tracker's display.

Since it had a complex data structure, we created a type to hold the return data from the IP Geolocation API calls. In contrast, since we were only using a few fields from the REST Country API, we created a simple object type to hold the data that we wanted to keep and destructured the API response in our getCountry function.

The layout was a bit difficult, especially since the Leaflet map changes its z-index when loaded. This negatively affected the page styling, so we needed to manually set the z-index on other elements in order to bring them to the front. And the React implementation was quite different than the TS/JS implementation, so there was a lot of experimentation needed to get it working correctly

The other API calls were pretty straightforward. However, many domains did not have ISP's listed, so we had to remove the validation check for them, so that they would be displayed without that data.

The project could be improved by showing more data such as reverse IP lookups to show the domains served by a given IP address. Another fun enhancment could be trace route mapping to show the full path from the user to the tracked domain.
