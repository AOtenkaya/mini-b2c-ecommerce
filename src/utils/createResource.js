// src/utils/createResource.js

export function createResource(fetcher) {
  let status = "pending";
  let result = null;
  let error = null;

  const suspender = fetcher()
    .then((data) => {
      status = "success";
      result = data;
    })
    .catch((err) => {
      status = "error";
      error = err;
    });

  return {
    read() {
      if (status === "pending") {
        throw suspender; // Suspends if data is still loading
      } else if (status === "error") {
        throw error; // Throws error if something goes wrong
      } else {
        return result; // Returns the data once available
      }
    },
  };
}
