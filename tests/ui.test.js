/*
The ui.test.js file tests the displayRecommendations function from the ui.js module using the mockRecommendations data.
 It ensures that the correct number of recommendation items are rendered, verifies the proper attributes are set for both organic and sponsored items, and checks that these items are correctly classified and displayed within the DOM.
 This approach helps validate the UI's functionality in rendering recommendation data as expected.
*/

import { mockRecommendations } from '../src/js/recommendationMockData';
import { displayRecommendations} from '../src/js/ui';

beforeEach(() => {
  document.body.innerHTML = `
    <div id="loading"></div>
    <div id="recommendation-widget"></div>
  `;
});

describe('displayRecommendations with mock data', () => {
    beforeEach(() => {
      document.body.innerHTML = `<div id="recommendation-widget"></div>`;
      displayRecommendations(mockRecommendations);
    });
  
    it('renders the correct number of recommendations', () => {
      const items = document.querySelectorAll('.recommendation-item');
      expect(items.length).toBe(mockRecommendations.length);
    });
  
    it('correctly sets attributes for organic items', () => {
      const organicItems = document.querySelectorAll('.recommendation-item.organic');
      expect(organicItems.length).toBe(2); // 2 organic items in mock data
      organicItems.forEach((item, index) => {
        const { name, description, thumbnail, url } = mockRecommendations[index]; // Matching the order in mock data
        expect(item.querySelector('h3').textContent).toBe(name);
        expect(item.querySelector('p').textContent).toBe(description);
        expect(item.querySelector('img').src).toBe(thumbnail[0].url);
        expect(item.querySelector('a').href).toContain(url);
        expect(item.querySelector('a').target).toBe('_self');
      });
    });
  
    it('correctly sets attributes for sponsored items', () => {
      const sponsoredItems = document.querySelectorAll('.recommendation-item.sponsored');
      expect(sponsoredItems.length).toBe(2); // 2 sponsored items in mock data
      sponsoredItems.forEach((item, index) => {
        const { name, description, thumbnail, url, branding } = mockRecommendations[index + 2]; // Adjust index for sponsored items
        expect(item.querySelector('h3').textContent).toBe(name);
        expect(item.querySelector('p').textContent).toBe(description);
        expect(item.querySelector('img').src).toBe(thumbnail[0].url);
        expect(item.querySelector('a').href).toContain(url);
        expect(item.querySelector('.source').textContent).toContain(branding);
        expect(item.querySelector('a').target).toBe('_blank');
      });
    });
});