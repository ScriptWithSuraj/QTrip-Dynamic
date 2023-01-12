import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cities = new URLSearchParams(search);
  return cities.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventure = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const data= await adventure.json();
    console.log(data)
    return data;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //const elem = document.getElementById("data");
  // adventures.map((e) => {
  //   let card = document.createElement("div");
  //   card.className = "col-6 col-lg-3 mb-4 position-relative";
  //   card.id = e.id;
  //   card.innerHTML = `
  //   <a href="/detail/?adventure=${e.id}" id="${e.id}">
  //   <div class= "activity-card">
  //   <img class="img-responsive" src=${e.image}/>
  //   <div class="d-md-flex justify-content-between flex-wrap w-100 px-3 my-2">
  //   <h5>${e.name}</h5>
  //   <p>₹${e.costPerHead}</p>
  //   </div>
  //   <div class="d-block d-md-flex justify-content-between flex-wrap w-100 px-3">
  //   <h5>Duration</h5>
  //   <p>${e.duration} Hours</p>
  //   </div>
  //   </div>
  //   </a>
  //   `;
  //   document.getElementById("data").appendChild(card);
  //   const banner = document.createElement("div");
  //   banner.className = "category-banner";
  //   banner.innerHTML = `${e.category}`;
  //   card.appendChild(banner);
  // });
  for(let i=0;i<adventures.length;i++)
    {
      let elem=document.createElement('div')
  elem.className="col-6 col-lg-3 mb-4 position-relative"
  elem.innerHTML=`
                  <a href="detail/?adventure=${adventures[i].id}" id="${adventures[i].id}">
                    <div class="activity-card">
                    <img class="activity-card" src="${adventures[i].image}" />
                   </div>
                    <div class="d-flex justify-content-around">
                   <h5>${adventures[i].name}</h5>
                    <p>₹${adventures[i].costPerHead}</p>
                    </div>
                    <div class='d-flex justify-content-around'>
                      <h5>Duration</h5>
                      <p>${adventures[i].duration} Hours</p>
                    </div>
                    </a>
                    `;
                document.getElementById('data').appendChild(elem)
                const banner = document.createElement("div");
    banner.className = "category-banner";
    banner.innerHTML = `${adventures[i].category}`;
    elem.appendChild(banner);

    }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((e) => {
    return e.duration > low && e.duration <= high;
  });
  console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((e) => {
    return categoryList.includes(e.category);
  });
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let duration = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(duration[0]),
      parseInt(duration[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  } else if (
    filters["duration"].length > 0 &&
    filters["category"].length === 0
  ) {
    let duration = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(duration[0]),
      parseInt(duration[1])
    );
  } else if (
    filters["duration"].length === 0 &&
    filters["category"].length > 0
  ) {
    filteredList = filterByCategory(list, filters["category"]);
  } else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters["duration"];
  let categoryLst = document.getElementById("category-list");
  filters["category"].map((e, index) => {
    let pill = document.createElement("div");
    pill.id = index;
    pill.className = "category-filter";
    pill.innerHTML = `<div class="d-flex">
    <div>${e}</div>&nbsp&nbsp
    <div><button id=${index}${e} type="button" class="btn-close" aria-label="Close"></button></div>
    </div>`;
    categoryLst.appendChild(pill);
  });
}
function rmvChld(filters) {
  if (filters["category"].length > 0) {
    filters["category"].map((e, index) => {
      document.getElementById(`${index}${e}`).addEventListener("click", () => {
        // categoryLst.removeChild(document.getElementById(index));
         filters["category"].splice( filters["category"].indexOf(e),1);
      });
    });
  }
  return filters["category"]
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  rmvChld,
};
