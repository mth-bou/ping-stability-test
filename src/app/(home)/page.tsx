import React from 'react';
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import {getAuthSession} from "@/lib/auth";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

const Home = async () => {
    const data = await getData();
    const session = await getAuthSession();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Home;
