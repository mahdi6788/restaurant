'use server'

import { sendPasswordResetEmail } from "@/app/lib/mail"
import { prisma } from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import {v4 as uuidv4} from "uuid"

export async function POST (req:NextRequest) {
    const {email} = await req.json()
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000)

    /// check if there is a password reset token in databse 

    try {
        const existingPassResetToken = await prisma.passwordResetToken.findFirst({
            where:{email}
        })
    
        if(existingPassResetToken) {
            await prisma.passwordResetToken.delete({
                where:{id: existingPassResetToken.id}
            })
        }
    
        const passResetToken = await prisma.passwordResetToken.create({
            data:{email, expires, token}
        })

        await sendPasswordResetEmail(passResetToken.email, passResetToken.token)
    
        return NextResponse.json({message: "Check your email please"}, {status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Something went wrong!"}, {status:500})        
    }

}