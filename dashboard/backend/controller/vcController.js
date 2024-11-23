const VcsModel = require('../models/vcSchema');

exports.fetchVc = async (req, res) => {
    try {
        const vcs = await VcsModel.find();
        if (vcs.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No vcs found!',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Vcs fetched succesfully!',
            vc: vcs
        })
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.addVc = async (req, res) => {
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

        const newVc = new VcsModel({
            name,
            icon: {
                name: icon.name,
                data: icon.data,
                contentType: icon.contentType,
            }
        });

        await newVc.save();

        res.status(200).json({
            status: 'success',
            message: "Vcs created successfully!",
            vc: {
                id: newVc._id,
                name: newVc.name,
                icon: {
                    name: newVc.icon.name,
                    data: newVc.icon.data,
                    contentType: newVc.icon.contentType,
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

exports.updateVc = async (req, res) => {
    try {
        const { id, name, icon } = req.body;

        if (!id) {
            return res.status(200).json({
                status: 'failed',
                message: "Vc ID is required!"
            });
        }

        const updatedVc = await VcsModel.findByIdAndUpdate(
            id,
            { name, icon },
            { new: true, runValidators: true }
        );

        if (!updatedVc) {
            return res.status(200).json({
                status: 'failed',
                message: "Vc not found!"
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Vc updated successfully!",
            vc: updatedVc
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!"
        });
    }
};

exports.removeVc = async (req, res) => {
    try {
        const { vcId } = req.body;

        if (!vcId) {
            return res.status(400).json({
                status: 'failed',
                message: 'Vc ID is required!',
            });
        }

        const vc = await VcsModel.findById(vcId);

        if (!vc) {
            return res.status(200).json({
                status: 'failed',
                message: 'Vc not found!'
            })
        }

        await VcsModel.findByIdAndDelete(vcId);

        return res.status(200).json({
            status: 'success',
            message: 'Vc removed succesfully!'
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}