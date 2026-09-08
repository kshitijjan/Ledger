interface GiphyResponse {
    data: {
        images: {
            original: {
                url: string;
            }
        }
    }[];
}

const fetchTransactionGif = async (type: 'CREDIT' | 'DEBIT') => {
    
    const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
    const searchQuery = type === 'CREDIT' ? 'make it rain money': 'paying bills'

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchQuery)}&limit=1`;

    try{
        console.log(`[MediaService] Fetching ${type} GIF from external API...`);

        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`External API failed with status: ${response.status}`)
        }

        const data = (await response.json()) as GiphyResponse;

        return data.data[0]?.images.original.url || null;
    }
    catch(error){
        console.error(`[MediaService] Error fetching GIF:`, error);
        return null;
        
    }
}

export {
    fetchTransactionGif
}