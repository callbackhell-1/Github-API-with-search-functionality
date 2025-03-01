const getUserName = document.querySelector('#user') as HTMLInputElement;
const formSubmit = document.querySelector('#form') as HTMLFormElement;
const main_container = document.querySelector('.main-container') as HTMLElement;

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
  console.log(dataInJson);
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
