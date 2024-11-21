const axios = require('axios');
const { TelegramBotToken } = require('../config/env');

exports.getProfilePhoto = async (telegramId) => {
    try {
        const photosResponse = await axios.get(`https://api.telegram.org/bot${TelegramBotToken}/getUserProfilePhotos`, {
            params: {
                user_id: telegramId,
                limit: 1,
            },
        });

        const photos = photosResponse.data.result.photos;
        if (!photos || photos.length === 0) {
            return ({ success: false, mess: 'No profile photo found for this user' });
        }

        const fileId = photos[0][0].file_id;
        const fileResponse = await axios.get(`https://api.telegram.org/bot${TelegramBotToken}/getFile`, {
            params: { file_id: fileId },
        });

        const filePath = fileResponse.data.result.file_path;
        const fileUrl = `https://api.telegram.org/file/bot${TelegramBotToken}/${filePath}`;

        const imageResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const base64Data = Buffer.from(imageResponse.data, 'binary').toString('base64');

        return ({ success: true, mess: 'photo found', photo: `data:image/jpeg;base64,${base64Data}` });

    } catch (error) {
        console.error('Error fetching or saving Telegram photo:', error.message);
        return ({ success: false, mess: 'Internal Server Error' });
    }
}
