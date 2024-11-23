const KolsModel = require('../models/kolsSchema');

exports.fetchKols = async (req, res) => {
    try {
        const kols = await KolsModel.find();
        if (kols.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No Kols found!',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Kols fetched succesfully!',
            kols: kols
        })
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.addKols = async (req, res) => {
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

        const newKols = new KolsModel({
            name,
            icon: {
                name: icon.name,
                data: icon.data,
                contentType: icon.contentType,
            }
        });

        await newKols.save();

        res.status(200).json({
            status: 'success',
            message: "Kols created successfully!",
            kols: {
                id: newKols._id,
                name: newKols.name,
                icon: {
                    name: newKols.icon.name,
                    data: newKols.icon.data,
                    contentType: newKols.icon.contentType,
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

exports.updateKols = async (req, res) => {
    try {
        const { id, name, icon } = req.body;

        if (!id) {
            return res.status(200).json({
                status: 'failed',
                message: "Kols ID is required!"
            });
        }

        const updatedKol = await KolsModel.findByIdAndUpdate(
            id,
            { name, icon },
            { new: true, runValidators: true }
        );

        if (!updatedKol) {
            return res.status(200).json({
                status: 'failed',
                message: "Kol not found!"
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Kol updated successfully!",
            kol: updatedKol
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!"
        });
    }
};

exports.removeKols = async (req, res) => {
    try {
        const { kolId } = req.body;

        if (!kolId) {
            return res.status(400).json({
                status: 'failed',
                message: 'Kols ID is required!',
            });
        }

        const kol = await KolsModel.findById(kolId);

        if (!kol) {
            return res.status(200).json({
                status: 'failed',
                message: 'Kol not found!'
            })
        }

        await KolsModel.findByIdAndDelete(kol);

        return res.status(200).json({
            status: 'success',
            message: 'Kols removed succesfully!'
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}