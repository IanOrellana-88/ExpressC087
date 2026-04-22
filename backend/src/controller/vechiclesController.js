import vehiclesModel from "../models/vehicles.js";

const vehiclesController = {};

// REGISTRAR VEHÍCULO
vehiclesController.createVehicle = async (req, res) => {
    try {
        const newVehicle = new vehiclesModel(req.body);
        await newVehicle.save();
        return res.status(201).json({ message: "Vehículo registrado", vehicle: newVehicle });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error al registrar vehículo" });
    }
};

// OBTENER TODOS (Con info del conductor)
vehiclesController.getVehicles = async (req, res) => {
    try {
        const vehicles = await vehiclesModel.find().populate("driverId", "name lastName licenseNumber");
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener vehículos" });
    }
};

// OBTENER POR ID
vehiclesController.getVehicleById = async (req, res) => {
    try {
        const vehicle = await vehiclesModel.findById(req.params.id).populate("driverId");
        if (!vehicle) return res.status(404).json({ message: "Vehículo no encontrado" });
        return res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ACTUALIZAR
vehiclesController.updateVehicle = async (req, res) => {
    try {
        const updated = await vehiclesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Vehículo no encontrado" });
        return res.status(200).json({ message: "Vehículo actualizado", vehicle: updated });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar" });
    }
};

// ELIMINAR
vehiclesController.deleteVehicle = async (req, res) => {
    try {
        const deleted = await vehiclesModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Vehículo no encontrado" });
        return res.status(200).json({ message: "Vehículo eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar" });
    }
};

export default vehiclesController;