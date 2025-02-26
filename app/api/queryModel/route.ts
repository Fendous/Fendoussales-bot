// /app/api/queryModel/route.ts
export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        
        const response = await fetch("http://localhost:8000/queryModel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
