let username = "";

function loadPosts() {
  fetch('/user-posts')
    .then(res => res.json())
    .then(posts => {
      const postsList = document.getElementById('postsList');
      postsList.innerHTML = '';
      if (Array.isArray(posts)) {
        posts.forEach(post => {
          const li = document.createElement('li');
          li.textContent = `${post.post} - ${new Date(post.date).toLocaleString()}`;
          if (post.color) {
            li.style.backgroundColor = post.color;
          }
          // Add Edit button
          const editBtn = document.createElement('button');
          editBtn.textContent = 'Edit';
          editBtn.onclick = () => {
            // Show prompt and send edit request
            const newText = prompt('Edit your post:', post.post);
            if (newText !== null) {
              fetch('/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: post._id, post: newText })
              }).then(() => loadPosts());
            }
          };
          // Add Delete button
          const delBtn = document.createElement('button');
          delBtn.textContent = 'Delete';
          delBtn.onclick = () => {
            fetch('/remove', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ _id: post._id })
            }).then(() => loadPosts());
          };
          li.appendChild(editBtn);
          li.appendChild(delBtn);
          postsList.appendChild(li);
        });
      } else {
        console.error('Error fetching posts:', posts);
      }
    });
}

window.onload = function () {
  // Fetch and display username
  fetch('/get-username')
    .then(res => res.json())
    .then((data) => {
      username = data.username; // Store username for later use
      document.getElementById('usernameDisplay').textContent = `User: ${username}`;
    }
    );

  loadPosts();
};

document.getElementById('postForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevents the page from reloading
  const newPost = document.getElementById('newPost').value;
  const color = document.getElementById('postColor').value;
  fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post: newPost, username: username, color: color })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById('newPost').value = '';
      loadPosts(); // Reload posts after adding a new one
    });
});