import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis";
import dotenv  from "dotenv";

dotenv.config();
//create a rate limiter that allows 10 req per 20 sec
const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(65,"100 s"),
});

export default ratelimit;