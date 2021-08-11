var jwt = require('jsonwebtoken');
const path = require("path");
import * as fs from 'fs';



export class BaseController {

    private secret = process.env.REACT_APP_AUTH0_SECRET;

    protected verifyJWT(req, callback) : any{
        const auth = req.get("Authorization");
        const token = auth.split(' ')[1];
        console.log(token);

        
        // const publicKey = fs.readFileSync("./../../auth/dev-0zsloxk9.pem", { encoding: "utf8" });
        var cert = fs.readFileSync(path.resolve(__dirname, "../../auth/dev-0zsloxk9.pem"));

        return jwt.verify(token, cert, {
            // Never forget to make this explicit to prevent
            // signature stripping attacks.
            algorithms: ['RS256'], 
            ignoreExpiration: true
        },callback)
    }

    protected getUserId(req) : string {
        const auth = req.get("Authorization");
        const token = auth.split(' ')[1];
        var decoded = jwt.decode(token, {complete: true});

        return decoded.payload.sub;
    }

}