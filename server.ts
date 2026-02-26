import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.resolve("data.json");

// Default data structure
const defaultData = {
  packages: [
    {
      id: "pkg_1",
      title: "৪ সিট (ইকোনমি)",
      price: "৪,৬০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "বাজেট ফ্রেন্ডলি"],
      highlight: false
    },
    {
      id: "pkg_2",
      title: "৪ সিট (স্পেশাল)",
      price: "৫,১০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "উন্নত ভেন্টিলেশন"],
      highlight: false
    },
    {
      id: "pkg_3",
      title: "৩ সিট (ইকোনমি)",
      price: "৫,৬০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "পর্যাপ্ত আলো বাতাস"],
      highlight: false
    },
    {
      id: "pkg_4",
      title: "৩ সিট (স্পেশাল)",
      price: "৬,১০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "সেমি-প্রাইভেট"],
      highlight: false
    },
    {
      id: "pkg_5",
      title: "২ সিট (ইকোনমি)",
      price: "৬,৬০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "শান্তিপূর্ণ পরিবেশ"],
      highlight: true
    },
    {
      id: "pkg_6",
      title: "২ সিট (স্পেশাল)",
      price: "৭,১০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "প্রিমিয়াম ফিনিশিং"],
      highlight: false
    },
    {
      id: "pkg_7",
      title: "সিঙ্গেল রুম (VIP)",
      price: "৮,১০০",
      period: "/মাস",
      features: ["৩ বেলা স্বাস্থ্যকর খাবার", "ফ্রি হাই-স্পিড ওয়াইফাই", "২৪/৭ নিরাপত্তা ও সিসিটিভি", "ফিল্টার পানির সুব্যবস্থা", "জেনারেটর সুবিধা", "টাইলসকৃত পরিষ্কার রুম", "সম্পূর্ণ ব্যক্তিগত প্রাইভেসি"],
      highlight: false
    },
    {
      id: "pkg_8",
      title: "ডেইলি গেস্ট",
      price: "৩০০",
      period: "/দিন",
      features: [
        "৩ বেলা খাবার আলোচনা সাপেক্ষে",
        "স্বল্পমেয়াদী থাকার ব্যবস্থা",
        "নিরাপদ পরিবেশ",
        "ওয়াইফাই ও অন্যান্য সুবিধা",
      ],
      highlight: false,
      isDaily: true
    }
  ],
  gallery: [
    { id: "img_1", url: "https://drive.google.com/thumbnail?id=1jZSPOIiB6-WnpndR3JuBKjERKTx0ebZl&sz=w1000" },
    { id: "img_2", url: "https://drive.google.com/thumbnail?id=1O0FcLtv-60SzrhmArzO4kHCCeEQ6BXPD&sz=w1000" },
    { id: "img_3", url: "https://drive.google.com/thumbnail?id=1-olRuQ_mOShxydZpuRX9BsqJdG6oVsKJ&sz=w1000" },
    { id: "img_4", url: "https://drive.google.com/thumbnail?id=1GUAadgvzSmZFIpdtgqbzOSWbbiXc6s1A&sz=w1000" },
    { id: "img_5", url: "https://drive.google.com/thumbnail?id=1pOvrS80BbcbQ0JKM7qXW0jq773k_b5pS&sz=w1000" },
    { id: "img_6", url: "https://drive.google.com/thumbnail?id=1UMiXfx6Xvs5f-dMf9dzoH1ei361fhhwJ&sz=w1000" },
    { id: "img_7", url: "https://drive.google.com/thumbnail?id=1ewvgHNxs88qmJBPP7FrfqOR-LvoBzRsg&sz=w1000" },
    { id: "img_8", url: "https://drive.google.com/thumbnail?id=1wI8wUBFqJr8wjpoHAuHulyQJGmi0xkVE&sz=w1000" },
    { id: "img_9", url: "https://drive.google.com/thumbnail?id=1avvk7_icSkIPKTFBr6S0RXsP21tPq71P&sz=w1000" },
    { id: "img_10", url: "https://drive.google.com/thumbnail?id=1lxq78JAmcwFSNei9Lq8YKvhWAhdxCr91&sz=w1000" },
    { id: "img_11", url: "https://drive.google.com/thumbnail?id=1mQCkhDFA_ZIobuCb-a6FENOIlui7YDlx&sz=w1000" },
    { id: "img_12", url: "https://drive.google.com/thumbnail?id=1OaLYB_-01C4Da_8XydaW7dwJlY6_nhum&sz=w1000" },
    { id: "img_13", url: "https://drive.google.com/thumbnail?id=1jmRCb0TB_7gmTaNburdF3q3aeQTfL52m&sz=w1000" },
    { id: "img_14", url: "https://drive.google.com/thumbnail?id=1HEf3-d0_DE2y2mMTSloMLt9ajRIbyFVq&sz=w1000" },
    { id: "img_15", url: "https://drive.google.com/thumbnail?id=1uohqpwKO0ElUG_mjIsUzOfISbPdmoEr3&sz=w1000" },
    { id: "img_16", url: "https://drive.google.com/thumbnail?id=1rorPU9puHxx9sNaJ8yA0DGP4ClXs7il2&sz=w1000" },
    { id: "img_17", url: "https://drive.google.com/thumbnail?id=1VRfdW25HG_7t-NEZjTxx9okaj0eA6Bjb&sz=w1000" },
    { id: "img_18", url: "https://drive.google.com/thumbnail?id=1dMb6c2opjRMZnf28tUwRrzlGPks1BRVo&sz=w1000" },
    { id: "img_19", url: "https://drive.google.com/thumbnail?id=1kYBcJt2m0DtXcYP0gX2NzoEIlZyItJw2&sz=w1000" }
  ]
};

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "nibedikahostel4@gmail.com" && password === "nibedikahosteldhaka123") {
      res.json({ success: true, token: "admin-token-123" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/packages", async (_req, res) => {
    const data = await readData();
    res.json(data.packages);
  });

  app.put("/api/packages/:id", async (req, res) => {
    const data = await readData();
    const index = data.packages.findIndex((p: any) => p.id === req.params.id);
    if (index !== -1) {
      data.packages[index] = { ...data.packages[index], ...req.body };
      await writeData(data);
      res.json(data.packages[index]);
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  });

  app.get("/api/gallery", async (_req, res) => {
    const data = await readData();
    res.json(data.gallery);
  });

  app.post("/api/gallery", async (req, res) => {
    const data = await readData();
    const newImage = {
      id: "img_" + Date.now(),
      url: req.body.url
    };
    data.gallery.push(newImage);
    await writeData(data);
    res.json(newImage);
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    const data = await readData();
    data.gallery = data.gallery.filter((img: any) => img.id !== req.params.id);
    await writeData(data);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
