const apiEndpoint = 'https://opentdb.com/api.php?amount=10&difficulty=easy';

export const fetchQuestions = () => {
  return fetch(apiEndpoint)
    .then(response => {
      return response.json();
    })
    .catch(() => Location.reload());
};

// Shamelessly stolen from https://bost.ocks.org/mike/shuffle/
// StackOverflow answer https://stackoverflow.com/a/2450976/5396280
export const shuffle = function(array) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};
