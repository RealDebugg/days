import Head from 'next/head'
import localFont from 'next/font/local'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const broad = localFont({ src: '../VolvoBroad.ttf' })
const novum = localFont({ src: '../VolvoNovum.woff2' })

export default function Countdown() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/fetch?id=${id}`)
            .then(async (res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setCountdown(data);
                setLoading(false);
            })
            .catch(() => {
                router.replace('/');
            });
    }, [id, router]);

    const getDaysLeft = (targetDate) => {
        const now = new Date();
        const target = new Date(targetDate);
        now.setHours(0,0,0,0);
        target.setHours(0,0,0,0);
        const diff = target - now;
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    const getPercentage = (targetDate) => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const target = new Date(targetDate);
        const total = (target - start) / (1000 * 60 * 60 * 24);
        const elapsed = (now - start) / (1000 * 60 * 60 * 24);
        return Math.min(100, Math.max(0, Math.floor((elapsed / total) * 100)));
    };

    let daysLeft = 0;
    let percentage = 0;
    if (countdown) {
        daysLeft = getDaysLeft(countdown.date);
        percentage = getPercentage(countdown.date);
    }

    return (
        <>
            <Head>
                <title>{loading ? "Loading..." : countdown?.title || "Countdown"}</title>
            </Head>
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-dvh">
                    <span className="spinner" />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-dvh relative">
                    <h1 className={`text-white font-bold text-4xl text-center mb-4 ${broad.className}`}>{countdown.title}</h1>
                    <p className={`text-white font-bold text-8xl text-center mb-6 ${broad.className}`}>{percentage}%</p>
                    <div className={`text-white text-base text-center mb-2 ${novum.className}`}>
                        <p style={{ margin: '0 20px' }}>
                            {daysLeft === 0
                                ? "The target date has been reached!"
                                : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left until the target date`}
                        </p>
                        <p style={{ margin: '0 20px', marginTop: 10 }}>
                            Target date: {new Date(countdown.date).toLocaleDateString()}
                        </p>
                    </div>
                    <button className="advert-button" onClick={() => router.push('/create')}>Create your own countdown</button>
                </div>
            )}
        </>
    );
}
