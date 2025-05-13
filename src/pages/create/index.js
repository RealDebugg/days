import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Create() {
    const titleRef = useRef();
    const dateRef = useRef();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: titleRef.current.value,
                    date: dateRef.current.value,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/countdown/${data.id}`);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Create a Countdown | Days</title>
            </Head>
            <div className="create-box">
                <h1>Create a countdown</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" required ref={titleRef} disabled={loading} />
                    <input type="date" placeholder="Date" required ref={dateRef} disabled={loading} />
                    <button type="submit" disabled={loading}>
                        {loading ? (<span className="spinner" />) : null}Create
                    </button>
                </form>
                <div className="warning-block">
                    <p><b>WARNING!!</b> Any information provided in here is public and can be accessed by anyone, do not enter any personal data that can be used to identify you or any other person.</p>
                </div>
            </div>
        </>
    );
}
