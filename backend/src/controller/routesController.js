import routesModel from "../models/routes.js";

const routesController = {};

// CREAR RUTA
routesController.createRoute = async (req, res) => {
    try {
        const newRoute = new routesModel(req.body);
        await newRoute.save();
        return res.status(201).json({ message: "Ruta creada con éxito", route: newRoute });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error al crear la ruta" });
    }
};

// OBTENER TODAS
routesController.getRoutes = async (req, res) => {
    try {
        const routes = await routesModel.find();
        return res.status(200).json(routes);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las rutas" });
    }
};

// OBTENER POR ID
routesController.getRouteById = async (req, res) => {
    try {
        const routeFound = await routesModel.findById(req.params.id);
        if (!routeFound) return res.status(404).json({ message: "Ruta no encontrada" });
        return res.status(200).json(routeFound);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ACTUALIZAR
routesController.updateRoute = async (req, res) => {
    try {
        const updated = await routesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Ruta no encontrada" });
        return res.status(200).json({ message: "Ruta actualizada", route: updated });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la ruta" });
    }
};

// ELIMINAR
routesController.deleteRoute = async (req, res) => {
    try {
        const deleted = await routesModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Ruta no encontrada" });
        return res.status(200).json({ message: "Ruta eliminada" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la ruta" });
    }
};

export default routesController;