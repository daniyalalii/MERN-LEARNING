const app = require('./app');
const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log('=================================');
    console.log('🚀 Mini Product API Server');
    console.log('=================================');
    console.log(`📍 Running on: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${'development'}`);
    console.log('=================================');
    console.log('Available endpoints:');
    console.log(`  GET    http://localhost:${PORT}/health`);
    console.log(`  GET    http://localhost:${PORT}/products`);
    console.log(`  GET    http://localhost:${PORT}/products/:id`);
    console.log(`  POST   http://localhost:${PORT}/products`);
    console.log(`  DELETE http://localhost:${PORT}/products/:id`);
    console.log('=================================');
});

process.on('unhandledRejection', (err)=>{
    console.error('Unhandled Rejection! Shutting down...');
    console.error(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
});

process.on('uncaughtException',(err)=>{
    console.error("Uncaught exception! Shutting down...");
    console.error(err.name,err.message);
    process.exit(1);
});