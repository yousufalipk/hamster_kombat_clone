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

        const newKol = new KolsModel({
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

        await newKol.save();

        res.status(200).json({
            status: 'success',
            message: "Kol created successfully!",
            kol: {
                id: newKol._id,
                name: newKol.name,
                fromColor: newKol.fromColor,
                toColor: newKol.toColor,
                icon: {
                    name: newKol.icon.name,
                    data: newKol.icon.data,
                    contentType: newKol.icon.contentType,
                },
                logo: {
                    name: newKol.logo.name,
                    data: newKol.logo.data,
                    contentType: newKol.logo.contentType,
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

exports.updateKols = async (req, res) => {
    try {
        const { kolId, name, icon, logo, fromColor, toColor, numberOfLevel, baseValues, multipliers } = req.body;

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

        const kol = await KolsModel.findById(kolId);
        if (!kol) {
            return res.status(200).json({
                status: 'failed',
                message: "Kol not found!",
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

        kol.name = name;
        kol.icon = {
            name: icon.name,
            data: icon.data,
            contentType: icon.contentType,
        };
        kol.logo = {
            name: logo.name,
            data: logo.data,
            contentType: logo.contentType,
        };
        kol.fromColor = fromColor;
        kol.toColor = toColor;
        kol.levels = levels;
        kol.numberOfLevel = numberOfLevel;
        kol.baseValues = {
            baseCost: baseCost,
            baseReward: baseReward,
            baseCpm: baseCpm,
        };
        kol.multipliers = {
            costMultiplier: costMultiplier,
            rewardMultiplier: rewardMultiplier,
            cpmMultiplier: cpmMultiplier,
        };

        await kol.save();

        res.status(200).json({
            status: 'success',
            message: "Kol updated successfully!",
            kol: {
                id: kol._id,
                name: kol.name,
                fromColor: kol.fromColor,
                toColor: kol.toColor,
                icon: {
                    name: kol.icon.name,
                    data: kol.icon.data,
                    contentType: kol.icon.contentType,
                },
                logo: {
                    name: kol.logo.name,
                    data: kol.logo.data,
                    contentType: kol.logo.contentType,
                },
                levels: kol.levels,
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