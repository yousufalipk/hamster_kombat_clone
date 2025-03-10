const axios = require('axios');
const { TELEGRAM_BOT_TOKEN, CLOUD_NAME, API_SECRET, API_KEY } = require('../config/env');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

exports.getProfilePhoto = async (telegramId) => {
    try {
        const photosResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUserProfilePhotos`, {
            params: { user_id: telegramId, limit: 1 },
        });

        const photos = photosResponse.data?.result?.photos;
        if (!photos || photos.length === 0) {
            return { success: false, mess: 'No profile photo found for this user' };
        }

        const fileId = photos[0][0].file_id;

        const fileResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`, {
            params: { file_id: fileId },
        });

        const filePath = fileResponse.data?.result?.file_path;
        const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;

        const imageResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });

        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'user_profile_pictures',
                    resource_type: 'image',
                    public_id: telegramId,
                    overwrite: true,
                },
                (error, result) => {
                    if (error) {
                        reject(new Error('Failed to upload image to Cloudinary: ' + error.message));
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(imageResponse.data);
        });

        return { success: true, mess: 'Photo found and uploaded', photo: uploadResponse.secure_url };

    } catch (error) {
        console.error('Error fetching or saving Telegram photo:', error.message);
        return { success: false, mess: `Error: ${error.message}` };
    }
};
