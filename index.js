var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//1.Select and cache the <main> element in a variable named mainEl.

const mainEl = document.querySelector("main");

console.log(mainEl);

//2.Set the background color of mainEl to the value stored in the --main-bg CSS custom property.

let str = "var(--main-bg)";

mainEl.style.backgroundColor = "var(--main-bg)";

//3.Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.

const h1 = document.createElement("h1");
h1.textContent = "DOM Manipulation";

mainEl.appendChild(h1);

//4.Add a class of flex-ctr to mainEl.

mainEl.classList.add("flex-ctr");

//Part 2: Creating a Menu Bar

//1.Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.

const topMenuEl = document.getElementById("top-menu");

console.log(topMenuEl);

//2.Set the height of the topMenuEl element to be 100%.

topMenuEl.style.height = "100%";

//3.Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.

topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

//4.Add a class of flex-around to topMenuEl.

topMenuEl.classList.add("flex-around");

//Part 3: Adding Menu Buttons

//   Iterate over the entire menuLinks array and for each "link" object:

for (let link of menuLinks) {
  let a = document.createElement("a");
  a.textContent = link.text;
  a.setAttribute("href", link.href);
  topMenuEl.appendChild(a);
  console.log(link, "  ----link");
}

//4.Part 4: Adding Interactivity
//Second Assignment

//Part 3: Creating the Submenu

//1.Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById("sub-menu");
//2.Set the height subMenuEl element to be "100%".
subMenuEl.style.height = "100%";
//3.Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.

subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

//4.Add the class of flex-around to the subMenuEl element.

subMenuEl.classList.add("flex-around");

//1.Set the CSS position property of subMenuEl to the value of absolute.

subMenuEl.style.position = "absolute";

//2.Set the CSS top property of subMenuEl to the value of 0.

subMenuEl.style.top = "0";

//Part 4: Adding Menu Interaction

//1.Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.

const topMenuLinks = document.querySelectorAll("#top-menu a");
const topMenuLinksArr = Array.from(topMenuLinks);
console.log(topMenuLinks, " topmenulinks");

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(event.target.className);
  if (event.target.localName !== "a") {
    return;
  }
  //1.The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
  if (event.target.className !== "active") {
    event.target.classList.add("active");
  }

  //The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.

  for (let i = 0; i < topMenuLinks.length; i++) {
    //console.log(i, " removing ");
    topMenuLinks[i].classList.remove("active");
    event.target.classList.add("active");
  }
  if (event.target.className == "active") {
    console.log(event.target.text, "   7887");

    for (let links of menuLinks) {
      console.log(links.subLinks !== undefined);
      console.log(links.text, "links=====");

      if (links.text === event.target.text) {
        buildSubmenu(links.subLinks);
        if (links.subLinks !== undefined) {
          subMenuEl.style.top = "100%";
        } else {
          subMenuEl.style.top = "0%";
          h1.textContent = event.target.text;
        }
      }
    }
  }
});

function buildSubmenu(subLinks) {
  if (subLinks !== undefined) {
    console.log("========", subLinks);
    subMenuEl.replaceChildren();
    for (let link of subLinks) {
      const a = document.createElement("a");
      a.href = link.href;
      a.text = link.text;
      subMenuEl.appendChild(a);
    }
  }
}

//1.Attach a delegated 'click' event listener to subMenuEl.

subMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(event.target.localName, "  localname=====");
  if (event.target.localName !== "a") {
    return;
  }
  subMenuEl.style.top = 0;
  for (let link of topMenuLinks) {
    link.classList.remove("active");
  }
  h1.textContent = event.target.text;
});
