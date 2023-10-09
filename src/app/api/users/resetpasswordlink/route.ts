import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import User from "@/model/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email } = reqBody;

  console.log(email);

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Reset password link send successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
