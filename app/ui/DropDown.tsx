"use client";

import { useRouter } from "next/navigation"; 
import { ChangeEvent } from "react";

export default function DropDown({ categories }: { categories: string[] }) {
    const router = useRouter();

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        const category = event.target.value;
        if (category) {
            router.push(`/quiz/${category}`);
        }
    }

    return (
        <select className="text-black w-[10rem] h-10" onChange={handleChange}>
            <option value="" hidden>
                Select Category
            </option>
            {categories.map((category: string) => (
                <option key={category} value={category} className="text-black">
                    {category}
                </option>
            ))}
        </select>
    );
}
