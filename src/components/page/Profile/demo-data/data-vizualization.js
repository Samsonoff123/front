
let currentDate = new Date();

let fourDaysAgo = new Date();
fourDaysAgo.setDate(currentDate.getDate() - 4);

let lastFourDays = []

for (let i = 0; i < 6; i++) {
    let day = new Date();
    day.setDate(currentDate.getDate() - i);
    let formattedDay = day.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    lastFourDays.push(formattedDay);
}

export const Views = [
    {
        day: lastFourDays[6],
        views:  35,
        rating: 50,
    },
    {
        day: lastFourDays[5],
        views: 38,
        rating: 25,
    },
    {
        day: lastFourDays[4],
        views: 40,
        rating: 50,
    },
    {
        day: lastFourDays[3],
        views: 50,
        rating: 70,
    },
    {
        day: lastFourDays[2],
        views: 77,
        rating: 80,
    },
    {
        day: lastFourDays[1],
        views: 85,
        rating: 90,
    },
    {
        day: lastFourDays[0],
        views: +localStorage.getItem('views'),
        rating: +localStorage.getItem('rating'),
    },
];