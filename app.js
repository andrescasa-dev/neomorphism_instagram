const API_ROOT = 'https://graph.instagram.com';
const ACCESS_TOKEN = 'IGQVJYNVgzRjBTLWUzUHQ1OExPazFtTG9aNDI1b3VQUUZAybEh1UXRlYlBLTDBkblJzaFRZAVU0wTnBqWnNmZAEgwbE9Rd3Fkd0syYXc4aEd4TFJoak5CRno3dUtzR2dsUm5kWkpfRzRINWxlcVdWLVdObTRBYzU2QmxXX1Fv';
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
  return meidainfo.media_url;
}

// getUserIdImages()
// .then(idsImages => {
//   idsImages.forEach(id => {
//     getImageUrl(id)
//     .then(imageUrl => {
//       const img = document.createElement('img');
//       img.src = imageUrl;
//       console.log(img);
//       photos.appendChild(img);
//   });
// })});

// async function displayPhotos(){
//   const fragment = document.createDocumentFragment();
//   const idsImages = await getUserIdImages();
//   idsImages.forEach( 
//     async function(id){
//     const imageUrl = await getImageUrl(id);
//     const img = document.createElement('img');
//     img.src = imageUrl;
//     console.log('se agrogo imagen al fragment')
//     fragment.appendChild(img);
//   });
//   console.log('se agrego el fragment al DOM');
//   photos.append(fragment);
// }
// displayPhotos();

function appendImageToFragment(img_url, fragment){
  const img = document.createElement('img');
  img.src = img_url;
  fragment.appendChild(img);
  console.log('the image was added to the fragment');
}

const IDtoImgInAFragment = (id, fragment) =>{
  return new Promise((resolve,reject)=>{
    resolve(
      getImageUrl(id)
      .then(
        img_url => appendImageToFragment(img_url, fragment)
      )
    )
  })
}


async function loadImageFragment(ids, fragment){
  //el prome está aqui, no encuentro una manera de hacerle await al foreach por lo que se vuelve asincrono y me retorna el valor.
  const promises = [];
  ids.forEach( 
    id => {
      promises.push(IDtoImgInAFragment(id,fragment));
    }
  );
  //ejecuta todas las promesas y luego si retorneme el fragmen
  Promise.all(promises).then( values => console.log(values));
  return fragment;
}

async function displayPhotos(){
  let fragment = document.createDocumentFragment();
  const idsImages = await getUserIdImages();
  fragment = await loadImageFragment(idsImages, fragment);
  photos.append(fragment);
  console.log('the fragment was added to the DOM');
}

displayPhotos();
