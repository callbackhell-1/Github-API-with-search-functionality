const getUserName = document.querySelector('#user') as HTMLInputElement;
const formSubmit = document.querySelector('#form') as HTMLFormElement;
const main_container = document.querySelector('.main_container') as HTMLElement;

//https://api.github.com/users

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
