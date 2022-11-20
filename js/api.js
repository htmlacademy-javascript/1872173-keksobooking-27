const Urls = {
  GET: 'https://27.javascript.pages.academy/keksobooking/data',
  POST: 'https://27.javascript.pages.academy/keksobooking',
};

const makeRequest = (onSuccess, onFail, method, readyData) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: readyData,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export { makeRequest };
