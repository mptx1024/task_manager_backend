const allowedOrigins = ['http://localhost:3000', 'http://24.55.11.237', 'https://technotes-frontend-lymk.onrender.com'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log(origin);
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

module.exports = corsOptions;
