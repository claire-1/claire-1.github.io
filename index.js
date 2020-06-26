const api = 'https://dev.to/api';

/** 
 * Creates a feed of DEV posts.
 * @param {Element} elem - Place list of posts inside this element.
 * @param {string} username - DEV username, e.g. 'ben'.
 * @param {number} numberOfPosts - Number of posts to list. 
 */
function createFeed(elem, username, numberOfPosts = 5) {
    var feed = document.createElement('div');
    feed.classList.add('row');
    getPosts(username)
        .then(function (posts) {
            posts.length = numberOfPosts;
            posts.forEach(function (post) {
                var col = document.createElement('col');
                col.classList.add('col-lg-6');
                col.classList.add('col-md-3');
                col.classList.add('col-sm-4');
                var panel = document.createElement('div');
                panel.classList.add('panel');
                panel.classList.add('panel-default');

                var panelBody = document.createElement('div');
                panelBody.classList.add('panel-body');
                panel.appendChild(panelBody);

                var panelBodyImage = document.createElement('img');
                panelBodyImage.src = post.cover_image;
                panelBodyImage.alt = "Post cover image";
                panelBodyImage.classList.add('img-responsive');
                panelBodyImage.classList.add('center-block');
                panelBody.appendChild(panelBodyImage);

                var panelFooter = document.createElement('div');
                panelFooter.classList.add('panel-footer');
                panel.appendChild(panelFooter);

                var panelFooterHeader = document.createElement('h3');
                var panelFooterLink = document.createElement('a');
                panelFooterLink.href = post.url;
                panelFooterLink.innerText = post.title;
                panelFooterLink.target = "__blank";
                panelFooterHeader.appendChild(panelFooterLink);
                panelFooter.appendChild(panelFooterHeader);

                var panelFooterDesc = document.createElement('p');
                panelFooterDesc.textContent = post.description;
                panelFooter.appendChild(panelFooterDesc);
                var panelFooterTags = document.createElement('p');
                panelFooterTags.classList.add('post-tags');
                panelFooterTags.textContent = post.tags;
                panelFooter.appendChild(panelFooterTags);

                col.appendChild(panel);
                feed.appendChild(col);
            });
            elem.appendChild(feed);
        });
}

/**
 * Get a DEV user's post objects.
 * Only fetches previously 30 posts. Using `&page=X` is too slow.
 * @param {string} username - DEV username, e.g. 'ben'.
 * @returns {array} User's post objects.
 */
function getPosts(username) {
    return fetch(`${api}/articles?username=${username}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            return posts.sort((a, b) => b.positive_reactions_count - a.positive_reactions_count);
        });
}