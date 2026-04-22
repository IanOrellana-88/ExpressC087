import packagesModel from "../models/packages.js";

const packagesController = {};

// CREAR PAQUETE
packagesController.createPackage = async (req, res) => {
    try {
        const newPackage = new packagesModel(req.body);
        await newPackage.save();
        return res.status(201).json({ message: "Paquete creado con éxito", package: newPackage });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error al crear el paquete" });
    }
};

// OBTENER TODOS LOS PAQUETES
packagesController.getPackages = async (req, res) => {
    try {
        const packages = await packagesModel.find().populate("senderId receiverId", "name lastName");
        return res.status(200).json(packages);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener paquetes" });
    }
};

// OBTENER POR ID
packagesController.getPackageById = async (req, res) => {
    try {
        const packageFound = await packagesModel.findById(req.params.id);
        if (!packageFound) return res.status(404).json({ message: "Paquete no encontrado" });
        return res.status(200).json(packageFound);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ACTUALIZAR PAQUETE
packagesController.updatePackage = async (req, res) => {
    try {
        const updated = await packagesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Paquete no encontrado" });
        return res.status(200).json({ message: "Paquete actualizado", package: updated });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar" });
    }
};

// ELIMINAR PAQUETE
packagesController.deletePackage = async (req, res) => {
    try {
        const deleted = await packagesModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Paquete no encontrado" });
        return res.status(200).json({ message: "Paquete eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar" });
    }
};

export default packagesController;