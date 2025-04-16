import { prisma } from "@/app/lib/prisma"

export const getTwoFactorConfirmationByUserId = async (userId:string) => {
    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
            where:{userId}
        })
        return twoFactorConfirmation
    } catch (error) {
        console.log(error)
        return null
    }
}