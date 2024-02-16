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
import { displayErrorMessage, displayNoRecommendationsMessage } from './messages.js';

function displayRecommendations(items) {
    const container = document.getElementById('recommendation-widget');

    if (!isValidItems(items)) {
        displayNoRecommendationsMessage(container);
        return;
    }
    
    items.forEach(item => {
        if (isValidItem(item)) {
            const recommendationElement = createRecommendationElement(item);
            container.appendChild(recommendationElement);
        } else {
            console.log('Skipping item due to missing required fields', item);
        }
    });
}

// Creates a recommendation element based on the item's data.
function createRecommendationElement(item) {
    const element = document.createElement('div');
    element.className = `recommendation-item ${item.origin}`;

    const imgElement = createImageElement(item);
    element.appendChild(imgElement);

    const sponsoredText = getSponsoredText(item);
    const descriptionText = getDescriptionText(item);

    const contentHtml = `
        <div>
            <h3>${item.name}</h3>
            ${sponsoredText}
        </div>
        ${descriptionText}
        <a href="${item.url}" target="${item.origin === 'sponsored' ? '_blank' : '_self'}">Read More</a>`;
    element.innerHTML += contentHtml;

    return element;
}

//Generates HTML for the sponsored text, if applicable.
function getSponsoredText(item) {
    return item.origin === 'sponsored' && item.branding ? `<span class="source">Sponsored by ${item.branding}</span>` : '';
}

//Generates HTML for the item description.
function getDescriptionText(item) {
    return item.description ? `<p>${item.description}</p>` : '';
}

//Creates an image element for the recommendation item.
function createImageElement(item) {
    const imgElement = document.createElement('img');
    imgElement.alt = item.name;
    imgElement.loading = "lazy";  // Implement lazy loading for images to improve performance
    imgElement.src = item.thumbnail[0].url;
    // Adjust srcset and sizes to ensure responsive and appropriately sized images
    imgElement.srcset = item.thumbnail.map((t, index) => `${t.url} ${300 * (index + 1)}w`).join(', ');
    imgElement.sizes = "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw";
    // Set CSS styles to prevent images from overloading their container
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto'; // Maintain aspect ratio
    return imgElement;
}


export { displayErrorMessage, isValidItems, isValidItem, displayRecommendations}
