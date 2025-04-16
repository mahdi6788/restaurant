import crypto from "crypto"
import { getTwoFactorTokenbyEmail } from "@/data/two-factor-token"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { sendTwoFactorTokenEmail } from "@/app/lib/mail"

export const POST = async (req:NextRequest) => {
    try {
        const {email} = await req.json()
        const existingTwoFactorToken = await getTwoFactorTokenbyEmail(email)
        if (existingTwoFactorToken) {
            await prisma.twoFactorToken.delete({
                where:{id: existingTwoFactorToken.id}      
            })
        }
        /// generate token and put in the database
        const token = crypto.randomInt(100_000, 1_000_000).toString()    /// create a rendom 6 digit token
        const expires = new Date(new Date().getTime() + 15 * 60 * 1000)      /// expires by 15 min
        const twoFactorToken = await prisma.twoFactorToken.create({
            data:{email, token, expires}
        })
        
        await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
        
        return NextResponse.json({message: "Check your email"}, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}