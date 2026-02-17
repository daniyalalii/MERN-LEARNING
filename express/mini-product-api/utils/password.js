const bcrypt = require('bcryptjs');

// password in hash
const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

// compare with hash
const comparePassword = async(password,hashPassword) =>{
    return await bcrypt.compare(password,hashPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};