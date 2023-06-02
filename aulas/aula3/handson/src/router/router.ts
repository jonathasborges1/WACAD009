// modulo de rotas, arquivo router.ts

// exemplo do modulo de router
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
   res.send("Pagina inicial de rotas");
})

router.get("/sobre", (req, res) => {
   res.send("Pagina sobre");
})

export default router;