// Restaurants shown in the "Where I'm Eating" card.
// To change one, edit the text below. To add one, copy a block and paste it in the list.
//
// name:     the restaurant name
// location: the city or neighborhood
// rating:   your Beli rating, for example "8.7"
//           (leave as "" to show a dash)
// image:    path to a photo, for example "assets/images/my-restaurant.jpg"
//           (leave as "" to show a gray placeholder)
// url:      link to the restaurant on Beli. It is used on the photo and the rating.
//           (leave as "" and the photo and rating will not be links)
// googleMapsUrl: link to the restaurant's exact location on Google Maps. It is used
//           on the restaurant name only, and opens in a new tab.
//           (leave as "" and the name will not be a link)

const restaurants = [
  {
    name: "Sushi Yasuda",
    location: "New York, NY",
    rating: "9.6",
    // Photo: "Sushi Yasuda" by Thomas Craven (2013), via Wikimedia Commons,
    // licensed CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/).
    // Cropped and resized for this site.
    image: "assets/images/restaurants/sushi-yasuda.jpg",
    url: "",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sushi+Yasuda%2C+204+E+43rd+St%2C+New+York%2C+NY+10017"
  },
  {
    name: "Tobacco Company",
    location: "Richmond, VA",
    rating: "9.2",
    image: "assets/images/restaurants/tobacco-company.jpg",
    url: "",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Tobacco+Company+Restaurant%2C+1201+E+Cary+St%2C+Richmond%2C+VA+23220"
  },
  {
    name: "KŌWHAI Restaurant",
    location: "Nusa Penida, Bali, Indonesia",
    rating: "8.9",
    image: "assets/images/restaurants/kowhai.jpg",
    url: "",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=K%C5%8CWHAI%20Restaurant%2C%20Jalan%20Gamat%20Bay%2C%20Nusa%20Penida%2C%20Bali%2C%20Indonesia"
  },
  {
    name: "John's of Bleecker Street",
    location: "New York, NY",
    rating: "8.6",
    image: "assets/images/restaurants/johns-of-bleecker-street.jpg",
    url: "",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=John%27s+of+Bleecker+Street%2C+278+Bleecker+St%2C+New+York%2C+NY+10014"
  },
  {
    name: "Ci Siamo",
    location: "New York, NY",
    rating: "8.4",
    image: "assets/images/restaurants/ci-siamo.jpg",
    url: "",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ci+Siamo%2C+440+W+33rd+St%2C+New+York%2C+NY+10001"
  }
];
