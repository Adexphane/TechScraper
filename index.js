import express from "express";
import cors from "cors";
import webScraper from "./scraper.js";
import laptopDetails from "./payload/dell/laptops.js";
import monitorDetails from "./payload/dell/monitors.js";
import levenoLaptopDetails from "./payload/leveno/laptops.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/dell/product/laptops", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }
  try {
    const data = await webScraper(url, laptopDetails);

    res.json(data);
  } catch (error) {
    res.json(`Error Alert`, error);
  }
});

app.get("/dell/product/monitors", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const data = await webScraper(url, monitorDetails);

    res.json(data);
  } catch (error) {
    res.json(`Error Alert`, error);
  }
});

app.get("/lenovo/product/laptops", async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }
  
    try {
      const data = await webScraper(url, levenoLaptopDetails);
  
      res.json(data);
    } catch (error) {
        res.status(500).json({ // Proper error response
            error: "Scraping failed",
            details: error.message 
          });
    }
  });

  export default app