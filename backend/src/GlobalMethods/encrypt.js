const bcrypt = require('bcrypt')

const saltRounds = 8;

// const someOtherPlaintextPassword = 'not_bacon';


const encryptPass=async (password)=>{

    const hashedPassword=await bcrypt.hashSync(password, saltRounds);
    //console.log(await bcrypt.compareSync('123', hashedPassword)); //
    return hashedPassword;
}

module.exports={
    encryptPass:encryptPass
}
