/*
The messages.test.js file contains unit tests for UI-related functions from the messages.js module, specifically testing the behavior of displaying a loading indicator, showing no recommendations message, and handling error messages within the application.
 It starts by setting up a mock DOM environment to simulate the presence of UI elements these functions interact with. 
 Each describe block groups tests related to a specific function, verifying correct functionality through assertions about changes to the DOM - such as visibility changes for the loading indicator and the content of error and no-recommendation messages.
*/


import { displayLoadingIndicator, displayErrorMessage } from '../src/js/messages';
import { displayRecommendations } from '../src/js/ui';

// Mock necessary DOM elements before the test
beforeEach(() => {
    document.body.innerHTML = `
      <div id="loading"></div>
      <div id="recommendation-widget"></div>
    `;
  });

describe('displayLoadingIndicator', () => {
    it('should show the loading indicator', () => {
      displayLoadingIndicator(true);
      const loader = document.getElementById('loading');
      expect(loader.style.display).toBe('block');
    });

    it('should hide the loading indicator', () => {
      displayLoadingIndicator(false);
      const loader = document.getElementById('loading');
      expect(loader.style.display).toBe('none');
    });
  });

  // test displayNoRecommendationsMessage()
describe('No Recommendations Message', () => {
    it('displays the no recommendations message when there are no items', () => {
      displayRecommendations([]);
      const message = document.querySelector('.no-recommendations');
      expect(message).not.toBeNull();
      expect(message.textContent).toBe('No recommendations to display.');
      expect(message.classList.contains('no-recommendations')).toBe(true);
    });
  });

describe('displayErrorMessage', () => {
    it('should display an error message inside the container', () => {
      displayErrorMessage('Error fetching data');
      const message = document.querySelector('.error-message').textContent;
      expect(message).toBe('Error fetching data');
    });
  });
