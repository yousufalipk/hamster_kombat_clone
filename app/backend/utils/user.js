const axios = require('axios');
const { TELEGRAM_BOT_TOKEN } = require('./config/env');

exports.getProfilePhoto = async (telegramId) => {
    try {

        console.log("telegrma ID", telegramId);
        console.log("Bot token", TELEGRAM_BOT_TOKEN);

        const photosResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUserProfilePhotos`, {
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
        const fileResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`, {
            params: { file_id: fileId },
        });

        const filePath = fileResponse.data.result.file_path;
        const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;

        const imageResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const base64Data = Buffer.from(imageResponse.data, 'binary').toString('base64');

        return ({ success: true, mess: 'photo found', photo: `data:image/jpeg;base64,${base64Data}` });

    } catch (error) {
        console.error('Error fetching or saving Telegram photo:', error.message);
        return ({ success: false, mess: 'Internal Server Error' });
    }
}
