function CheckForError(response) {
  return new Promise((resolve, reject) => {
    if (response.error) {
      reject(response.error);
    } else {
      resolve(response);
    }
  });
}

module.exports = CheckForError;
