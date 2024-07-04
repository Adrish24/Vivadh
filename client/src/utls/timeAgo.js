import { formatDistanceToNow } from "date-fns";

const timeAgo = (timestamp) => {
  return formatDistanceToNow(timestamp, { addSuffix: true });
};

export default timeAgo;
