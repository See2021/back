"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', corsOptions.origin);
        res.header('Access-Control-Allow-Methods', corsOptions.methods);
        res.header('Access-Control-Allow-Credentials', String(corsOptions.credentials));
        res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders);
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
    app.useStaticAssets(path.resolve('./public'), { prefix: '/public' });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map