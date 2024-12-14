export default async function Quiz({ params }: { params?: { category?: string[] } }) {
    const param = params?.category?.[0];
    let data;
    if (!param) {
        data = { quiz: [] };
    } else {
        const response = await fetch(
            `http://localhost:5000/get-questions/${param}`,
            { cache: "force-cache", next: { revalidate: 30 } }
        );

        data = await response.json()
    }
    return <h1>quiz</h1>

}