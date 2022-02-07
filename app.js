const API_ROOT = 'https://graph.instagram.com';
const ACCESS_TOKEN = 'IGQVJVcE5xcXVPMV9DMXN3aGFZAWm04b0JFTjhBTjlac29zcXo5QmFBM3Y5c0tuRDZA1VkdyWW1JcDVDZAFlFRDF0YnFtZAzA2bkExRXpHdWkwREZAFR2ZATV2RFM1A2cEJLS1dWMGY0aWY2c3EzalU4YlJGOTVuOXhoS2U5NUg0';
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