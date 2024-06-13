import localFont from 'next/font/local'

const broad = localFont({ src: './VolvoBroad.ttf' })
const novum = localFont({ src: './VolvoNovum.woff2' })
export default function Home() {

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
      <p className={`text-white font-bold text-8xl text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${broad.className}`}>{percentage}%</p>
      <div className={`text-white text-base text-center absolute top-[60%] left-1/2 -translate-y-1/2 -translate-x-1/2 ${novum.className}`}>
        <p>Of the year has passed, thats {getDayOfYear()} out of {daysInYear(new Date().getFullYear())} days</p>
      </div>
    </>
  );
}
