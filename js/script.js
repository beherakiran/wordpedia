// search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");

async function searchWord() {
  const word = searchInput.value.trim();

  if (word === "") {
    alert("Please enter a word");
    return;
  }
  try {
    resultContainer.innerHTML = "Searching for the word...";

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    const result = data[0];

    resultContainer.innerHTML = "";

    const wordHeading = document.createElement("h2");
    wordHeading.className = "text-3xl font-bold text-blue-900";
    wordHeading.textContent = result.word;

    resultContainer.appendChild(wordHeading);

    const phonetic = document.createElement("p");
    phonetic.className = "mt-2 text-gray-500 text-lg";
    phonetic.textContent = result.phonetic || "no phonetic available";

    resultContainer.appendChild(phonetic);

    const meanings = result.meanings;
    meanings.forEach((meaning) => {
      const pos = document.createElement("h2");
      pos.className = "mt-5 text-lg font-semibold text-blue-800";
      pos.textContent = meaning.partOfSpeech;

      const definition = document.createElement("p");
      definition.className = "mt-2 text-gray-700";
      definition.textContent = meaning.definitions[0].definition;

      resultContainer.appendChild(pos);
      resultContainer.appendChild(definition);

      const example = document.createElement("p");
      example.className = "mt-2 text-sm italic text-gray-500";
      example.textContent =
        meaning.definitions[0].example || "No example available";

      resultContainer.appendChild(example);
    });

    // const wordText = result.word;
    // const phonetics = result.phonetics;
    // const meanings = result.meanings;
    // console.log(data);
    // console.log(wordText);
    // console.log(phonetics);
    // console.log(meanings);
  } catch (error) {
    console.log("Error:", error);

    resultContainer.innerHTML = "";

    const errorMessage = document.createElement("p");
    errorMessage.className = "text-red-500 mt-4";
    errorMessage.textContent =
      error.message === "Word not found"
        ? "Word not found. Please try another word."
        : "Something went wrong. Please check your internet connection.";

    resultContainer.appendChild(errorMessage);
  }
}

searchBtn.addEventListener("click", searchWord);
