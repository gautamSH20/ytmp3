import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

interface ConvertRequestBody {
  id?: string;
}

interface fetchResponse {
  status: string;
  title?: string;
  link?: string;
  msg?: string;
}

const PORT = process.env.PORT || 3001;

app.post(
  "/api/v1/download",
  async (req: express.Request<ConvertRequestBody>, res): Promise<any> => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const response = await axios.get(
        `https://youtube-mp36.p.rapidapi.com/dl?id=${encodeURIComponent(id)}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.API_KEY!, // Correct header name
            "X-RapidAPI-Host": process.env.API_HOST!, // Correct header name
          },
        }
      );

      // Handle API response properly
      if (response.data.status === "ok") {
        return res.json({
          message: "Success!",
          data: response.data,
        });
      }

      // Forward the API's error message
      return res.status(400).json(response.data);
    } catch (e: any) {
      const statusCode = e.response?.status || 500;
      const errorMessage = e.response?.data?.message || "An error occurred";
      return res.status(statusCode).json({ message: errorMessage });
    }
  }
);

app.listen(PORT, () => {
  console.log(`working at port ${PORT}`);
});
