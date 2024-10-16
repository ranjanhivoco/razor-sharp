import React from 'react';

export default function UniqueMappedList({ originalList }) {
  // Create a Set to store unique elements
  const uniqueSet = new Set();

  // Use map to create a new array containing unique elements
  const uniqueMappedList = originalList.map((item) => {
    // Check if the element exists in the Set
    if (!uniqueSet.has(item)) {
      // Add the element to the Set
      uniqueSet.add(item);
      // Include the element in the result array
      return item;
    }
    // Return null for duplicate elements
    return null;
  });

  // Filter out null values to get the final result with unique elements only
  const finalResult = uniqueMappedList.filter((item) => item !== null);

  return (
    <div>
      {finalResult.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}