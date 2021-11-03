
# Star ratings
I display different default star number from 0-5.
use mouse and click to see.

## instructions
1. Go into this directory `cd Sarratings`
2. Run `npm install` to install packages
3. Run `npm start` to start the client side----It only have client side anyway

Implement a 5-star widget for an eCommerce site for users to record a product rating. The widgetdisplays a horizontal row of stars that are either outlined or black, according to the product rating,
from left to right. E.g. ★★★☆☆ = rating of 3.
Multiple 5-star widgets can be present on a single page. If a user has not rated a product, the
widget will have 5 outlined stars (☆☆☆☆☆). Each product on the page has a UUID.
Hovering over the Nth star will light up stars 1 to N with a grey colour (e.g. ★★★★☆). Clicking astar will record the rating by sending a request to a web server with enough information to record
the product and the rating. After clicking, the widget will then display the rating the
user-submitted with black stars (e.g. ★★★★☆). Submitting the rating is handled without
refreshing the page.
You may assume that you have access to all ES2017 features, and do not need to make it compatible with IE11. Assume that there is a REST endpoint setup. You may use JavaScript libraries
(e.g. React, jQuery) to assist in building the widget, provided that they do not solve the entire problem. You do not need to handle AuthN/AuthZ for submitting the rating and can assume that the request includes authentication information to identify the customer (but you do need to be  able to pass along the product ID).
