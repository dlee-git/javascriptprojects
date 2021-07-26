const presets = require('./presets');


const presetHandler = (method, index, newPresetArray) => {
  let preset = presets[index] || null;
  if (!preset) {
    return [404];
  }

  if (method === 'GET') {
    return [200, preset]

  } else if (method === 'PUT') {
    presets[index] = newPresetArray;
    return [200, newPresetArray];
  } else {
    return [400];
  }
}


module.exports = presetHandler;
