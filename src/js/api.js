/*
The api.js file is designed for managing API requests to fetch recommendation data from an external source.
 It directly constructs and sends a request to an API endpoint, using specified query parameters. 
 Upon a successful API response, it processes the data by triggering the display of recommendations through the `displayRecommendations` function. 
 The file also handles potential fetch operation errors by displaying an error message through `displayErrorMessage`. 
 This approach ensures real-time data fetching and handling, focusing on immediate API interaction without relying on localStorage caching for data persistence.
  This modular design keeps API interaction logic separate from UI management, streamlining data retrieval and display processes.
*/

import { displayRecommendations } from './ui.js';
import { displayLoadingIndicator, displayErrorMessage } from './messages.js';


function fetchRecommendations() { 
    const endpoint = 'http://api.taboola.com/1.0/json/taboola-templates/recommendations.get';
    const params = new URLSearchParams({
        'app.type': 'desktop',
        'app.apikey': 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
        'source.id': 'demo-source', // Use a constant string as it's a demo
        'count': 10, // Example: Fetch 10 items
        'source.type': 'video',
        'source.url': 'https://www.msn.com/en-us/entertainment/entertainment-celebrity/the-taylor-swift-cleaning-cart-theory-was-just-confirmed-by-a-fan-video-and-i-m-not-okay/ar-AA19siNc'
        //'http://www.site.com/videos/214321562187.html'
        //'https://www.usatoday.com/story/news/politics/onpolitics/2016/06/20/hillary-clinton-built-big-stockpile-showdown-donald-trump/86161596/'     
    });

    displayLoadingIndicator(true);

    fetch(`${endpoint}?${params}`, { method: 'GET'})
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch recommendations. Please try again later.');
        }
        return response.json();
    })
    .then(data => {
        if (!data.list || data.list.length === 0) {
            throw new Error('No recommendations found. Please check back later.');
        }
        displayRecommendations(data.list);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        displayErrorMessage(error.message);
    })
    .finally(() => {
        displayLoadingIndicator(false);
    });
}

export { fetchRecommendations };