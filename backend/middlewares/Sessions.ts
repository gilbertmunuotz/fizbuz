import session from 'express-session';
import sessionStore from '../utilities/sessionStore';
import dotenv from 'dotenv';

dotenv.config();

export function expressSessions() {
    return session({
        secret: process.env.SESSION_SECRET as string, // Ensure SESSION_SECRET is treated as a string
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 60 * 1000, // Set cookie expiration to 30 minutes
            httpOnly: true,
        }
    });
}

async function syncSessionStore() {
    try {
        sessionStore.sync();
        console.log('Session store synced successfully.');
    } catch (err) {
        console.error('Failed to sync session store:', err);
    }
}

// Call the function to sync the session store
syncSessionStore();