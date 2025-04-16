import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenbyEmail } from "@/data/verification-token";
import { sendEmailVerification } from "@/app/lib/mail";

export async function POST(req: NextRequest) {  
  try {
    const { email } = await req.json();
    /// check if there is a token for this email
    const checkToken = await getVerificationTokenbyEmail(email);
    if (checkToken) {
      await prisma.verificationToken.delete({
        where: { id: checkToken.id },
      });
    }
    /// if not, generate and send a new token into the database
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000);
    await prisma.verificationToken.create({
      data: { token, expires, email },
    });
    await sendEmailVerification(email, token)

    return NextResponse.json({ message: "Confirmation email sent!" }, {status:201});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong." }, {status:500});
  }
}
