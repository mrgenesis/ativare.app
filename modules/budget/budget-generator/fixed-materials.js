'use strict';

const FixedMaterialCreator = require('./fixed-material-creator');

module.exports = amount => ({
  uDX201: new FixedMaterialCreator({ name: 'uDX201', unitPrice: 1350, msLimit: 280, portLimit: 40, amount}),
  I2CKeyPad: new FixedMaterialCreator({ name: 'Key Pad I2C', unitPrice: 230, ms: 18.9, amount }),
  multiplexedKeyPad: new FixedMaterialCreator({ name: 'Key Pad Multiplexado', unitPrice: 180, amount, ports: 8 }),
  point: new FixedMaterialCreator({ name: 'Multiplexador', unitPrice: 120, portLimit: 10, amount }),
  pulser: new FixedMaterialCreator({ name: 'Pulsador', unitPrice: 120, amount }),
  panel: new FixedMaterialCreator({ name: 'Painel Montado', unitPrice: 1300, amount }),
  AURAServer: new FixedMaterialCreator({ name: 'Servidor Aura', unitPrice: 1350, amount }),
  ex214: new FixedMaterialCreator({ name: 'Expansão 214', unitPrice: 750, amount }),
});
