let array = [];
let steps = [];
let stepIndex = 0;
let sorting = false;
let autoMode = false;

function generateArray() {
  array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
  reset();
  renderArray();
  document.getElementById("status").textContent = "Array generated. Choose a mode to start sorting.";
}

function renderArray(activeIndex = -1, sortedUpTo = -1) {
  const container = document.getElementById("array-container");
  container.innerHTML = '';
  array.forEach((val, idx) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${val * 2}px`;
    if (idx === activeIndex) bar.classList.add('active');
    if (idx <= sortedUpTo) bar.classList.add('sorted');
    container.appendChild(bar);
  });
}

function prepareSteps() {
  steps = [];
  let temp = [...array];
  for (let i = 1; i < temp.length; i++) {
    let key = temp[i];
    let j = i - 1;

    while (j >= 0 && temp[j] > key) {
      temp[j + 1] = temp[j];
      steps.push({ arr: [...temp], active: j + 1, sorted: i });
      j = j - 1;
    }
    temp[j + 1] = key;
    steps.push({ arr: [...temp], active: j + 1, sorted: i });
  }
}

function startManualMode() {
  if (!array.length) return;
  sorting = true;
  autoMode = false;
  prepareSteps();
  stepIndex = 0;
  document.getElementById("status").textContent = "Manual Mode: Click 'Next' to proceed.";
}

function startAutoMode() {
  if (!array.length) return;
  sorting = true;
  autoMode = true;
  prepareSteps();
  stepIndex = 0;
  document.getElementById("status").textContent = "Auto Mode: Sorting in progress...";
  autoSort();
}

function nextStep() {
  if (!sorting || autoMode || stepIndex >= steps.length) return;
  applyStep();
}

function applyStep() {
  if (stepIndex >= steps.length) {
    document.getElementById("status").textContent = "Sorting Complete!";
    renderArray(-1, array.length - 1);
    sorting = false;
    return;
  }
  const step = steps[stepIndex];
  array = [...step.arr];
  renderArray(step.active, step.sorted);
  stepIndex++;
}

function autoSort() {
  if (stepIndex >= steps.length) {
    document.getElementById("status").textContent = "Sorting Complete!";
    renderArray(-1, array.length - 1);
    sorting = false;
    return;
  }
  applyStep();
  setTimeout(autoSort, 500); // 500ms delay between steps
}

function reset() {
  sorting = false;
  autoMode = false;
  stepIndex = 0;
  steps = [];
  document.getElementById("status").textContent = "Reset complete. Click 'Start' to sort.";
  renderArray();
}
