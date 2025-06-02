import urlSchema from '../models/schema.js';



const getAllUrls = async (req, res) => {
    try {
        const urls = await urlSchema.find().sort({ createdAt: -1 }).exec();
        if (!urls || urls.length === 0) {
            return res.status(404).json({ message: 'No URLs found' });
        }

        res.status(200).json(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
}
export default getAllUrls;