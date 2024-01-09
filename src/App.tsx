import { useTestStore } from "./store/test.ts";
import React, {JSX, useState} from "react";
import {useQuery} from "@tanstack/react-query";
function App() {
    const state = useTestStore();
    const [inputNumber, setInputNumber] = useState("0");
    const increaseCount: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        state.increaseCount();
    }
    const setCountOnClick = (): void => {
        state.setCount(parseInt(inputNumber));
    }
    const setCount: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setInputNumber(e.target.value);
    }

    return (
        <>
            <h1>{state.count}</h1>
            <button onClick={increaseCount}>increase Count</button>
            <br/>
            <input value={inputNumber} onChange={setCount}/>
            <button onClick={setCountOnClick}>set Count</button>

            <br/>
            <br/>
            <ReactQuerySample />
        </>
    )
}

function ReactQuerySample(): JSX.Element {
    type TestType = { userId: number, id: number, title: string, completed: boolean };
    const { isLoading, data , isError, error } = useQuery<TestType>(
    {
        queryKey: ['testData'],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json()),
    });
    if (isLoading) return <>Loading...</>;
    if (isError) return <>{error.message}</>;

    return (
        <>
            id: {data?.id}<br/>
            userId: {data?.userId}<br/>
            title: {data?.title}<br/>
            completed: {data?.completed}
        </>
    );
}
export default App
