require("dotenv").config();
const S3 = require('aws-sdk/clients/s3')

exports.uploadToS3 = (data,filename) => {
	
	let s3bucket = new S3({
		accessKeyId : process.env.IAM_USER_KEY,
		secretAccessKey : process.env.IAM_USER_SECRET,
	})
	let params = {
		Bucket :process.env.BUCKET_NAME,
		Key : filename,
		Body : data,
		ACL : 'public-read',
        ContentType : 'image/png',
	}

    return new Promise((resolve,reject) => {
        s3bucket.upload(params, (err,s3response) => {
            if(err) {
                console.log('something went wrong',err);
                reject(err)
            } else {
                // console.log('success', s3response);
                resolve(s3response.Location)
            }
        } )
    })
	
}