  // DISPLAY PUBLIC CHAIN DATA
  export function displayPublicData() {
    frequentLocationsButton.addEventListener("click", () => {
  
      const loggedInUser = localStorage.getItem("userLoggedIn");
      if (!loggedInUser) {
        let firstChain = localStorage.getItem("first");
        let chain;
  
        if (firstChain) {
          chain = JSON.parse(localStorage.getItem("first"));
        }
  
        if (!localStorage.first) {
  
          // Show alert
          alert("No chain created yet!");
  
        }
        // Get all the cities from the blocks in the chain
        let cities = chain.blockChain.map(block => block.data.city);
  
        // Count the frequency of each city
        let cityCounts = {};
        for (let city of cities) {
          if ((city !== "undefined") && city in cityCounts) { // exclude undefined cities: sometimes the API returns undefined
            cityCounts[city]++;
          } else if (city) {
            cityCounts[city] = 1;
          }
        }
  
        // Find country corresponding to cities with highest count
        let cityToCountry = {};
        chain.blockChain.forEach(block => {
          let city = block.data.city;
          let country = block.data.country;
          cityToCountry[city] = country;
        });
  
        // Sort according to city frequency
        let sortedCities = Object.keys(cityCounts).sort((a, b) => cityCounts[b] - cityCounts[a]);
  
        // Get the data for the newest block
        let newestBlock = chain.blockChain[chain.blockChain.length - 1];
        let newestBlockCity = newestBlock.data.city;
        let newestBlockCountry = newestBlock.data.country;
        let newestBlockTime = newestBlock.timestamp;
  
        // Convert the timestamp to a date object
        let date = new Date(newestBlockTime);
  
        // Get the local time in the format "hh:mm:ss"
        let localTime = date.toLocaleTimeString();
  
        // Display the top three cities
        let topThreeCities = sortedCities.slice(0, 3);
        let parentEl = document.getElementById("newH3");
  
  
        // TOGGLE: display list on first click, remove list on clicking again
        // Check if the list is already displayed
        if (parentEl.getElementsByTagName("ul").length > 0) {
          // List is already displayed, so remove it
          parentEl.innerHTML = ""; // ahh, finally!! Toggle the entire newH3
  
        } else {
  
          // List is not displayed, so add it
  
          // Add an empty line before the header
          let emptyLine = document.createElement("br");
          parentEl.appendChild(emptyLine);
  
          // Add a header to the list
          let header = document.createElement("h3");
          header.innerHTML = "Top locations logged by our system";
          parentEl.appendChild(header);
  
          // Add an empty line after the header
          parentEl.appendChild(document.createElement("br"));
  
          // Create the list element
          let list = document.createElement("ul");
          parentEl.appendChild(list);
  
          // Loop through the top three cities and add them to the list along with the corresponding country and number of blocks logged from that city
          topThreeCities.forEach((city, index) => {
            let item = document.createElement("li");
            item.innerHTML = `${city}, ${cityToCountry[city]} [logged ${cityCounts[city]} times]`;
            list.appendChild(item);
  
          });
  
          // Add an empty line before "Last block added from"
          list.appendChild(document.createElement("br"));
  
          // Create a header element for the latest block information
          let latestBlockHeader = document.createElement("h5");
          latestBlockHeader.innerHTML = "Last block added from";
  
          // Create a paragraph element for last block information
          let latestBlockParagraph = document.createElement("p");
          latestBlockParagraph.innerHTML = `${newestBlockCity}, ${newestBlockCountry}, ${localTime}`;
  
          let latestBlock = document.createElement("li");
  
          // Append the header and paragraph elements to the list item
          latestBlock.appendChild(latestBlockHeader);
          latestBlock.appendChild(latestBlockParagraph);
  
          // Append the list item to the list
          list.appendChild(latestBlock);
  
          // Add an empty line after the list item
          list.appendChild(document.createElement("br"));
  
        }
  
      }
    });
  };