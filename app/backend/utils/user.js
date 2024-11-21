const { TELEGRAM_BOT_TOKEN } = require('../config/env');
const axios = require('axios');

exports.getProfilePhoto = async (telegramId) => {
    try {
        const profilePhotosResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUserProfilePhotos`, {
            params: {
                user_id: telegramId,
                limit: 1
            }
        });

        const photos = profilePhotosResponse.data.result.photos;

        if (photos.length > 0) {
            const fileId = photos[0][0].file_id;

            const fileResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`, {
                params: { file_id: fileId }
            });

            const filePath = fileResponse.data.result.file_path;

            const profilePhotoUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;

            const imageResponse = await axios.get(profilePhotoUrl, {
                responseType: 'arraybuffer'
            });

            const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');

            const contentType = imageResponse.headers['content-type'];

            return ({ success: false, mess: 'Photo Found!', photo: `data:${contentType};base64,${imageBase64}` });
        } else {
            return ({ success: false, mess: 'No Photo Found!' });
        }
    } catch (error) {
        console.error("Internal Server Error!", error);
        return ({ success: false, mess: 'Internal Server Error!' });
    }
};