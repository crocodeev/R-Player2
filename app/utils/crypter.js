const crypto = require('crypto');

class Crypter {

    constructor(){
        this.algorithm = 'aes-256-ctr';
        this.secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
        this.iv = crypto.randomBytes(16)
    }
    
    getCipher(){
        console.log(this.iv);
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv)
        return cipher
    }

    getDechipher(){
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.iv)
        return decipher
    }


}

module.exports = Crypter