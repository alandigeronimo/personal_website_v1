// Photos shown on the Journey page.
// To use a real photo, put the image in assets/images/ and set "image" to its path,
// for example "assets/images/adventures/patagonia.jpg".
// To add a photo, copy a block and paste it in the list.
//
// image:    path to the photo
//           (leave as "" to show a gray placeholder)
// alt:      a short description for screen readers (it is not shown on the page)
// position: optional. Which part of the photo stays in view inside its 3:4 tile, for example
//           "center 30%" (horizontal vertical). Photos that are already 3:4 do not need it.
// region:   country or state, shown in small uppercase letters, for example "Indonesia"
//           or "California, USA"
// location: the place name, shown in italic
// caption:  a short personal line about the photo
// date:     month and year, for example "March 2026"
//
// The photos are in assets/images/adventures/.
// Leave region, caption, location, and date as "" if you don't have them yet:
// anything left blank is simply not shown.
//
// The gallery shows these 15 photos in a 5 x 3 grid, in this order (left to right, top to bottom).
// Three photos are saved in the folder but not used: sydney.jpg, puerto-rico.jpg, my-son.jpg.
//
// Example of a filled-in photo (do not copy these words, they are only an example of the format):
//   { image: "assets/images/adventures/example.jpg", region: "New Zealand", location: "City", caption: "A short description", date: "March 2026" }

const adventures = [
  // Row 1
  { image: "assets/images/adventures/sea-turtle.jpg", alt: "Snorkeling with a sea turtle", region: "Indonesia", location: "Gili Trawangan", caption: "Just two guys going with the flow", date: "" },
  { image: "assets/images/adventures/mountain-overlook.jpg", alt: "Looking out at a mountain range from a terrace", region: "Puerto Rico", location: "El Yunque Rainforest", caption: "Somewhere between the clouds and the canopy", date: "" },
  { image: "assets/images/adventures/nusa-penida.jpg", alt: "Standing above the Nusa Penida cliffs, Indonesia", region: "Indonesia", location: "Nusa Penida", caption: "Came for the views. Stayed for the monkey business", date: "" },
  { image: "assets/images/adventures/t100-gold-coast.jpg", alt: "Finishing the T100 triathlon on the Gold Coast, Australia", region: "Australia", location: "T100 Gold Coast Triathlon", caption: "Three sports in one morning seemed like a good idea at the time", date: "" },
  { image: "assets/images/adventures/thailand-elephant.jpg", alt: "Standing beside an elephant at a sanctuary in Thailand", position: "center 70%", region: "Thailand", location: "Chiang Mai", caption: "Made some pretty big friends in Thailand", date: "" },
  // Row 2
  { image: "assets/images/adventures/hobbiton.jpg", alt: "At Hobbiton, New Zealand", region: "New Zealand", location: "Hobbiton", caption: "Turns out the Shire is just as magical in real life", date: "" },
  { image: "assets/images/adventures/safari-elephant.jpg", alt: "On a safari with an elephant in the background", position: "40% center", region: "South Africa", location: "Kruger National Park", caption: "Hard to describe the feeling of seeing these animals in the wild", date: "" },
  { image: "assets/images/adventures/golden-bridge.jpg", alt: "On the Golden Bridge in Vietnam", region: "Vietnam", location: "Bà Nà Hills", caption: "A bridge that's quite literally in good hands.", date: "" },
  { image: "assets/images/adventures/california-lake.jpg", alt: "Sitting above an alpine lake in California", region: "California, USA", location: "Rock Creek Lake", caption: "A few days off the grid in one of my favorite places", date: "" },
  { image: "assets/images/adventures/koala.jpg", alt: "Holding a koala in Australia", position: "center 30%", region: "Australia", location: "Currumbin Wildlife Sanctuary", caption: "Just hanging out with the locals", date: "" },
  // Row 3
  { image: "assets/images/adventures/mount-cook.jpg", alt: "Looking out at a snowy mountain landscape in New Zealand", region: "New Zealand", location: "Mt. Cook", caption: "A good reminder of just how small we really are", date: "" },
  { image: "assets/images/adventures/bangkok-temple.jpg", alt: "In front of a temple in Bangkok, Thailand", region: "Thailand", location: "Bangkok", caption: "Between the temples, street food, and chaos, Bangkok won me over", date: "" },
  { image: "assets/images/adventures/phi-phi.jpg", alt: "Overlooking the Phi Phi Islands, Thailand", region: "Thailand", location: "Phi Phi Islands", caption: "A beautiful sunset that made the steep climb worth it.", date: "" },
  { image: "assets/images/adventures/huka-falls.jpg", alt: "Above a turquoise waterfall in New Zealand", region: "New Zealand", location: "Huka Falls", caption: "Another unplanned stop that turned into a highlight", date: "" },
  { image: "assets/images/adventures/kayaking.jpg", alt: "Kayaking with a group along a rocky coastline", position: "40% center", region: "South Africa", location: "Boulders Beach", caption: "The scenic route came with an arm workout", date: "" }
];
