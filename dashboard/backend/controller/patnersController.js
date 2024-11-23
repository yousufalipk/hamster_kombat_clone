const PatnersModel = require('../models/patnersSchema');

exports.fetchPatners = async (req, res) => {
    try {
        const patners = await PatnersModel.find();
        if (patners.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No Patners found!',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Patners fetched succesfully!',
            patners: patners
        })
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.addPatner = async (req, res) => {
    try {
        const { name, icon } = req.body;

        if (!name || !icon || !icon.name || !icon.data || !icon.contentType) {
            return res.status(400).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64Data = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const buffer = Buffer.from(base64Data, 'base64');

        const maxSize = 1 * 1024 * 1024;
        if (buffer.length > maxSize) {
            return res.status(200).json({
                status: 'failed',
                message: "Image size exceeds the maximum allowed size (1MB).",
            });
        }

        const newPatner = new PatnersModel({
            name,
            icon: {
                name: icon.name,
                data: icon.data,
                contentType: icon.contentType,
            }
        });

        await newPatner.save();

        res.status(200).json({
            status: 'success',
            message: "Patner created successfully!",
            patner: {
                id: newPatner._id,
                name: newPatner.name,
                icon: {
                    name: newPatner.icon.name,
                    data: newPatner.icon.data,
                    contentType: newPatner.icon.contentType,
                },
            },
        });
    } catch (error) {
        console.error("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!",
        });
    }
}

exports.updatePatner = async (req, res) => {
    try {
        const { id, name, icon } = req.body;

        if (!id) {
            return res.status(200).json({
                status: 'failed',
                message: "Project ID is required!"
            });
        }

        const updatedPatner = await PatnersModel.findByIdAndUpdate(
            id,
            { name, icon },
            { new: true, runValidators: true }
        );

        if (!updatedPatner) {
            return res.status(200).json({
                status: 'failed',
                message: "Patner not found!"
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Patner updated successfully!",
            patner: updatedPatner
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!"
        });
    }
};

exports.removePatner = async (req, res) => {
    try {
        const { patnerId } = req.body;

        if (!patnerId) {
            return res.status(400).json({
                status: 'failed',
                message: 'Patner ID is required!',
            });
        }

        const patner = await PatnersModel.findById(patnerId);

        if (!patner) {
            return res.status(200).json({
                status: 'failed',
                message: 'Patner not found!'
            })
        }

        await PatnersModel.findByIdAndDelete(patnerId);

        return res.status(200).json({
            status: 'success',
            message: 'Patner removed succesfully!'
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}