const API_ROOT = 'https://graph.instagram.com/me';
const ACCESS_TOKEN = 'IGQVJYNFh6REhVV2FKSjFGSG9wTHgyOWlSYVJPWWpkWnJOQlBVZAmtpNFJBX2RtOTRITndOa2xySjZAHa19pRUhKaDZA1ZAXhxZAUptNzg0R3VGSnk3RG01N2gxR0tRVGxWa3k1dHZAhalpZAZAHdxZAXhhVUo1dGdDVTlkTkFSWTNz';

async function getUserInfo(){
  const response = await fetch(`${API_ROOT}?fields=username,media_count&access_token=${ACCESS_TOKEN}`);
  const userInfo = await response.json();
  document.getElementById('username_p').innerHTML = userInfo.username;
  document.getElementById('media_count').innerHTML = userInfo.media_count;
  return userInfo;
}

getUserInfo();


// const media_count = document.getElementById('media_count');

async function getUserMedia(){
  const response = await fetch(`${API_ROOT}?fields=id,media&access_token=${ACCESS_TOKEN}`);
  const userInfo = await response.json();
  return userInfo;
}

getUserMedia();