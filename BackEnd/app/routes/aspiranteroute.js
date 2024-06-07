import express from "express"
import { createAspirante, deleteAspirante, getAllAspirantes, getAspirante, updateAspirante } from "../controllers/aspiranteController.js";
import { authorize } from "../middleware/authMiddleware.js";

const aspiranteRoutes = express.Router();



aspiranteRoutes.post('/aspirantes', createAspirante);
aspiranteRoutes.get('/aspirantes',getAllAspirantes);
aspiranteRoutes.get('/aspirantes/:id',authorize(["Administrador","Usuario"]),getAspirante);
aspiranteRoutes.put('/aspirantes/:id', authorize(["Administrador"]),updateAspirante);
aspiranteRoutes.delete('/aspirantes/:id', authorize(["Administrador"]),deleteAspirante);

export default aspiranteRoutes