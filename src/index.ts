const getUserName = document.querySelector('#user') as HTMLInputElement;
const formSubmit = document.querySelector('#form') as HTMLFormElement;
const main_container = document.querySelector('.main_container') as HTMLElement;


interface User {
  id: number;
  avatar_url: string;
  url: string;
  login: string;
}

async function myCustomFetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const data = await fetch(url);
  const dataInJson = await data.json();
  return dataInJson;
}

function fetchUserData(url: string) {
  myCustomFetcher<User[]>(url, {}).then((users) => {
    for (const user of users) {
      displayUI(user);
    }
  });
}

fetchUserData('https://api.github.com/users');

//frontend
function displayUI(userInfo: User) {
  const { avatar_url, login, url } = userInfo;

  main_container.insertAdjacentHTML(
    'beforeend',
    `
    <div class='card'>
      <img src="${avatar_url}" alt="${login}" />
      <hr />
      <div class="card-footer">
        <img src="${avatar_url}" alt="${login}" />
        <a href="${url}" target="_blank" rel="noopener noreferrer">Github</a>
      </div>
    </div>
    `
  );
}

// implement search functionality
formSubmit.addEventListener('submit', async (e) => {
  e.preventDefault();
  let userText = getUserName.value.toLowerCase();
  const url = 'https://api.github.com/users';
  //url
  const allUserData = await myCustomFetcher<User[]>(url, {});
  const matchingUser = allUserData.filter((user: User) => {
    if (user.login.includes(userText)) {
      return user;
    }
  });
  main_container.innerHTML = '';
  if (matchingUser.length === 0) {
    main_container?.insertAdjacentHTML(
      'beforeend',
      `<p class="empty-msg"> No matching users found.</p>`
    );
  } else {
    for (const user of matchingUser) {
      displayUI(user);
    }
  }
});
