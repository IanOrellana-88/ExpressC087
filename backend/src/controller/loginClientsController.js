import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientsModel from "../models/clients.js";
import { config } from "../../config.js";

const loginClientsController = {};

loginClientsController.login = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo inválido" });
    }

    try {
        const clientFound = await clientsModel.findOne({ email });

        if (!clientFound) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (clientFound.timeOut && clientFound.timeOut > Date.now()) {
            return res.status(403).json({ message: "Cuenta bloqueada temporalmente" });
        }

        const isMatch = await bcrypt.compare(password, clientFound.password);

        if (!isMatch) {
            clientFound.loginAttemps = (clientFound.loginAttemps || 0) + 1;

            // Lógica de bloqueo (5 intentos = 5 minutos de bloqueo)
            if (clientFound.loginAttemps >= 5) {
                clientFound.timeOut = Date.now() + 5 * 60 * 1000;
                clientFound.loginAttemps = 0; // Reiniciamos contador al bloquear

                await clientFound.save();

                return res.status(403).json({ 
                    message: "Cuenta bloqueada por múltiples intentos fallidos. Intenta en 5 minutos." 
                });
            }

            await clientFound.save();
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        clientFound.loginAttemps = 0;
        clientFound.timeOut = null;
        await clientFound.save();

        const token = jsonwebtoken.sign(
            { 
                id: clientFound._id, 
                userType: "Client" 
            },
            config.JWT.secret,
            { expiresIn: "30d" }
        );

        res.cookie("authCookie", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ 
            message: "Login exitoso",
            client: {
                name: clientFound.name,
                email: clientFound.email
            }
        });

    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default loginClientsController;