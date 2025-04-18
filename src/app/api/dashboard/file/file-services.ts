import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
export const Endpoint = process.env.s3_ENDPOINT!
const Accesskey = process.env.s3_ACCESS_KEY!
const SecretKey = process.env.s3_SECRET_KEY!
const Bucket = process.env.s3_BUCKET_NAME!

export const s3client = new S3Client({
	region: 'default',
	endpoint: Endpoint,
	credentials: {
		accessKeyId: Accesskey,
		secretAccessKey: SecretKey,
	},
	forcePathStyle: true,
})

export const uploadImage = async (file: File) => {
	const upload = new Upload({
		client: s3client,
		params: {
			Bucket,
			Key: file.name,
			Body: file,
			ACL: 'public-read',
		},
		queueSize: 4,
		leavePartsOnError: false,
	})
	return upload
}

export const getImageUrl = (filename: string) => {
	return `${Endpoint}/${Bucket}/${encodeURIComponent(filename)}`
}
