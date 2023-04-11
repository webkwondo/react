export const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
};

export const cropPhrase = (phrase: string) => {
  return phrase ? phrase.split(' ').slice(0, 16).join(' ') : '';
};

export const formatPhrase = (phrase: string) => {
  return phrase ? phrase.charAt(0).toUpperCase() + phrase.slice(1) : '';
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const prettyDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  });

  return prettyDate;
};
