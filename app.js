const API_ROOT = 'https://graph.instagram.com';
const ACCESS_TOKEN = 'IGQVJYWXZAVb252ZAnBaTEVJcEhjejlFTGZASQUpLMTZAsMUYzT2JEbkZAvTlhybTV2Y0N5Rnk3b1lPR2JhLXg5TUlOTWNjTFc1bGFIOXB3WTdCdTFCakdGQ0JpaHBTa3YyM25RbW9hYVJPWGkxNHVjWGZAIS1NHemhFMXJGZATRr';
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
  const mediaInfo = await response.json();
  return mediaInfo.media_url;
}

function appendImageToFragment(img_url, fragment){
  const img = document.createElement('img');
  img.src = img_url;
  fragment.appendChild(img);
  console.log('the image was added to the fragment');
}

async function loadImageFragment(ids, fragment){
  console.log("starting adding images to the fragment")
  const promises = [];
  ids.forEach( 
    id => {
      promises.push(
        getImageUrl(id)
        .then( 
          imgUrl => appendImageToFragment(imgUrl, fragment)
        )
      );
    }
  )
  await Promise.all(promises)
  .then(() =>{
      console.log("the fragment was loaded")
      photos.append(fragment)      
    }   
  );
}

async function displayPhotos(){
  let fragment = document.createDocumentFragment();
  const idsImages = await getUserIdImages();
  console.log('1');
  loadImageFragment(idsImages, fragment)
  .then(
    value => {
      console.log('finish');
    }
  );
}

displayPhotos();
