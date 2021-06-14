import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const db = new Map();

app.get('/', (req, res) => {
    res.status(200).json(
        Array.from(db.entries()).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: value,
            };
        }, {})
    );
});

app.get('/:id', (req, res) => {
    if (db.has(req.params.id)) {
        res.status(200).json(db.get(req.params.id));
    } else {
        res.status(404).json({});
    }
});

app.put('/:id', (req, res) => {
    db.set(req.params.id, req.body);

    res.status(200).json(req.body);
});

app.delete('/:id', (req, res) => {
    res.status(db.delete(req.params.id) ? 200 : 404).json({});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
