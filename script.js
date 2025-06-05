document.addEventListener('DOMContentLoaded', () => {
  const exteriorButtons = document.querySelectorAll('#exterior-buttons button');
  const interiorButtons = document.querySelectorAll('#interior-buttons button');
  const wheelButtons = document.querySelectorAll('#wheel-buttons button');
  const performanceBtn = document.getElementById('performance-btn');
  const fullSelfDrivingCheckbox = document.getElementById('full-self-driving-checkbox');
  const accessoryCheckboxes = document.querySelectorAll('.accessory-form-checkbox');

  const exteriorImage = document.getElementById('exterior-image');
  const interiorImage = document.getElementById('interior-image');
  const totalPriceElem = document.getElementById('total-price');
  const monthlyPaymentElem = document.getElementById('monthly-payment');

  const basePrice = 52490;
  const performanceWheelsPrice = 2500;
  const performanceUpgradePrice = 5000;
  const fullSelfDrivingPrice = 8500;
  const accessoriesPrices = [35, 105, 225];
  const downPayment = 5000;
  const loanTermMonths = 60;
  const interestRate = 0.03;

  let selectedExterior = 'stealth-grey';
  let selectedInterior = 'dark';
  let isPerformanceWheels = false;
  let isPerformanceUpgrade = false;

  function updatePrice() {
    let total = basePrice;
    if (isPerformanceWheels) total += performanceWheelsPrice;
    if (isPerformanceUpgrade) total += performanceUpgradePrice;
    if (fullSelfDrivingCheckbox.checked) total += fullSelfDrivingPrice;

    accessoryCheckboxes.forEach((checkbox, i) => {
      if (checkbox.checked) total += accessoriesPrices[i];
    });

    const monthlyRate = interestRate / 12;
    const loanAmount = total - downPayment;
    const monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -loanTermMonths));

    totalPriceElem.textContent = `$${total.toLocaleString()}`;
    monthlyPaymentElem.textContent = `$${monthlyPayment.toFixed(2)}`;
  }

  function updateExteriorImage() {
    const performanceSuffix = isPerformanceWheels ? '-performance' : '';
    const fileName = `./images/model-y-${selectedExterior}${performanceSuffix}.jpg`;
    exteriorImage.src = fileName;
  }

  function updateInteriorImage() {
    const fileName = `./images/model-y-interior-${selectedInterior}.jpg`;
    interiorImage.src = fileName;
  }

  // Exterior color selection
  exteriorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      exteriorButtons.forEach(b => b.classList.remove('btn-selected'));
      btn.classList.add('btn-selected');

      selectedExterior = btn.querySelector('img').alt.toLowerCase().replace(/ /g, '-');
      updateExteriorImage();
      updatePrice();
    });
  });

  // Interior color selection
  interiorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      interiorButtons.forEach(b => b.classList.remove('btn-selected'));
      btn.classList.add('btn-selected');

      selectedInterior = btn.querySelector('img').alt.toLowerCase();
      updateInteriorImage();
      updatePrice();
    });
  });

  // Wheel selection
  wheelButtons[0].addEventListener('click', () => {
    isPerformanceWheels = false;
    wheelButtons[0].classList.add('bg-gray-700', 'text-white');
    wheelButtons[1].classList.remove('bg-gray-700', 'text-white');
    updateExteriorImage();
    updatePrice();
  });

  wheelButtons[1].addEventListener('click', () => {
    isPerformanceWheels = true;
    wheelButtons[1].classList.add('bg-gray-700', 'text-white');
    wheelButtons[0].classList.remove('bg-gray-700', 'text-white');
    updateExteriorImage();
    updatePrice();
  });

  // Performance upgrade
  performanceBtn.addEventListener('click', () => {
    isPerformanceUpgrade = !isPerformanceUpgrade;
    performanceBtn.classList.toggle('bg-gray-700', isPerformanceUpgrade);
    performanceBtn.classList.toggle('text-white', isPerformanceUpgrade);
    updatePrice();
  });

  // Other inputs
  fullSelfDrivingCheckbox.addEventListener('change', updatePrice);
  accessoryCheckboxes.forEach(c => c.addEventListener('change', updatePrice));

  // Initial setup
  updateExteriorImage();
  updateInteriorImage();
  updatePrice();
});
