function formatRelativeDate(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval === 1 ? ' day' : ' days');
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + (interval === 1 ? ' hour' : ' hours');
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + (interval === 1 ? 'minute' : ' minutes');
  }

  return `${Math.floor(seconds)} seconds`;
}

export default formatRelativeDate;
