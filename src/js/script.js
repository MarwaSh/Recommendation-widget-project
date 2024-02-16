/*
script.js serves as the starting point for your web application, initiating the app's core functionality once the DOM content is fully loaded.
 It's structured to import necessary functions from other modules—such as fetching recommendations from an API and displaying them in the UI.
 */

import { fetchRecommendations } from './api.js';
import { displayRecommendations } from './ui.js';
import { mockRecommendations } from './recommendationMockData.js';

document.addEventListener('DOMContentLoaded', function() {
    fetchRecommendations();
   // displayRecommendations();//mockRecommendations
    
});
