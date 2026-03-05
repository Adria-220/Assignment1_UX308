let currentState = welcoming;

const menu = {
  pizza: {
    sizes: ["small", "medium", "large"],
    toppings: ["pepperoni", "mushroom", "cheese"]
  },
  burger: {
    sizes: ["single", "double"],
    toppings: ["lettuce", "tomato", "bacon"]
  }
};

const drinks = ["coke", "sprite", "water"];

let order = [];

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;
  order = [];
}

function welcoming() {
  let aReturn = [];
  currentState = ordering;

  aReturn.push("Welcome to Dream Takeout!");
  aReturn.push("What would you like? (pizza or burger)");

  return aReturn;
}

function ordering(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase();

  if(menu[input]){

    currentState = choosingSize;

    order.push({item: input});

    aReturn.push(`You chose ${input}. What size? ${menu[input].sizes.join(", ")}`);

  } else {

    aReturn.push("Sorry, we only have pizza or burger.");

  }

  return aReturn;
}

function choosingSize(sInput){
  let aReturn = [];
  const size = sInput.toLowerCase();
  const lastItem = order[order.length-1];

  if(menu[lastItem.item].sizes.includes(size)){

    lastItem.size = size;
    currentState = choosingTopping;

    aReturn.push(`Great. Choose a topping: ${menu[lastItem.item].toppings.join(", ")}`);

  } else {

    aReturn.push("Invalid size. Try again.");

  }

  return aReturn;
}

function choosingTopping(sInput){
  let aReturn = [];
  const topping = sInput.toLowerCase();
  const lastItem = order[order.length-1];

  if(menu[lastItem.item].toppings.includes(topping)){

    lastItem.topping = topping;
    currentState = upsell;

    aReturn.push(`Added ${lastItem.size} ${lastItem.item} with ${topping}.`);
    aReturn.push(`Would you like a drink? (${drinks.join(", ")})`);

  } else {

    aReturn.push("Invalid topping. Try again.");

  }

  return aReturn;
}

function upsell(sInput){
  let aReturn = [];
  const drink = sInput.toLowerCase();

  if(drinks.includes(drink)){

    order.push({drink: drink});
    aReturn.push(`${drink} added to your order.`);

  } else {

    aReturn.push("No drink added.");

  }

  currentState = summary;

  aReturn.push(showOrder());

  return aReturn;
}

function summary(){
  let aReturn = [];
  aReturn.push("Thank you for your order!");
  currentState = welcoming;
  return aReturn;
}

function showOrder(){

  let text = "Your order:\n";

  for(let item of order){

    if(item.item){
      text += `${item.size} ${item.item} with ${item.topping}\n`;
    }

    if(item.drink){
      text += `Drink: ${item.drink}\n`;
    }

  }

  return text;
}