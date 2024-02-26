import { Server, int16 } from 'azle';
import express, { NextFunction, Request, Response } from 'express';

type Persona = {
    id: number;
    nombre: string;
    apellidos: string;
    matricula: int16;
    telefono:int16;

}

let personas: Persona[] = [{
    id: 1,
    nombre: 'Gael',
    apellidos: 'Garcia Martinez',
    matricula: 2237000860,
    telefono:4651221234
}]

function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Si esta jalando ");
    next();
}

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.use(logger);

    //GET
    app.get('/lista', (req, res) => {
        res.json(personas);
    });

    //POST
    app.post("/lista/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const Sujeto = req.body;
        const libroExistente = personas.find((personas) => personas.id === id);
    
        if (libroExistente) {
            res.status(404).send("Ya lo tienes eh");
            return;
        }
        personas.push({ ...Sujeto, id });
    
        res.send("OK");
    });

    //PUT
    app.put("/lista/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        const Sujeto = personas.find((personas) => personas.id === id);

        if (!Sujeto) {
            res.status(404).send("Not found");
            return;
        }

        const actualizarlista = { ...Sujeto, ...req.body };

        personas = personas.map((b) => b.id === actualizarlista.id ? actualizarlista : b);

        res.send("ok");

    })

//DELETE
app.delete("/lista/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    personas = personas.filter((personas) => personas.id !== id);
    res.send("ok")
});

return app.listen();
});