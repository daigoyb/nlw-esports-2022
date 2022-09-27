import express from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/conver-minutes-to-hour-string";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return res.status(200).json(games)
});

interface requestBody {
    name: string;
    yearsPlaying: number;
    weekDays: number[];
    discord: string;
    hourStart: string;
    hourEnd: string;
    useVoiceChannel: boolean;
}

app.post('/games/:id/ads', async (req, res) => {
    const BODY = req.body;
    const gameId = req.params.id;

    const ad = await prisma.ads.create({
        data: {
            gameId,
            name: BODY.name,
            yearsPlaying: BODY.yearsPlaying,
            weekDays: BODY.weekDays.join(','),
            discord: BODY.discord,
            hourStart: convertHourStringToMinutes(BODY.hourStart),
            hourEnd: convertHourStringToMinutes(BODY.hourEnd),
            useVoiceChannel: BODY.useVoiceChannel
        }
    });

    return res.status(201).json(ad)
})

app.get('/games/:id/ads', async (req, res) => {

    const gameId = req.params.id;
    const ads = await prisma.ads.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return res.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),

        }
    }));
});

app.get('/games/:id/discord', async (req, res) => {
    try {
        const adId = req.params.id;
        const ad = await prisma.ads.findUniqueOrThrow({
            select: {
                discord: true
            },
            where: {
                id: adId
            }
        })
    
        return res.status(200).json({
            discord: ad.discord
        });
    } catch (err) {
        return res.status(404).json(err)
    }

});

app.listen(3000);