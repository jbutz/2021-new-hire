import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors';

const cors = Cors({
    methods: ['GET'],
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}


type ErrorOutput = {
    error: string
};

type ExchangeOutput = {
    from: string,
    to: string,
    rate: number
}

const factor = (new Date()).getDate() + 1;
const abcToXyzRate = Math.log(factor);

export default async (req: NextApiRequest, res: NextApiResponse<ErrorOutput | ExchangeOutput>) => {
    await runMiddleware(req, res, cors)

    const {
        query: { slug },
        method,
    } = req;

    if (method?.toUpperCase() !== 'GET') {
        return res.status(400).json({ error: 'Bad Request - Invalid Method' });
    }
    if (!Array.isArray(slug) || slug.length !== 2) {
        return res.status(400).json({ error: 'Bad Request - Invalid URL Path' });
    }
    if (!slug.every((v) => ['ABC', 'XYZ'].includes(v.toUpperCase()))) {
        return res.status(400).json({ error: 'Bad Request - Only "ABC" or "XYZ" are valid symbols' });
    }

    if (slug[0].toUpperCase() === 'ABC' && slug[1] === 'XYZ') {
        return res.status(200).json({ from: slug[0].toUpperCase(), to: slug[1].toUpperCase(), rate: abcToXyzRate });
    } else if (slug[0].toUpperCase() === 'XYZ' && slug[1] === 'ABC') {
        return res.status(200).json({ from: slug[0].toUpperCase(), to: slug[1].toUpperCase(), rate: 1.0 / abcToXyzRate });
    } else {
        return res.status(200).json({ from: slug[0].toUpperCase(), to: slug[1].toUpperCase(), rate: 1 });
    }
}
