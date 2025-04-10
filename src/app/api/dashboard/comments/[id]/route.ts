import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params
		if (!id) {
			return NextResponse.json({ message: 'لطفا همه فیلدها را پر کنید' }, { status: 400 })
		}
		const comment = await prisma.comment.delete({
			where: { id },
		})
		return NextResponse.json({ message: 'دیدگاه با موفقیت تایید شد', comment })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'خطا در ویرایش دیدگاه' }, { status: 500 })
	}
}
