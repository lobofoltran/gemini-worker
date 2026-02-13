export interface Env {
  GEMINI_API_KEY: string
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 })
    }

    try {
      const body = await req.text()

      const geminiRes = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY,
          },
          body,
        }
      )

      return new Response(geminiRes.body, {
        status: geminiRes.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500 }
      )
    }
  },
}
