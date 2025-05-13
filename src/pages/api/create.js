import { PrismaClient } from '../../../prisma/generated/client';

const prisma = new PrismaClient();

export default async function GenerateRoom(req, res) {
    const { date, title } = req.body;
    await prisma.countdowns.create({
        data: {
            date: new Date(date).toISOString(),
            title
        },
    }).then((countdown) => {
        res.status(200).json({ id: countdown.id });
        return;
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Error creating countdown' });
        return;
    });
}