import axios from "axios";
import * as cheerio from "cheerio";

// scraper.js
const webScraper = async (url, payload) => {
  try {
    if (!url) throw new Error("URL parameter is required");

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
        "Accept-Language": "en-US,en;q=0.9",
      },
      // timeout: 10000
    });

    const cher = cheerio.load(data);
    const result = payload(cher);
    
    if (Object.values(result).every(v => !v || v === "Not specified")) {
      throw new Error("Scraping failed - selectors not matching");
    }
    
    return result;
  } catch (error) {
    throw new Error(`Scraping failed: ${error.message}`);
  }
};

export default webScraper