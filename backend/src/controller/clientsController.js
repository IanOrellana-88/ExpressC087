import clientsModel from "../models/clients.js";

const clientsController = {};

clientsController.getClient = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        return res.status(200).json(clients);
    }catch (error) {
        console.log("error" + error);
        return res.status(500).json ({message : "Internal server error"});
    }
};


//UPDATE
clientsController.updateClient = async (req, res) => {
    try {
        let {
            name,
            lastName,
            email,
            password,
            phone,
            address,
            isVerified,
            loginAttemps,
            timeOut,
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({message: "Fields required"});
        }

        const clientUpdated = await clientsModel.findByIdAndUpdate (
            req.params.id,
            {
                name,
                lastName,
                email,
                password,
                phone,
                address,
                isVerified,
                loginAttemps,
                timeOut,
            },
            {new: true},
        );
        if (!clientUpdated) {
            return res.status(404).json({message: "Client Not Found"});
        }
        return res.status("200").json({message: "Client Updated"});
    }catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Iternal server error"});
    }
};


//ELIMINAR
clientsController.deleteClient = async  (req, res) => {
    try {
        const deleteClient = clientsModel.findByIdAndDelete(req.params.id);

        if (!deleteClient) {
            return res.status(404).json({message: "Client not found"});
        }
        return res.status(200).jsn({message: "Client dleted"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default clientsController;