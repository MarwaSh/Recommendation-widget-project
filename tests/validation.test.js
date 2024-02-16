/*
The validation.test.js file contains unit tests for the validation functions isValidItems and isValidItem defined in your project.
 These tests ensure the functions accurately validate data structures—specifically, that isValidItems correctly identifies valid and invalid arrays of items, and isValidItem verifies whether an individual item meets the required criteria (having a name, thumbnail, and URL).
 This setup helps maintain data integrity throughout the application by ensuring only correctly structured data is processed or displayed.
*/
import { isValidItems, isValidItem } from '../src/js/validation';

describe('Validation Functions', () => {
  describe('isValidItems', () => {
    it('returns true for a non-empty array', () => {
      expect(isValidItems([{}])).toBeTruthy();
    });

    it('returns false for an empty array', () => {
      expect(isValidItems([])).toBeFalsy();
    });

    it('returns false for null', () => {
      expect(isValidItems(null)).toBeFalsy();
    });

    it('returns false for undefined', () => {
      expect(isValidItems(undefined)).toBeFalsy();
    });
  });

  describe('isValidItem', () => {
    it('returns true for an item with all required fields', () => {
      const item = { name: 'Test Item', thumbnail: [{ url: 'https://example.com/image.jpg' }], url: 'https://example.com' };
      expect(isValidItem(item)).toBeTruthy();
    });

    it('returns false for an item missing any required field', () => {
      const itemWithoutName = { thumbnail: [{ url: 'https://example.com/image.jpg' }], url: 'https://example.com' };
      expect(isValidItem(itemWithoutName)).toBeFalsy();

      const itemWithoutThumbnail = { name: 'Test Item', url: 'https://example.com' };
      expect(isValidItem(itemWithoutThumbnail)).toBeFalsy();

      const itemWithoutUrl = { name: 'Test Item', thumbnail: [{ url: 'https://example.com/image.jpg' }] };
      expect(isValidItem(itemWithoutUrl)).toBeFalsy();
    });

    it('returns false for items with empty or invalid fields', () => {
      const itemWithEmptyName = { name: '', thumbnail: [{ url: 'https://example.com/image.jpg' }], url: 'https://example.com' };
      expect(isValidItem(itemWithEmptyName)).toBeFalsy();

      const itemWithInvalidThumbnail = { name: 'Test Item', thumbnail: [], url: 'https://example.com' };
      expect(isValidItem(itemWithInvalidThumbnail)).toBeFalsy();
    });
  });
});
