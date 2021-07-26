// Drum Arrays
let kicks = new Array(16).fill(false);
let snares = new Array(16).fill(false);
let hiHats = new Array(16).fill(false);
let rideCymbals = new Array(16).fill(false);


const getDrumArrayByName = (name) => {
  switch (name) {
    case 'kicks':
      return kicks;
    case 'snares':
      return snares;
    case 'hiHats':
      return hiHats;
    case 'rideCymbals':
      return rideCymbals;
    default:
      return;
  }
};

const toggleDrum = (drumArrayName, index) => {
  const drums = getDrumArrayByName(drumArrayName);
  if (!drums || index > 15 || index < 0) {
    return;
  }
  drums[index] = !drums[index];
};

const clear = (drumArrayName) => {
  const drums = getDrumArrayByName(drumArrayName);
  if (drums) {
    drums.fill(false);
  }
};

const invert = (drumArrayName) => {
  const drums = getDrumArrayByName(drumArrayName);
  if (!drums) {
    return;
  }
  for (let i = 0; i < drums.length; i++) {
    drums[i] = !drums[i];
  }
};
