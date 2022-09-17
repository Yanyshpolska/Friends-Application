"use strict";
const URL =
  "https://randomuser.me/api/?results=25&nat=ua&inc=gender,name,dob,location,picture";

const usersArea = document.querySelector(".friends");
const genderFilter = document.querySelector(".options__gender-filter");
genderFilter.addEventListener("click", clickFiltering);
const ageNameSorting = document.querySelector(".options__sorting");
ageNameSorting.addEventListener("click", sortingArray);
const searchNameFilter = document.querySelector(".options__search");
searchNameFilter.addEventListener("input", clickFiltering);

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
    const users = await response.json();
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

function clickFiltering() {
  switch (true) {
    case isMale.checked:
      resultingFriendsArray = filterMale(initialFriendsArray);
      break;
    case isFemale.checked:
      resultingFriendsArray = filterFemale(initialFriendsArray);
      break;
    case isAll.checked:
      resultingFriendsArray = initialFriendsArray;
      break;
    default:
      break;
  }
  resultingFriendsArray = searchNameinArray(resultingFriendsArray);
  //   showFriends(resultingFriendsArray);
  sortingArray(resultingFriendsArray);
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
    case ageDecrease.checked:
      showFriends(sortAgeDecrease(resultingFriendsArray));
      break;
  }
}

function sortAgeIncrease(friendsArray) {
  return friendsArray.sort((a, b) => a.dob.age - b.dob.age);
}
function sortAgeDecrease(friendsArray) {
  return friendsArray.sort((a, b) => b.dob.age - a.dob.age);
}
function sortNameAtoZ(friendsArray) {
  return friendsArray.sort((a, b) => a.name.last.localeCompare(b.name.last));
}
function sortNameZtoA(friendsArray) {
  return friendsArray.sort((a, b) => b.name.last.localeCompare(a.name.last));
}
function filterMale(friendsArray) {
  return friendsArray.filter((user) => user.gender === "male");
}
function filterFemale(friendsArray) {
  return friendsArray.filter((user) => user.gender === "female");
}

function searchNameinArray(friendsArray) {
  return friendsArray.filter(
    (user) =>
      user.name.last
        .toLowerCase()
        .includes(searchNameFilter.value.toLowerCase()) ||
      user.name.first
        .toLowerCase()
        .includes(searchNameFilter.value.toLowerCase())
  );
}

getData(URL).then(initial).then(sortingArray);

console.log(window.history);
