import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to: string, resetLink: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "no-reply@yourdomain.com", // Resend will prompt you to verify this domain or sender
      to,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Click below to set a new password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Could not send reset email");
    }

    return data;
  } catch (err) {
    console.error("Resend Error:", err);
    throw err;
  }
}
