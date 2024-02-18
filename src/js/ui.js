/*
Manages user interface-related functionalities.
It includes importing validation and message display functions, dynamically creating and appending recommendation elements to the DOM based on given items, 
and constructing image elements with appropriate attributes for lazy loading. Each function serves a specific purpose:

displayRecommendations(items): Checks if the provided items are valid and displays each recommendation in the UI.
 If no valid items are provided, it displays a "No recommendations" message.

createRecommendationElement(item): Creates a DOM element for a single recommendation item, setting its class based on its origin (sponsored or organic),
 and appends an image and content to it.

createImageElement(item): Generates an image element with attributes for lazy loading, ensuring efficient loading of images.
These functions work together to dynamically generate and update the content of the recommendation widget based on the data provided,
 enhancing the user experience by displaying relevant information in an optimized manner.
*/

import { isValidItems, isValidItem } from './validation.js';
import { displayLoadingIndicator, displayErrorMessage, displayNoRecommendationsMessage } from './messages.js';

function displayRecommendations(items) {
    const container = document.getElementById('recommendation-widget');

    if (!isValidItems(items)) {
        displayNoRecommendationsMessage(container);
        return;
    }
    
    displayLoadingIndicator(true);
    items.forEach(item => {
        if (isValidItem(item)) {
            const recommendationElement = createRecommendationElement(item);
            container.appendChild(recommendationElement);
        } else {
            console.log('Skipping item due to missing required fields', item);
        }
    });
    displayLoadingIndicator(false);
}

// Creates a recommendation element based on the item's data.
function createRecommendationElement(item) {
    // Create the main container element for the recommendation
    const element = document.createElement('div');
    element.className = `recommendation-item ${item.origin}`;

    // Create and append the image element
    const imgElement = createImageElement(item); // Assuming createImageElement is defined elsewhere
    element.appendChild(imgElement);

    const sponsoredTextContent = getSponsoredText(item); // This should return a string or null/undefined if not applicable
    const descriptionTextContent = getDescriptionText(item); // This should return a string

    // Create container for name and possibly sponsored text
    const container = document.createElement('div');
    
    // Create and append the name element (h3)
    const nameElement = document.createElement('h3');
    nameElement.textContent = item.name;
    container.appendChild(nameElement);

    // Check and append sponsored text if applicable
    if (sponsoredTextContent) {
        const sponsoredElement = document.createElement('p');
        sponsoredElement.textContent = sponsoredTextContent;
        sponsoredElement.className = 'sponsored-text'; // Example class, adjust as needed
        container.appendChild(sponsoredElement);
    }

    element.appendChild(container);

    // Append description text if applicable
    if (descriptionTextContent) {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = descriptionTextContent;
        element.appendChild(descriptionElement);
    }

    // Create and append the "Read More" link
    const readMoreLink = document.createElement('a');
    readMoreLink.href = item.url; // Using .href is a shorthand for setAttribute('href', url)
    readMoreLink.target = item.origin === 'sponsored' ? '_blank' : '_self';
    readMoreLink.textContent = 'Read More';
    element.appendChild(readMoreLink);

    return element;
}

//Generates HTML for the sponsored text, if applicable.
function getSponsoredText(item) {
    return item.origin === 'sponsored' && item.branding ? `Sponsored by ${item.branding}` : '';
}

//Generates HTML for the item description.
function getDescriptionText(item) {
    return item.description ? `${item.description}` : '';
}

//Creates an image element for the recommendation item.
function createImageElement(item) {
    const imgElement = document.createElement('img');
    imgElement.alt = item.name;
    imgElement.loading = "lazy";  // Implement lazy loading for images to improve performance
    imgElement.src = item.thumbnail[0].url;
    //img.Error() {
        //return callback(new Error(""));
    //}
    // Adjust srcset and sizes to ensure responsive and appropriately sized images
    imgElement.srcset = item.thumbnail.map((t, index) => `${t.url} ${300 * (index + 1)}w`).join(', ');
    imgElement.sizes = "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw";
    // Set CSS styles to prevent images from overloading their container
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto'; // Maintain aspect ratio
    return imgElement;
}


export { displayErrorMessage, isValidItems, isValidItem, displayRecommendations}
