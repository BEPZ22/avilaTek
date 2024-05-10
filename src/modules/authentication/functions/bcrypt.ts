import bcrypt from 'bcryptjs';

export default class Bcrypt {

	static sleep(ms:number) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	static makeid(length:number) {
		let result           = ''
		const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		const charactersLength = characters.length
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}
		return result
	}

	static cryptPassword (password:string):Promise<string>  {
		return new Promise(function (resolve, reject) {
			bcrypt.genSalt(10, function (err, salt) {
				if (err) return reject(err)
				bcrypt.hash(password, salt, function (err, hash) {
					if (err) return reject(err)
					return resolve(hash)
				})
			})
		})
	}

	static comparePassword (password:string, encrypted:string) {
		return new Promise(function (resolve, reject) {
			bcrypt.compare(password, encrypted, function (err, result) {
				if (err) return reject(err)
				return resolve(result)
			})
		})
	}

}
