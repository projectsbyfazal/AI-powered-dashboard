import { financeData, healthStats } from "@/mockDatas";

export async function POST(req) {
  try {
    const { message, chats } = await req.json();

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",

        messages: [
          {
            role: "system",
            content: `You are a dashboard AI assistant. Reply in very short and clear answers (max 1 line). 
              this is our ongoing chats so remember discussion from here ${JSON.stringify(chats)}.
              this is my health data statistics ${JSON.stringify(healthStats)} which contain steps, sleep and Calories values.
              this is my finance (Portfolio) related Data ${JSON.stringify(financeData)}.
              `,
          },
          {
            role: "user",
            content: message,
          },
        ],

        max_tokens: 60,
        temperature: 0.4,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("OpenRouter Error:", data);
      return Response.json(
        { reply: "AI service unavailable" },
        { status: 500 },
      );
    }

    return Response.json({
      data,
      reply: data.choices?.[0]?.message?.content?.trim() || "No response",
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json({ reply: "Something went wrong" }, { status: 500 });
  }
}

// Please uncomment below if open ai is not working

// export async function POST(req) {
//   try {
//     const { message, chats, healthStats, financeData } = await req.json();

//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "mistralai/mistral-7b-instruct-v0.1", // ✅ switched model

//         messages: [
//           {
//             role: "system",
//             content: `
//                 You are a dashboard AI assistant.

//                 Rules:
//                 - Reply in 1 short sentence only
//                 - Be clear and helpful
//                 - Use provided data if relevant

//                 Chat history in JSON Format:
//                 ${JSON.stringify(chats?.slice(-5))}

//                 Health Data in JSON Format:
//                 ${JSON.stringify(healthStats)}

//                 Finance (Portfolio) Data in JSON Format:
//                 ${JSON.stringify(financeData)}
//             `,
//           },
//           {
//             role: "user",
//             content: message,
//           },
//         ],

//         max_tokens: 60,
//         temperature: 0.5,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       console.error("OpenRouter Error:", data);

//       return Response.json(
//         { reply: "AI is busy. Try again." },
//         { status: 500 }
//       );
//     }

//     return Response.json({
//       reply: data.choices?.[0]?.message?.content?.trim() || "No response",
//     });

//   } catch (err) {
//     console.error("API ERROR:", err);

//     return Response.json(
//       { reply: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
