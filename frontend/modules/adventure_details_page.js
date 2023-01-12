import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let advntr = new URLSearchParams(search);
  return advntr.get("adventure");

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adid = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
  const data= await adid.json();
  return data
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
 // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure)
  const headName=document.getElementById("adventure-name").innerHTML=adventure.Name
   document.getElementById("adventure-name").innerHTML=adventure.name;
  adventure.images.forEach((e,i)=>{
    let img= document.createElement("img")
    img.className="activity-card-image"
    img.src=e;
    document.getElementById("photo-gallery").appendChild(img)
   })
  const contentAdvntr=document.createElement("p");
  contentAdvntr.innerHTML=adventure.content
  document.getElementById("adventure-content").appendChild(contentAdvntr);
  document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators">
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
const carousel_indicators=document.getElementById("carousel-indicators");
const carousel_image=document.getElementById("carousel-inner");
images.forEach((item,index)=>{
  const indicators = document.createElement("button")
  indicators.setAttribute("data-bs-target","#carouselExampleIndicators");
  indicators.setAttribute("type","button");
  indicators.setAttribute("data-bs-slide-to",index);
  indicators.setAttribute("aria-label",`Slide ${index+1}`)
  const img=document.createElement("div")
   img.className="carousel-item"

  if(index==0)
  {
  indicators.classList.add("active");
  indicators.setAttribute("aria-current","true");
  img.classList.add("active")
  }
  img.innerHTML=`<img src="${item}" class="d-block activity-card-image"/>`
  carousel_indicators.appendChild(indicators);
  carousel_image.appendChild(img)

})

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const sold_panel=document.getElementById("reservation-panel-sold-out")
  const available_panel=document.getElementById("reservation-panel-available");
  if(adventure.available===false)
  {
    
    document.getElementById("reservation-panel-sold-out").style.display="block"
    document.getElementById("reservation-panel-available").style.display="none"
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="none"
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML=adventure.costPerHead*persons
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault;
    let myUrl = config.backendEndpoint + "/reservations/new";
    let formELements = form.elements;
    let bodyString = JSON.stringify({
      name: formELements["name"].value,
      date: formELements["date"].value,
      person: formELements["person"].value,
      adventure: adventure.id,
    });
    try {
      let data = await fetch(myUrl, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });
      debugger;
      if (data.ok) {
        alert("Success");
        //window.location.reload();
      } else {
        let res = await data.json();
        alert(`Failed-${res.message}`);
      }
    } catch (e) {
      alert("Failed");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display="block"
  }
  else
  {
    document.getElementById("reserved-banner").style.display="none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
