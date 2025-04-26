// Calculator operations
export const operations = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => (b === 0 ? NaN : a / b),
  percentage: (a: number) => a / 100,
  negate: (a: number) => -a,
};

// Format number for display
export const formatNumber = (num: number): string => {
  // Handle special cases
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return 'Error';
  
  // Convert to string and split by decimal point
  const numStr = num.toString();
  
  // If there's a decimal point, format accordingly
  if (numStr.includes('.')) {
    const [integer, decimal] = numStr.split('.');
    
    // Format integer part with commas
    const formattedInteger = Number(integer).toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });
    
    return `${formattedInteger}.${decimal}`;
  }
  
  // Format integer with commas
  return Number(numStr).toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });
};

// Parse display string back to number
export const parseDisplayValue = (display: string): number => {
  // Remove commas and convert to number
  return parseFloat(display.replace(/,/g, ''));
};