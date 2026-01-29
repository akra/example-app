const API_URL = process.env.API_URL;

const server = Bun.serve({
  port: 4000,
  async fetch(request) {
    try {
      const response = await fetch(API_URL, { keepalive: false });
      const data = await response.json();

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <main style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
          <h1>Welcome</h1>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          <p>Rendered at: ${new Date().toLocaleTimeString()}</p>
        </main>
      `;

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      return new Response("API is down!", { status: 500 });
    }
  },
});

console.log(`Frontend running at http://localhost:${server.port}`);
