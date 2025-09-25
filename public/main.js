//make blank username
let username = "";

//load posts from database
function loadPosts() {
  //call user-posts with fetch
  fetch('/user-posts')

    .then(res => res.json())
    .then(posts => {
      //get each post
      const postsList = document.getElementById('postsList');

      //to keep from adding to list repeatedly
      postsList.innerHTML = '';

      //for each post add to list
      posts.forEach(post => {
        //make item
        const li = document.createElement('li');
        li.textContent = `${post.post} - ${new Date(post.date).toLocaleString()}`;
        if (post.color) {
          li.style.backgroundColor = post.color;
        }

        //make edit button
        const editBtn = editPost(post);

        //make delete button
        const delBtn = deletePost(post);

        //add to list
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        postsList.appendChild(li);
      });

    });
}

function editPost(post) {
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => {

    //use prompt to get new text
    const updated = prompt('Edit your post:', post.post);
    if (updated !== null) {
      fetch('/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: post._id, post: updated })
      }).then(() => loadPosts());
    }
  };
  return editBtn;
}

function deletePost(post) {
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = () => {
    fetch('/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: post._id })
    }).then(() => loadPosts());
  };
  return delBtn;
}

//on load get posts from username
window.onload = function () {

  //get URL and see if new user
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('newUser') === 'true') {
    //use alert
    alert('Account created!');
  }

  //get username from server
  fetch('/get-username')
    .then(res => res.json())
    .then((data) => {
      username = data.username;
      document.getElementById('usernameDisplay').textContent = `User: ${username}`;
    }
    );

  //get posts
  loadPosts();
};

//add post attached to post button
document.getElementById('postForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const post = document.getElementById('newPost').value;
  const color = document.getElementById('postColor').value;

  //send post, username, color to server 
  fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post: post, username: username, color: color })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById('newPost').value = '';

      //load posts again to get new post
      loadPosts();
    });
});