import { IStudio } from '@/lib/types/studiospace';
import React from 'react';

const ExploreStudioPage = async () => {

    const res = await fetch("http://localhost:5000/studios");
    if (!res.ok) {
        throw new Error("Failed to fetch studios");
    }
    const studios: IStudio[] = await res.json();

    const allCategories = [...new Set(studios.map((category) => category.category))];


    return (
        <div>
            <h2>Explore Studios</h2>
        </div>
    );
};

export default ExploreStudioPage;