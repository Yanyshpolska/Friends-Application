// "use strict";
const URL =
  "https://randomuser.me/api/?results=15&nat=ua&inc=gender,name,dob,location,picture";

const usersArea = document.querySelector(".friends");
const genderFilter = document.querySelector(".options__gender-filter");
genderFilter.addEventListener("click", clickFiltering);
const ageNameSorting = document.querySelector(".options");
ageNameSorting.addEventListener("click", clickSorting);

const isMale = document.querySelector("#gender-male");
const isFemale = document.querySelector("#gender-female");
const isAll = document.querySelector("#gender-all");

const ageIncrease = document.querySelector("#age-increase");
const ageDecrease = document.querySelector("#age-decrease");
const nameAtoZ = document.querySelector("#name-AtoZ");
const nameZtoA = document.querySelector("#name-ZtoA");

let initialFriendsArray = [];
let resultingFriendsArray = [];

async function getData(url) {
  let response = await fetch(url);
  if (response.ok) {
    let users = await response.json();
    initialFriendsArray = users.results;
  } else {
    alert("Error HTTP: " + response.status);
  }
}

function initial() {
  resultingFriendsArray = initialFriendsArray;
  showFriends(resultingFriendsArray);
}

function showFriends(friendsArray) {
  usersArea.innerHTML = "";
  for (let user of friendsArray) {
    const userCard = document.createElement("div");
    userCard.classList.add("user");
    userCard.innerHTML = `<div class="user__photo" style="
		  background: url(${user.picture.large}) 0 0/cover no-repeat;
		"></div>
		 <span class="user__name">${user.name.last} ${user.name.first}</span>
		 <span class="user__info">${user.location.city}</span>
		 <span class="user__info">${user.gender}, ${user.dob.age}</span>`;
    usersArea.append(userCard);
  }
}

function clickFiltering(event) {
  switch (true) {
    case isMale.checked:
      resultingFriendsArray = filterMale(initialFriendsArray);
      showFriends(resultingFriendsArray);
      sortingArray(resultingFriendsArray);
      break;
    case isFemale.checked:
      resultingFriendsArray = filterFemale(initialFriendsArray);
      showFriends(resultingFriendsArray);
      sortingArray(resultingFriendsArray);
      break;
    case isAll.checked:
      resultingFriendsArray = initialFriendsArray;
      showFriends(resultingFriendsArray);
      sortingArray(resultingFriendsArray);
      break;
    default:
      break;
  }
}

function sortingArray() {
  switch (true) {
    case nameAtoZ.checked:
      showFriends(sortNameAtoZ(resultingFriendsArray));
      break;
    case nameZtoA.checked:
      showFriends(sortNameZtoA(resultingFriendsArray));
      break;
    case ageIncrease.checked:
      showFriends(sortAgeIncrease(resultingFriendsArray));
      break;
    case ageIncrease.checked:
      showFriends(sortAgeDecrease(resultingFriendsArray));
      break;
  }
}

function clickSorting() {
  sortingArray();
}

function sortAgeIncrease(friendsArray) {
  const users = [...friendsArray];
  return users.sort((a, b) => a.dob.age - b.dob.age);
}
function sortAgeDecrease(friendsArray) {
  const users = [...friendsArray];
  return users.sort((a, b) => b.dob.age - a.dob.age);
}
function sortNameAtoZ(friendsArray) {
  const users = [...friendsArray];
  return users.sort((a, b) => a.name.last.localeCompare(b.name.last));
}
function sortNameZtoA(friendsArray) {
  const users = [...friendsArray];
  return users.sort((a, b) => b.name.last.localeCompare(a.name.last));
}
function filterMale(friendsArray) {
  const users = [...friendsArray];
  return users.filter((user) => user.gender === "male");
}
function filterFemale(friendsArray) {
  const users = [...friendsArray];
  return users.filter((user) => user.gender === "female");
}

getData(URL).then(initial).then(sortingArray);
