const noSavedWordsContainer = document.getElementById("nosavedwords_container");
const savedWordsContainer = document.getElementById("savedwords_container");

const searchInput = document.getElementById("searchInSavedword");

let savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];

if (savedWords.length === 0) {
  noSavedWordsContainer.classList.remove("hidden");
  savedWordsContainer.classList.add("hidden");
} else {
  noSavedWordsContainer.classList.add("hidden");
  savedWordsContainer.classList.remove("hidden");
}

//delete functionality
savedWordsContainer.addEventListener("click", (event) => {
  //console.log(event.target);
  if (event.target.tagName === "BUTTON") {
    //console.log("Delete button clicked");
    const card = event.target.parentElement;
    const wordToDelete = card.firstElementChild.textContent;

    savedWords = savedWords.filter((item) => item.word !== wordToDelete);

    localStorage.setItem("savedWords", JSON.stringify(savedWords));

    card.remove();
    if (savedWords.length === 0) {
      noSavedWordsContainer.classList.remove("hidden");
      savedWordsContainer.classList.add("hidden");
    }
    //console.log(wordToDelete);
  }
    alert("word Deleted");
});

//search in saved word
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  // console.log(searchText);
  const filterWords = savedWords.filter((item) => {
    return item.word.toLowerCase().includes(searchText);
  });
  savedWordsContainer.innerHTML = "";

  if (filterWords.length === 0) {
    savedWordsContainer.textContent = "No matching words found!";
  } else {
    displayCard(filterWords);
  }
  // console.log(filterWords);
});

//display card
function displayCard(words) {
  words.sort((a, b) => a.word.localeCompare(b.word));
  words.forEach((item) => {
    let card = document.createElement("div");
    card.className =
      "rounded-lg border border-gray-200 shadow-md max-w-3xl mx-auto p-6 mb-5";

    const word = document.createElement("h3");
    word.className = "text-2xl font-bold text-blue-900";
    word.textContent = item.word;

    const phonetic = document.createElement("p");
    phonetic.className = "text-gray-500 text-sm mt-1";
    phonetic.textContent = item.phonetic || "No phonetic available";

    const pos = document.createElement("p");
    pos.className = "text-sm text-purple-700 mt-2 font-medium";
    pos.textContent = item.meanings[0].partOfSpeech;

    const def = document.createElement("p");
    def.className = "text-gray-700 mt-3";
    def.textContent = item.meanings[0].definitions[0].definition;

    const example = document.createElement("p");
    example.className = "text-gray-500 text-sm italic mt-3";
    example.textContent =
      item.meanings[0].definitions[0].example || "No example available";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700";

    card.appendChild(word);
    card.appendChild(phonetic);
    card.appendChild(pos);
    card.appendChild(def);
    card.appendChild(example);
    card.appendChild(deleteBtn);

    savedWordsContainer.appendChild(card);
  });
}

displayCard(savedWords);
