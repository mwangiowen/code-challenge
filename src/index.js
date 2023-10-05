// Your code here
document.addEventListener("DOMContentLoaded", function () {
    function fetchData() {
      fetch("http://localhost:3000/characters") 
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          
          displayCharacterNames(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }

    function displayCharacterNames(characters) {
      const characterBar = document.getElementById("character-bar");
  
      characters.forEach((character) => {
        const characterName = document.createElement("span");
        characterName.textContent = character.name;
        characterName.addEventListener("click", () => {
        
          displayCharacterDetails(character);
        });
        characterBar.appendChild(characterName);
      });
    }
  
    function displayCharacterDetails(character) {
      const detailedInf = document.getElementById("detailed-info");
      const nameElement = document.getElementById("name");
      const imageElement = document.getElementById("image");
      const voteCountElement = document.getElementById("vote-count");
  
    detailedInf
      nameElement.textContent = character.name;
      imageElement.src = character.image; 
      voteCountElement.textContent = character.votes;
  
    
      const votesForm = document.getElementById("votes-form");
      votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const votesInput = document.getElementById("votes");
        const votes = parseInt(votesInput.value, 10);
        if (!isNaN(votes)) {
          character.votes += votes;
          voteCountElement.textContent = character.votes;
          votesInput.value = ""; 
        }
      });
  
      
      const resetBtn = document.getElementById("reset-btn");
      resetBtn.addEventListener("click", () => {
        character.votes = 0;
        voteCountElement.textContent = character.votes;
      });
    }
  
    fetchData();
  });
  const characterForm = document.getElementById("character-form");
  characterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newNameInput = document.getElementById("new-name");
    const newImageUrlInput = document.getElementById("new-image-url");

    // Create a new character object from the form input values
    const newCharacter = {
      name: newNameInput.value,
      image: newImageUrlInput.value,
      votes: 0, // You can set an initial vote count if needed
    };

    // Add the new character to your list
    addNewCharacter(newCharacter);

    // Clear the form fields
    newNameInput.value = "";
    newImageUrlInput.value = "";
  });

  function addNewCharacter(character) {
    // Send a POST request to your server to add the new character
    fetch("http://localhost:3000/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // After successfully adding the character, you can choose to update the UI
        // with the new character or trigger a refresh of the character list.
        // For example, you can call fetchData() again.
        fetchData();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  // ... the rest of your code ...
;

  
  