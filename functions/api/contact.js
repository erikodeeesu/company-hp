export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // 超簡易バリデーション
    const name = (data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const subject = (data.subject || "").toString().trim();
    const message = (data.message || "").toString().trim();
    const company = (data.company || "").toString().trim();

    if (!name || !email || !subject || !message) {
      return new Response("Bad Request", { status: 400 });
    }

    // Resend API
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,          // 例: "Contact <onboarding@resend.dev>" 等（Resend側の条件に合わせる）
        to: [env.MAIL_TO],            // 会社の受信メール
        reply_to: email,              // 返信先をお客様メールに
        subject: `[お問い合わせ] ${subject}`,
        text:
`【お名前】${name}
【メール】${email}
【会社名】${company || "-"}
【件名】${subject}

【内容】
${message}
`,
      }),
    });

    if (!resendRes.ok) {
      const t = await resendRes.text();
      return new Response(`Email failed: ${t}`, { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("Server Error", { status: 500 });
  }
}

