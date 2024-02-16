/*
The validation help maintain data consistency and reliability throughout the application,
preventing runtime errors and improving user experience by ensuring only complete and correctly structured data is rendered.

isValidItems(items): This function evaluates an array of items to determine if it's a valid collection for further processing.
 It checks whether the input is not null and contains at least one item. This validation is essential to avoid errors related to processing empty or undefined data structures.

isValidItem(item): It assesses an individual item's validity based on certain criteria.
 For an item to be considered valid, it must have a non-empty name, a thumbnail array with at least one entry, and a non-empty url. 
 This ensures that each item has the minimum required information before being displayed or used within the application.
*/

function isValidItems(items) {
    if (items && items.length > 0) {
        return true;
    } else{
        return false;
    }
}

function isValidItem(item) {
    if (item.name && item.thumbnail && item.thumbnail.length > 0 && item.url) {
        return true;
    } else {
        return false;
    }
}

export { isValidItems, isValidItem };