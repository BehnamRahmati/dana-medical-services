import { NextRequest } from 'next/server'


export async function handler(req: NextRequest) {
	if (req.method === 'GET') {
		return new Response('this is a sample model')
	}
}