import { PrismaClient } from '../../../prisma/generated/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing countdown ID' });
    }

    try {
        const countdown = await prisma.countdowns.findUnique({
            where: { id },
        });

        if (!countdown) {
            return res.status(404).json({ error: 'Countdown not found' });
        }

        res.status(200).json(countdown);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching countdown' });
    }
}