import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export async function GET() {
    try {
        const requests = await prisma.request.findMany()
        if(!requests) {
            throw new Error("Request not found")
        }
        return NextResponse.json({requests})
    } catch(error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const {name, email, phone, notes , requestedDate , requestedTime , expertId , serviceId , } = body
        const request = await prisma.request.create({
            data: {
                name,
                email,
                phone,
                notes,
                requestedDate,
                requestedTime,
                expert: {connect : {id: expertId}},
                service : {connect : {id: serviceId}},
            }
        })
        if(!request) {
            throw new Error("Request not created")
        }
    }catch(error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json()
        const {id, status} = body
        const request = await prisma.request.update({
            where: {id},
            data: {status}
        })
        if(!request) {
            throw new Error("Request not updated")
        }
        return NextResponse.json({message: "Request updated"})
    }catch(error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}