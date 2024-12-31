const PatnerModel = require('../models/patnersSchema');

exports.fetchPatners = async (req, res) => {
    try {
        const patners = await PatnerModel.find();
        if (patners.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No Patner found!',
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
        const { name, icon, logo, fromColor, toColor, numberOfLevel, baseValues, multipliers } = req.body;

        if (
            !name || !icon || !icon.name || !icon.data || !icon.contentType || !logo || !logo.name || !logo.data || !logo.contentType ||
            !fromColor || !toColor || !numberOfLevel || !baseValues ||
            !baseValues.baseCost || !baseValues.baseCpm ||
            !multipliers || !multipliers.costMultiplier || !multipliers.cpmMultiplier
        ) {
            return res.status(400).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64DataIcon = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const base64DataLogo = logo.data.startsWith('data:image')
            ? logo.data.split(',')[1]
            : logo.data;

        const bufferIcon = Buffer.from(base64DataIcon, 'base64');
        const bufferLogo = Buffer.from(base64DataLogo, 'base64');

        const maxSize = 1 * 1024 * 1024;
        if (bufferIcon.length > maxSize || bufferLogo.length > maxSize) {
            return res.status(200).json({
                status: 'failed',
                message: "Image size exceeds the maximum allowed size (1MB).",
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

        const newPatner = new PatnerModel({
            name,
            icon: {
                name: icon.name,
                data: icon.data,
                contentType: icon.contentType,
            },
            logo: {
                name: logo.name,
                data: logo.data,
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

        await newPatner.save();

        res.status(200).json({
            status: 'success',
            message: "Pathners created successfully!",
            patner: {
                id: newPatner._id,
                name: newPatner.name,
                fromColor: newPatner.fromColor,
                toColor: newPatner.toColor,
                icon: {
                    name: newPatner.icon.name,
                    data: newPatner.icon.data,
                    contentType: newPatner.icon.contentType,
                },
                logo: {
                    name: newPatner.logo.name,
                    data: newPatner.logo.data,
                    contentType: newPatner.logo.contentType,
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

exports.updatePatner = async (req, res) => {
    try {
        const { patnerId, name, icon, logo, fromColor, toColor, numberOfLevel, baseValues, multipliers } = req.body;

        if (
            !name || !icon || !icon.name || !icon.data || !icon.contentType || !logo || !logo.name || !logo.data || !logo.contentType ||
            !fromColor || !toColor || !numberOfLevel || !baseValues ||
            !baseValues.baseCost || !baseValues.baseCpm ||
            !multipliers || !multipliers.costMultiplier || !multipliers.cpmMultiplier
        ) {
            return res.status(400).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64DataIcon = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const base64DataLogo = logo.data.startsWith('data:image')
            ? logo.data.split(',')[1]
            : logo.data;

        const bufferIcon = Buffer.from(base64DataIcon, 'base64');
        const bufferLogo = Buffer.from(base64DataLogo, 'base64');

        const maxSize = 1 * 1024 * 1024;
        if (bufferIcon.length > maxSize || bufferLogo.length > maxSize) {
            return res.status(200).json({
                status: 'failed',
                message: "Image size exceeds the maximum allowed size (1MB).",
            });
        }

        const patner = await PatnerModel.findById(patnerId);
        if (!patner) {
            return res.status(200).json({
                status: 'failed',
                message: "Patner not found!",
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

        patner.name = name;
        patner.icon = {
            name: icon.name,
            data: icon.data,
            contentType: icon.contentType,
        };
        patner.logo = {
            name: logo.name,
            data: logo.data,
            contentType: logo.contentType,
        };
        patner.fromColor = fromColor;
        patner.toColor = toColor;
        patner.levels = levels;
        patner.numberOfLevel = numberOfLevel;
        patner.baseValues = {
            baseCost: baseCost,
            baseReward: baseReward,
            baseCpm: baseCpm,
        };
        patner.multipliers = {
            costMultiplier: costMultiplier,
            rewardMultiplier: rewardMultiplier,
            cpmMultiplier: cpmMultiplier,
        };

        await patner.save();

        res.status(200).json({
            status: 'success',
            message: "Patner updated successfully!",
            patner: {
                id: patner._id,
                name: patner.name,
                fromColor: patner.fromColor,
                toColor: patner.toColor,
                icon: {
                    name: patner.icon.name,
                    data: patner.icon.data,
                    contentType: patner.icon.contentType,
                },
                logo: {
                    name: patner.logo.name,
                    data: patner.logo.data,
                    contentType: patner.logo.contentType,
                },
                levels: patner.levels,
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

exports.removePatner = async (req, res) => {
    try {
        const { patnerId } = req.body;

        if (!patnerId) {
            return res.status(400).json({
                status: 'failed',
                message: 'Patner ID is required!',
            });
        }

        const patner = await PatnerModel.findById(patnerId);

        if (!patner) {
            return res.status(200).json({
                status: 'failed',
                message: 'Patner not found!'
            })
        }

        await PatnerModel.findByIdAndDelete(patner);

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