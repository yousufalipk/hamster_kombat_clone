const VcsModel = require('../models/vcSchema');
const { CLOUD_NAME, API_KEY, API_SECRET } = require('../config/env');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

exports.fetchVcs = async (req, res) => {
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
            vcs: vcs
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
        const { name, icon, logo, fromColor, toColor, numberOfLevel, baseValues, multipliers } = req.body;

        if (
            !name || !icon || !icon.name || !icon.data || !icon.contentType || !logo || !logo.name || !logo.data || !logo.contentType ||
            !fromColor || !toColor || !numberOfLevel || !baseValues ||
            !baseValues.baseCost || !baseValues.baseCpm ||
            !multipliers || !multipliers.costMultiplier || !multipliers.cpmMultiplier
        ) {
            return res.status(200).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64DataIcon = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const IconUploadResult = await cloudinary.uploader.upload(base64DataIcon, {
            folder: 'vcsIcons'
        });

        if (!IconUploadResult || !IconUploadResult.secure_url) {
            return res.status(500).json({
                status: 'failed',
                message: "Vcs Icon upload to Cloudinary failed!",
            });
        }

        const base64DataLogo = logo.data.startsWith('data:image')
            ? logo.data.split(',')[1]
            : logo.data;


        const LogoUploadResult = await cloudinary.uploader.upload(base64DataLogo, {
            folder: 'vcsLogos'
        });

        if (!LogoUploadResult || !LogoUploadResult.secure_url) {
            return res.status(500).json({
                status: 'failed',
                message: "Vcs Logos upload to Cloudinary failed!",
            });
        }

        const levels = [];
        const { baseCost, baseCpm } = baseValues;
        const { costMultiplier, cpmMultiplier } = multipliers;

        for (let i = 0; i < numberOfLevel; i++) {
            if (i === 0) {
                levels.push({
                    level: i + 1,
                    cost: baseCost,
                    cpm: baseCpm,
                });
            } else {
                const prevLevel = levels[i - 1];
                levels.push({
                    level: i + 1,
                    cost: prevLevel.cost * costMultiplier,
                    cpm: prevLevel.cpm * cpmMultiplier,
                });
            }
        }

        const newVc = new VcsModel({
            name,
            icon: {
                name: icon.name,
                data: IconUploadResult.secure_url,
                contentType: icon.contentType,
            },
            logo: {
                name: logo.name,
                data: LogoUploadResult.secure_url,
                contentType: logo.contentType,
            },
            fromColor,
            toColor,
            levels,
            numberOfLevel: numberOfLevel,
            baseValues: {
                baseCost: baseCost,
                baseCpm: baseCpm
            },
            multipliers: {
                costMultiplier: costMultiplier,
                cpmMultiplier: cpmMultiplier
            }
        });

        await newVc.save();

        res.status(200).json({
            status: 'success',
            message: "Vc created successfully!",
            vc: {
                id: newVc._id,
                name: newVc.name,
                fromColor: newVc.fromColor,
                toColor: newVc.toColor,
                icon: {
                    name: newVc.icon.name,
                    data: newVc.icon.data,
                    contentType: newVc.icon.contentType,
                },
                logo: {
                    name: newVc.logo.name,
                    data: newVc.logo.data,
                    contentType: newVc.logo.contentType,
                },
                levels,
            },
        });
    } catch (error) {
        console.error("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!",
        });
    }
};

exports.updateVc = async (req, res) => {
    try {
        const { vcId, name, icon, logo, fromColor, toColor, numberOfLevel, baseValues, multipliers } = req.body;

        if (
            !name || !icon || !icon.name || !icon.data || !icon.contentType || !logo || !logo.name || !logo.data || !logo.contentType ||
            !fromColor || !toColor || !numberOfLevel || !baseValues ||
            !baseValues.baseCost || !baseValues.baseCpm ||
            !multipliers || !multipliers.costMultiplier || !multipliers.cpmMultiplier
        ) {
            return res.status(200).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }


        const base64DataIcon = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const IconUploadResult = await cloudinary.uploader.upload(base64DataIcon, {
            folder: 'vcsIcons'
        });

        if (!IconUploadResult || !IconUploadResult.secure_url) {
            return res.status(500).json({
                status: 'failed',
                message: "Vcs Icon upload to Cloudinary failed!",
            });
        }

        const base64DataLogo = logo.data.startsWith('data:image')
            ? logo.data.split(',')[1]
            : logo.data;


        const LogoUploadResult = await cloudinary.uploader.upload(base64DataLogo, {
            folder: 'vcsLogos'
        });

        if (!LogoUploadResult || !LogoUploadResult.secure_url) {
            return res.status(500).json({
                status: 'failed',
                message: "Vcs Logos upload to Cloudinary failed!",
            });
        }

        const vc = await VcsModel.findById(vcId);
        if (!vc) {
            return res.status(200).json({
                status: 'failed',
                message: "Vc not found!",
            });
        }

        const levels = [];
        const { baseCost, baseReward, baseCpm } = baseValues;
        const { costMultiplier, rewardMultiplier, cpmMultiplier } = multipliers;

        for (let i = 0; i < numberOfLevel; i++) {
            if (i === 0) {
                levels.push({
                    level: i + 1,
                    cost: baseCost,
                    cpm: baseCpm,
                });
            } else {
                const prevLevel = levels[i - 1];
                levels.push({
                    level: i + 1,
                    cost: prevLevel.cost * costMultiplier,
                    cpm: prevLevel.cpm * cpmMultiplier,
                });
            }
        }

        vc.name = name;
        vc.icon = {
            name: icon.name,
            data: IconUploadResult.secure_url,
            contentType: icon.contentType,
        };
        vc.logo = {
            name: logo.name,
            data: LogoUploadResult.secure_url,
            contentType: logo.contentType,
        };
        vc.fromColor = fromColor;
        vc.toColor = toColor;
        vc.levels = levels;
        vc.numberOfLevel = numberOfLevel;
        vc.baseValues = {
            baseCost: baseCost,
            baseReward: baseReward,
            baseCpm: baseCpm,
        };
        vc.multipliers = {
            costMultiplier: costMultiplier,
            rewardMultiplier: rewardMultiplier,
            cpmMultiplier: cpmMultiplier,
        };

        await vc.save();

        res.status(200).json({
            status: 'success',
            message: "Patner updated successfully!",
            vc: {
                id: vc._id,
                name: vc.name,
                fromColor: vc.fromColor,
                toColor: vc.toColor,
                icon: {
                    name: vc.icon.name,
                    data: vc.icon.data,
                    contentType: vc.icon.contentType,
                },
                logo: {
                    name: vc.logo.name,
                    data: vc.logo.data,
                    contentType: vc.logo.contentType,
                },
                levels: vc.levels,
            },
        });
    } catch (error) {
        console.error("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!",
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