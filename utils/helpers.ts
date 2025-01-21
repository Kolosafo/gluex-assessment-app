import moment from "moment";

export function formatDate(dateString: string) {
  const now = moment();
  const date = moment(dateString, "YYYY-MM-DD HH:mm:ss");

  // Check if the date is today
  if (date.isSame(now, "day")) {
    return `Today, ${date.format("h:mma")}`;
  }
  // Check if the date is yesterday
  else if (date.isSame(now.subtract(1, "days"), "day")) {
    return `Yesterday, ${date.format("h:mma")}`;
  }
  // Otherwise, return the full date string
  else {
    return date.format("YYYY-MM-DD, h:mma");
  }
}

export function checkIsTodayOrYesterday(dateString: string) {
  const now = moment(); // Get the current moment
  const date = moment(dateString, "YYYY-MM-DD HH:mm:ss"); // Parse the input string

  // Check if the date is today
  if (date.isSame(now, "day")) {
    return `Today, ${date.format("h:mma")}`;
  }
  // Check if the date is yesterday
  else if (date.isSame(now.subtract(1, "days"), "day")) {
    return `Yesterday, ${date.format("h:mma")}`;
  }
  // Otherwise, return the full date string
  else {
    return date.format("YYYY-MM-DD, h:mma");
  }
}

export function truncateString(str: string, limit?: number) {
  // THIS IS CUS THE ADDRESS EXTENDS PAST THE WIDTH IN MOBILE
  // Check string length and return it if less than or equal to 40 characters
  // (^When the limit is not specified)
  if (limit && str.length <= limit) {
    return str;
  } else if (limit) {
    return str.substring(0, limit) + "...";
  }

  if (!limit && str.length <= 38) {
    return str;
  }

  // Truncate the string and add "..."
  return str.substring(0, 38) + "...";
}
