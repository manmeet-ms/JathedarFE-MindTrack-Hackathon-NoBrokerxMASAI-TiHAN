import axios from "axios";
import {redisClient} from "../../backend/config/redis.js"
// Pool of your dangerous philosophers
const PHILOSOPHERS = [
  "ayn-rand",
  "niccolo-machiavelli",
  "marcus-aurelius",
  "seneca",
  "robert-greene",
  "osho",
  "nietzsche",  
];

// Helper: pick random philosopher
function getRandomPhilosopher() {
  const idx = Math.floor(Math.random() * PHILOSOPHERS.length);
  return PHILOSOPHERS[idx];
}

/**
 * Fetch a dangerous quote
 * - Try Redis cache first
 * - If not cached, fetch from PhilosophersAPI.com
 * - Store in Redis with TTL (12h)
 */
export async function getDangerousQuote() {
  try {
    const philosopher = getRandomPhilosopher();
    const cacheKey = `quote:${philosopher}`;

    // 1. Check cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 2. Fetch from PhilosophersAPI
    const { data } = await axios.get(
      `https://philosophersapi.com/api/philosophers/search?keyword=${philosopher}`
    );

    if (!data || data.length === 0) {
      throw new Error("No quotes returned from PhilosophersAPI");
    }

    // Pick a random quote from the fetched pool
    const randomQuote = data[Math.floor(Math.random() * data.length)];

    // Prepare payload structure
    const payload = {
      philosopher: {
        name: philosopher.replace("-", " "),
        iconUrl: `https://philosophersapi.com/images/${philosopher}-icon.png`,
        coverUrl: `https://philosophersapi.com/images/${philosopher}-cover.jpg`,
      },
      quote: {
        text: randomQuote.quote,
        source: randomQuote.source || "Unknown Work",
      },
      tone: "dangerous",
      timestamp: new Date().toISOString(),
    };

    // 3. Store in cache for 12h
    await redisClient.set(cacheKey, JSON.stringify(payload), "EX", 60 * 60 * 12);

    return payload;
  } catch (err) {
    console.error("🔥 Philosopher Quote Fetch Error:", err.message);
    return {
      philosopher: {
        name: "system",
        iconUrl: "",
        coverUrl: "",
      },
      quote: {
        text: "Discipline is remembering what you want.",
        source: "System Fallback",
      },
      tone: "neutral",
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 
 * 
 * 
ayn-rand 
Niccolo Machiavelli 
marcus-aurelius
seneca
robert-greene
osho 

Ayn Rand – unapologetically extreme about individual will, discipline, and rational selfishness. She can fuel a “no excuses” streak in your app.

Niccolò Machiavelli – dangerous in the sense of cold pragmatism and ruthless strategy. Aligns with punishment/reward, gamified shame dynamics.

Friedrich Nietzsche (missing from your list but worth noting) – philosopher of self-overcoming, dangerous ideas about will to power, eternal recurrence, embracing suffering. Perfect for your “hardcore discipline” system.

Marcus Aurelius / Seneca – Stoics, less “dangerous” but embody discipline, endurance, responsibility—the philosophical backbone for what you’re designing.

Robert Greene – modern dangerous-philosophy style, focuses on power, mastery, seduction, and the darker edges of discipline/control.

Osho

 */
