import React from "react";
/**
 * As discribed, only consider start ratings here.
 */
/** The main rating control function.
 * It receive the props whcih represent
 * the real product in a real application.
 * Then, it analysis the rating, which should be fetched with another function.
 * It will first render grey stars, but if the user have clicked,
 * which means the user has his/her own opinion,
 * then the  grey parts dispear until the full program refreshs.
 * Every time when the user click inside the stars, the rating data will be sent to the server.
 * In my opinion, this props contains uuid, rating and so on.
 */
function StarRating(props) {
  const [rating, setRating] = React.useState(
    typeof props.rating === "number" ? props.rating : 0
  );
  //To check if the mouse move on the stars
  const [hoverbs, setHoverbs] = React.useState(false);
  //To check if user select, in real process this may be replced with user choice if they have make so.
  const [selected, setSelected] = React.useState(false);
  //record selected stars number when the mouse is on
  const [selection, setSelection] = React.useState(0);

  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute("star-id"))
      val = event.target.getAttribute("star-id");
    setSelection(val);
    setHoverbs(!hoverbs);
  };
  return (
    <div
      // Mouse in
      onMouseOut={() => hoverOver(null)}
      //Mouse out
      onMouseOver={hoverOver}
      // Mouse click
      onClick={(event) => {
        setRating(event.target.getAttribute("star-id") || rating);
        setSelected(true);
        // In the real product, here will be function calls API communciate with backend database
      }}
    >
      {Array.from({ length: 5 }, (
        v,
        i /**Creat five stars, in real work maybe more starts */
      ) => (
        <RStar
          starId={i + 1}
          key={`star_${i + 1} `}
          defaulted={selected ? false : hoverbs ? false : rating >= i + 1}
          //if user has clicked once, the defulted is banned;
          //
          //Otherwise it check if the mouse moved on the stars. if on, disabled;
          //Otherwise; render them;
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
}

/** compoent to render a single star, defauled determined whether its a default ranking star,
 * which is grey star. and marked is use to determine if its a full star, which
 * means rated.
 */
function RStar({ defaulted, marked, starId }) {
  return defaulted ? (
    <span star-id={starId} style={{ color: "#808080" }} role="button">
      {"\u2605"}
    </span>
  ) : (
    <span star-id={starId} style={{ color: "#000000" }} role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
}

export default function () {
  return (
    //In actual application, the following may not be directly called
    //But compined with other product functions
    //But this is a sudo demo anyway.
    <div>
      <StarRating rating={-1} />
      <StarRating />
      <StarRating rating={1} />
      <StarRating rating={2} />
      <StarRating rating={3} />
      <StarRating rating={4} />
      <StarRating rating={5} />
    </div>
  );
}
