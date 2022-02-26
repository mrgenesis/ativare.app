'use strict';

const AURAServer = require('./aura-server');
const Panel = require('./panel');
const uDX201 = require('./udx201');
const Ex214 = require('./ex214');
const I2CKeyPad = require('./ic2-key-pad');
const multiplexedKeyPad = require('./multiplexed-key-pad');
const Point = require('./point');
const Pulser = require('./pulser');

module.exports = {
  AURAServer: new AURAServer(),
  panel: new Panel(),
  uDX201: new uDX201(),
  ex214: new Ex214(),
  I2CKeyPad: new I2CKeyPad(),
  multiplexedKeyPad: new multiplexedKeyPad(),
  point: new Point(),
  pulser: new Pulser(),
};
