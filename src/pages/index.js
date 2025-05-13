import localFont from 'next/font/local'
import { useRouter } from 'next/router'

const broad = localFont({ src: './VolvoBroad.ttf' })
const novum = localFont({ src: './VolvoNovum.woff2' })
export default function Home() {
  const router = useRouter();

  const daysInYear = (year) => {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365;
  }

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // January 1st of the current year
    const diff = now - start; // difference in milliseconds
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
    const dayNumber = Math.floor(diff / oneDay) + 1; // calculate day number
    return dayNumber;
  }

  let percentage = Math.floor((getDayOfYear() * 100) / daysInYear(new Date().getFullYear()));

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <p className={`text-white font-bold text-8xl text-center mb-6 ${broad.className}`}>{percentage}%</p>
        <div className={`text-white text-base text-center mb-2 ${novum.className}`}>
          <p style={{ margin: '0 20px' }}>
            Of the year has passed, that's {getDayOfYear()} out of {daysInYear(new Date().getFullYear())} days
          </p>
        </div>
        <button className="advert-button" onClick={() => router.push('/create')}>Create your own countdown</button>
      </div>
    </>
  );
}
