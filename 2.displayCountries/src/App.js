import "./styles.css";
import React, { useState } from "react";

function MyC() {
  const [input, setInput] = useState("");
  const [countryList, setcountryList] = useState(
    "You should enter A name of country"
  );
  function handlesubmit() {
    retriveCapname(input).then((res) => setcountryList(res));
  }

  return (
    <div>
      <input
        className="input"
        keyword={"searchcountry"}
        placeholder={"Search by name"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button" onClick={handlesubmit}>
        Prease to search country
      </button>
      <p className="App">{countryList}</p>
    </div>
  );
}
export default function App() {
  return MyC();
}
const nameUrl = "https://restcountries.com/v2/name/";
const capitalUrl = "https://restcountries.com/v2/alpha/";
async function retriveCapname(cname) {
  console.log(cname);
  const acUrl = nameUrl.concat(cname);
  const res = await fetch(acUrl);
  const cjson = await res.json();
  console.log(cjson);
  if (!cjson[0]) {
    return "Not a country name";
  }
  var result = "";
  for (let i = 0; i < cjson.length; i++) {
    result = result.concat(await cjson[i].name);
    result = result.concat(": ");
    let capital = await cjson[i].capital;
    if (!capital) {
      result = result.concat(await cjson[i].name);
    } else {
      result = result.concat(await cjson[i].capital);
    }
    let boarders = await cjson[i].borders;
    if (!!boarders) {
      for (let j = 0; j < boarders.length; j++) {
        result = result.concat(", ");
        let accUrl = capitalUrl.concat(boarders[j]);
        let resC = await fetch(accUrl);
        let cjsonC = await resC.json();
        if (!cjsonC.capital) {
          result = result.concat(await cjsonC.name);
        } else {
          result = result.concat(await cjsonC.capital);
        }
      }
    }
    result = result.concat(";");
  }
  return result;
}
