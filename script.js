document.getElementById("shippingForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const weight = parseFloat(document.getElementById("weight").value);
  const distance = parseFloat(document.getElementById("distance").value);
  const shippingType = document.getElementById("shippingType").value;

  if (isNaN(weight) || isNaN(distance) || weight <= 0 || distance <= 0) {
    document.getElementById("result").innerHTML = "⚠️ Please enter valid positive numbers.";
    return;
  }

  let ratePerKgPerKm = 0.05; // base rate

  switch (shippingType) {
    case "express":
      ratePerKgPerKm = 0.08;
      break;
    case "overnight":
      ratePerKgPerKm = 0.12;
      break;
  }

  const cost = weight * distance * ratePerKgPerKm;

  // Estimate delivery time
  let days;
  switch (shippingType) {
    case "standard":
      days = 5;
      break;
    case "express":
      days = 2;
      break;
    case "overnight":
      days = 1;
      break;
  }

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + days);

  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  document.getElementById("result").innerHTML = `
    💰 Estimated Cost: <strong>$${cost.toFixed(2)}</strong><br>
    🚚 Estimated Delivery: <strong>${formattedDate}</strong> (${days} day${days > 1 ? "s" : ""})
  `;
});
