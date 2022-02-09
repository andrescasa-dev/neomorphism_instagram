const API_ROOT = 'https://graph.instagram.com';
const ACCESS_TOKEN = 'IGQVJXSm1xQmpmWWV2OEFDd0d3QzQ3S3hIWGdIOHZAxRll3V2pYVE0wdUZAoVEF5cTk1VGVZAbHc2bjY4b3gtRmVaWG52MndHUXdTVEl6WE9ld3RVR3pFV1UtMXROeUdIRGtmMGdWNXpkNE0yaEhmZADQ1UWt6eEpIc0xTa2lB';
const photos = document.getElementById('photos-container');
console.log('DOM photos: ' + photos);

async function getUserInfo(){
  const response = await fetch(`${API_ROOT}/me?fields=username,media_count&access_token=${ACCESS_TOKEN}`);
  const userInfo = await response.json();
  document.getElementById('username_p').innerHTML = userInfo.username;
  document.getElementById('media_count').innerHTML = userInfo.media_count;
  return userInfo;
}

getUserInfo();

async function getUserIdImages(){
  const response = await fetch(`${API_ROOT}/me?fields=id,media&access_token=${ACCESS_TOKEN}`);
  const userMediaInfo = await response.json();
  const idRow = userMediaInfo.media.data;
  const idImages = Array.from(idRow, obj => obj.id); //convierto el arreglo de objetos en un arraglo simple
  return idImages;
}

async function getImageUrl(image_id){
  const response = await fetch(`${API_ROOT}/${image_id}?fields=media_url&access_token=${ACCESS_TOKEN}`);
  const meidainfo = await response.json();
  console.log('image_url: ' + meidainfo.media_url)
  return meidainfo.media_url;
}

getUserIdImages().then(idImages => {
  idImages.map(id => {
    console.log('mi id: ' + id)
    getImageUrl(id).then(imageUrl => {
    console.log(imageUrl)
    const img = document.createElement('img');
    img.style.width = '100px';
    img.src = imageUrl;
    photos.appendChild(img);
  });
})});

getUserProfileImage('salinas_costuras');

async function getUserProfileImage(username){
  const response = await fetch(`https://www.instagram.com/${username}/?__a=1`);
  const userInfo = response.json();
  const profileUrl = userInfo.graphql.user.profile_pic_url
  console.log(profileUrl);
  return profileUrl
}