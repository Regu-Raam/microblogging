const postsContainer = document.getElementById('postsContainer');
const postInput = document.getElementById('postInput');
const postButton = document.getElementById('postButton');

let posts = [];

postButton.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) {
        const post = {
            id: Date.now(),
            content: content,
            likes: 0,
            dislikes: 0,
        };
        posts.push(post);
        postInput.value = ''; // Clear input
        renderPosts();
    }
});

function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-content">${post.content}</div>
            <button class="likeButton" data-id="${post.id}">Like (${post.likes})</button>
            <button class="dislikeButton" data-id="${post.id}">Dislike (${post.dislikes})</button>
        `;
        postsContainer.appendChild(postDiv);
    });

    // Attach event listeners to like and dislike buttons
    document.querySelectorAll('.likeButton').forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = Number(e.target.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);
            post.likes++;
            renderPosts();
        });
    });

    document.querySelectorAll('.dislikeButton').forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = Number(e.target.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);
            post.dislikes++;
            renderPosts();
        });
    });
}
