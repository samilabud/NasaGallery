export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request) {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=ZbdGsoJ2onkeM3YKrVGrzhzkwOQd017cN4Ki5mQf`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
