import QuestionCard from "@/app/ui/QuestionCard";

export default async function Quiz({ params }: { params?: { category?: string[] } }) {
    const param = params?.category?.[0] ?? '';
    let data;
    if (!param) {
        data = { questions: [] };
    } else {
        try {
            const response = await fetch(
                `http://localhost:4000/get-questions/${param}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }


            data = await response.json()
            if (data) {
                console.log(data)
            } else {
                console.log("data not found")
            }
        } catch (error) {
            console.log(error)
            data = { questions: [] };

        }
    }
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-9 bg-slate-300">
                <QuestionCard Quiz={data} category={param}/>
            </div>
            <div className="col-span-3 bg-slate-500">

            </div>
        </div>
    )

}