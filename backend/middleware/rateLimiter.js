import ratelimit from '../src/config/upstash.js'

const rateLimiter = async (req,res ,next) => {
    try{

        const {success} = await ratelimit.limit("my-limit-key")//need to impliment user id or smth for each user
        
        if(!success){
            return res.status(429).json({
                message : "Too many requests. Try again Later."
            })
        }
        next();
    }
    catch(err){
        console.log("Rate Limit Error",err)
        next(err);
        

    }

}

export default rateLimiter