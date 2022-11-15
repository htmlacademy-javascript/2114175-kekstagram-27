const loadPhotos = (onSuccess, onError) =>
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);

const uploadPhoto = (formData, onSuccess, onError) =>
  fetch('https://27.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(onError);
export {loadPhotos, uploadPhoto};
