function createUUID(){
  var date = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(charater) {
      var random = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date/16);
      return ((charater === 'x') ? random : ((random & 0x3) | 0x8 )).toString(16);
  });
  return uuid;
}

export default createUUID;
