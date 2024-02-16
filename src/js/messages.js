/*
The messages collectively enhance user experience by providing clear, contextual feedback for different application states, such as loading, error occurrences, or empty data sets.

displayLoadingIndicator(show): Controls the visibility of a loading indicator. When show is true, the loading element is displayed; otherwise, it's hidden.
 This function is typically used during data fetch operations to inform the user that a process is ongoing.

displayErrorMessage(message): Clears the content of the recommendation-widget container and displays an error message within it.
 This function is useful for informing users about errors or issues encountered while fetching or processing data.
 
displayNoRecommendationsMessage(container): Appends a "No recommendations to display" message within a specified container.
 This is particularly useful when a data fetch operation completes but returns no usable results, informing users about the lack of content.
*/

function displayLoadingIndicator(show) {
    const loader = document.getElementById('loading');
    if (show) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}

function displayErrorMessage(message) {
    const container = document.getElementById('recommendation-widget');
    // Display the error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    container.appendChild(errorElement);
    // Hide the loading indicator
    displayLoadingIndicator(false);
}

function displayNoRecommendationsMessage(container) {
    const messageElement = document.createElement('p');
    messageElement.className = 'no-recommendations';
    messageElement.textContent = 'No recommendations to display.';
    container.appendChild(messageElement);
}

export { displayLoadingIndicator, displayErrorMessage, displayNoRecommendationsMessage };