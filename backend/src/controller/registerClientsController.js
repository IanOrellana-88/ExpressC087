import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Importamos el modelo de tu proyecto actual
import clientsModel from "../models/clients.js";
import { config } from "../../config.js";

const registerClientsController = {};

// --- 1. PASO INICIAL: SOLICITUD Y ENVÍO DE CORREO ---
registerClientsController.register = async (req, res) => {
    // Campos específicos de tu modelo Clients
    const { name, lastName, email, password, phone, address } = req.body;

    try {
        // Validar si el cliente ya existe en la BD
        const existsClient = await clientsModel.findOne({ email });
        if (existsClient) {
            return res.status(400).json({ message: "El cliente ya está registrado" });
        }

        // Encriptar contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        // Generar código de verificación aleatorio
        const randomNumber = crypto.randomBytes(3).toString("hex");

        // Guardar la información temporal en un Token (JWT)
        const token = jsonwebtoken.sign(
            {
                randomNumber,
                name,
                lastName,
                email,
                password: passwordHashed,
                phone,
                address,
                isVerified: false
            },
            config.JWT.secret,
            { expiresIn: "15m" } // El registro expira en 15 minutos
        );

        // Guardar el token en una cookie
        res.cookie("registrationCookie", token, { 
            maxAge: 15 * 60 * 1000,
            httpOnly: true 
        });

        // Configuración de Nodemailer (Transporter)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        // Opciones del correo
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de Cuenta - Registro de Cliente",
            text: `Hola ${name}, para completar tu registro utiliza este código: ${randomNumber}. Expira en 15 minutos.`,
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar email: " + error);
                return res.status(500).json({ message: "Error al enviar el correo de verificación" });
            }
            return res.status(200).json({ message: "Correo enviado con éxito" });
        });

    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// --- 2. PASO FINAL: VERIFICACIÓN DEL CÓDIGO Y GUARDADO ---
registerClientsController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.registrationCookie;

        if (!token) {
            return res.status(400).json({ message: "Sesión de registro expirada" });
        }

        // Extraer datos del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { 
            randomNumber: storedCode, 
            name, 
            lastName, 
            email, 
            password, 
            phone, 
            address 
        } = decoded;

        // Comparar códigos
        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Código de verificación incorrecto" });
        }

        // Si el código es correcto, crear el nuevo Cliente en MongoDB
        const newClient = new clientsModel({
            name,
            lastName,
            email,
            password,
            phone,
            address,
            isVerified: true,
            loginAttemps: 0
        });

        await newClient.save();

        // Limpiar la cookie de registro
        res.clearCookie("registrationCookie");

        return res.status(201).json({ message: "Cliente registrado y verificado exitosamente" });

    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error en la verificación o token inválido" });
    }
};

export default registerClientsController;