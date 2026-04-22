import shipmentsModel from "../models/shipments.js";

const shipmentsController = {};

// CREAR ENVÍO
shipmentsController.createShipment = async (req, res) => {
    try {
        const newShipment = new shipmentsModel(req.body);
        await newShipment.save();
        return res.status(201).json({ message: "Envío programado", shipment: newShipment });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el envío" });
    }
};

// OBTENER TODOS (Con toda la información relacionada)
shipmentsController.getShipments = async (req, res) => {
    try {
        const shipments = await shipmentsModel.find()
            .populate("packageId")
            .populate("routeId")
            .populate("driverId", "name lastName")
            .populate("vehicleId", "plate model");
        return res.status(200).json(shipments);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener envíos" });
    }
};

// OBTENER POR ID
shipmentsController.getShipmentById = async (req, res) => {
    try {
        const shipment = await shipmentsModel.findById(req.params.id)
            .populate("packageId routeId driverId vehicleId");
        if (!shipment) return res.status(404).json({ message: "Envío no encontrado" });
        return res.status(200).json(shipment);
    } catch (error) {
        return res.status(500).json({ message: "Error de servidor" });
    }
};

// ACTUALIZAR (Ej: cambiar el status de "On Way" a "Delivered")
shipmentsController.updateShipment = async (req, res) => {
    try {
        const updated = await shipmentsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Envío no encontrado" });
        return res.status(200).json({ message: "Envío actualizado", shipment: updated });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar envío" });
    }
};

// ELIMINAR
shipmentsController.deleteShipment = async (req, res) => {
    try {
        const deleted = await shipmentsModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Envío no encontrado" });
        return res.status(200).json({ message: "Envío eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar" });
    }
};

export default shipmentsController;