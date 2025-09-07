import { format, parseISO, isValid, formatDistanceToNow } from 'date-fns';

/**
 * Date utility functions following date-fns best practices
 */

export interface DateFormatOptions {
  format?: 'short' | 'long' | 'relative';
  locale?: string;
}

/**
 * Format a date string or Date object
 */
export const formatDate = (
  date: string | Date,
  options: DateFormatOptions = {}
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }

    switch (options.format) {
      case 'short':
        return format(dateObj, 'MMM dd, yyyy');
      case 'long':
        return format(dateObj, 'MMMM dd, yyyy');
      case 'relative':
        return formatDistanceToNow(dateObj, { addSuffix: true });
      default:
        return format(dateObj, 'MMM dd, yyyy');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format a date for display in course cards
 */
export const formatCourseDate = (date: string | Date): string => {
  return formatDate(date, { format: 'short' });
};

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  return formatDate(date, { format: 'relative' });
};

/**
 * Validate if a date string is valid
 */
export const isValidDate = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    return isValid(date);
  } catch {
    return false;
  }
};
