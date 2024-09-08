const formatMessageTime = (dateInput: Date): string => {
  const now = new Date();
  const date = new Date(dateInput);

  // Get the difference in milliseconds
  const diffTime = now.getTime() - date.getTime();

  // Convert milliseconds to days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Correct DateTimeFormatOptions
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const fullDateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (diffDays === 0) {
    // If the date is today, show the time only
    return date.toLocaleTimeString([], timeOptions);
  } else if (diffDays === 1) {
    // If the date is yesterday, show "Yesterday"
    return "Yesterday";
  } else if (diffDays <= 6) {
    // If the date is between 2 and 6 days ago, show "X days ago"
    return `${diffDays} days ago`;
  } else {
    // If the date is more than a week ago, show the full date and time
    return date.toLocaleDateString("en-GB", fullDateOptions);
  }
};

export default formatMessageTime;
