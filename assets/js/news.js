fetch('https://news.thenext.cc/rss.json')
.then(async function (response) {
  const res = await response.json();
  const items = res.items;

  const list = document.querySelector('.list');
  const fragment = document.createDocumentFragment();

  items.forEach(i => {
    const li = document.createElement('li');
    const timeObj = new Date(i.date_modified);
    const theHours = (timeObj.getHours()<10?'0':'') + timeObj.getHours();
    const theMinutes = (timeObj.getMinutes()<10?'0':'') + timeObj.getMinutes();
    li.innerHTML = `<p class="title"><a class="link" href="${i.url}" target="_blank">${theHours}:${theMinutes}</a>${i.title}</p>`;
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
})