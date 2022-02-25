'use strict';


module.exports = function setContext(context) { 
  const { Auth, ServiceFactory } = context.Classes;
  const authc = new Auth();  

  async function auth(email, password) {
    const user = await context.model.user.findOne({ email }).select('+password');
    let tokenUser = { group: user.group, code: user.code, _id: user._id };
    let responseUser = { email: user.email, name: user.name };

    if (!user) {
      throw this.createError('User not found/Password invalid.', 403);
    }
    
    if (!await authc.compare(password, user.password)) {
      throw this.createError('User not found/Password invalid.', 403);
    }
    
    const authorization = await authc.generateToken({ param: tokenUser });
    return { authorization, user: responseUser };
  }

  return new ServiceFactory(auth, 'w', 'Permite entrar com login de senha para visualizar as informações restritas.');
};
