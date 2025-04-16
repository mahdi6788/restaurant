/*
export async function sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 24 hours.</p>`,
    });
  }
*/