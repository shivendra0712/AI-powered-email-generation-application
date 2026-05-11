const aiService = require('../services/ai.service')

module.exports.aiReviewController = async (req, res) => {

    const { prompt, tone } = req.body;
   
    if (!prompt && !tone) {

        return res.status(400).json({ message: 'Prompt and tone are required' })
    }
    try{
       const response = await aiService(prompt,tone);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }

}

