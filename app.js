const API_ROOT = 'https://graph.instagram.com';
const ACCESS_TOKEN = 'IGQVJWeUd6ZA0NFSlg4RVJQeU5ZASTlMbDZAsNC1pVFpEc1RpSXlFSUt2eXJWUWZA1WDFDazkxdGQ3blpCTWVac2E1VDhWcVhVMlJsY3l1UHlPYjNQMnRpZAGh6THp4OWtlYnJSd3VjZA0F2MWdpaVZA5OGU2cl9EZAmIzdl92QUlV';
const photos = document.getElementById('photos-container');

async function getUserInfo(){
  const response = await fetch(`${API_ROOT}/me?fields=username,media_count&access_token=${ACCESS_TOKEN}`);
  const userInfo = await response.json();
  document.getElementById('username_p').innerHTML = userInfo.username;
  document.getElementById('media_count').innerHTML = userInfo.media_count;
  return userInfo;
}

getUserInfo();

/**
 * 
 * @returns an array with the ids of the images.
 */
async function getUserIdImages(){
  const response = await fetch(`${API_ROOT}/me?fields=id,media&access_token=${ACCESS_TOKEN}`);
  const userMediaInfo = await response.json();
  const idRow = userMediaInfo.media.data;
  const idsImages = Array.from(idRow, obj => obj.id); //convierto el arreglo de objetos en un arraglo simple
  console.log(idsImages);
  return idsImages;
}

/**
 * 
 * @param {*} image_id 
 * get an image from an ip id reference.
 * @returns the url image 
 */
async function getImageUrl(image_id){
  const response = await fetch(`${API_ROOT}/${image_id}?fields=media_url&access_token=${ACCESS_TOKEN}`);
  const meidainfo = await response.json();
  console.log(meidainfo.media_url);
  return meidainfo.media_url;
}

getUserIdImages()
.then(idsImages => {
  idsImages.forEach(id => {
    getImageUrl(id)
    .then(imageUrl => {
      const img = document.createElement('img');
      img.src = imageUrl;
      console.log(img);
      photos.appendChild(img);
  });
})});