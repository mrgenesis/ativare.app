'use strict';


module.exports = (UserModel) => { 
  const bcrypt = require('bcryptjs');

  return async function auth(email, password) {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return { Error: 'User not found.' };
    }
    
    if (!await bcrypt.compare(password, user.password)) {
      //throw UserModule.userError(401, 'user/pass incorrect');
    }
    
    delete user.password;
    
    return { token: this.tools.generateToken({ ...user }) };
  }
};
