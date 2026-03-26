let currentState = welcoming;

const menu = {
  "peach green tea": {
    sizes: ["small", "regular", "large"],
    toppings: ["tapioca", "pearls", "jelly"]
  },
  "mango slush": {
    sizes: ["small", "regular", "large"],
    toppings: ["tapioca", "pearls", "jelly"]
  }
};

const desserts = ["matcha cake", "mochi donut", "pudding"];

let order = [];

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  order = [];
  currentState = welcoming;
}

function welcoming(sInput) {        // accepts sInput but ignores it
  let aReturn = [];
  currentState = ordering;          // advance state HERE, not in clearInput

  aReturn.push("Welcome to brantford bubble tea");
  aReturn.push("What would you like? (peach green tea or mango slush)");
  return aReturn;
}

function ordering(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase();

  if (menu[input]) {
    currentState = choosingSize;
    order.push({ item: input });
    aReturn.push(`You chose ${input}. What size? ${menu[input].sizes.join(", ")}`);
  } else {
    aReturn.push("Sorry, we only have peach green tea or mango slush.");
  }

  return aReturn;
}

function choosingSize(sInput) {
  let aReturn = [];
  const size = sInput.toLowerCase();
  const lastItem = order[order.length - 1];

  if (menu[lastItem.item].sizes.includes(size)) {
    lastItem.size = size;
    currentState = choosingTopping;
    aReturn.push(`Great. Choose a topping: ${menu[lastItem.item].toppings.join(", ")}`);
  } else {
    aReturn.push("Invalid size. Try again.");
  }

  return aReturn;
}

function choosingTopping(sInput) {
  let aReturn = [];
  const topping = sInput.toLowerCase();
  const lastItem = order[order.length - 1];

  if (menu[lastItem.item].toppings.includes(topping)) {
    lastItem.topping = topping;
    currentState = upsell;
    aReturn.push(`Added ${lastItem.size} ${lastItem.item} with ${topping}.`);
    aReturn.push(`Would you like a dessert? (${desserts.join(", ")})`);
  } else {
    aReturn.push("Invalid topping. Try again.");
  }

  return aReturn;
}

function upsell(sInput) {
  let aReturn = [];
  const dessert = sInput.toLowerCase();

  if (desserts.includes(dessert)) {
    order.push({ dessert: dessert });
    aReturn.push(`${dessert} added to your order.`);
  } else {
    aReturn.push("No dessert added.");
  }

  aReturn.push(showOrder());
  aReturn.push("Thank you for your order!");

  order = [];
  currentState = welcoming;         // reset to welcoming for next customer

  return aReturn;
}

function showOrder() {
  let text = "Your order:\n";

  for (let item of order) {
    if (item.item) {
      text += `${item.size} ${item.item} with ${item.topping}\n`;
    }
    if (item.dessert) {
      text += `Dessert: ${item.dessert}\n`;
    }
  }

  return text;
}