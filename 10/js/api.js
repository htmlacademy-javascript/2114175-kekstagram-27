const loadPhotos = () => fetch('https://27.javascript.pages.academy/kekstagram/data');
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
