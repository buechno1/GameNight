import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { db } from '#lib/server/db.js';

const scryptAsync = promisify(scrypt);
const SESSION_DAYS = 7;

/** Passwort mit Salt hashen (ohne zusätzliche Pakete, nur Node-Crypto). */
export async function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = await scryptAsync(password, salt, 64);
	return `${salt}:${hash.toString('hex')}`;
}

/** Eingegebenes Passwort mit gespeichertem Hash vergleichen. */
export async function verifyPassword(password, stored) {
	const [salt, key] = String(stored).split(':');
	if (!salt || !key) return false;
	const hash = await scryptAsync(password, salt, 64);
	const keyBuffer = Buffer.from(key, 'hex');
	return keyBuffer.length === hash.length && timingSafeEqual(keyBuffer, hash);
}

/** Session in MongoDB speichern und Cookie setzen. */
export async function createSession(cookies, userId) {
	const token = randomBytes(32).toString('hex');
	const maxAge = SESSION_DAYS * 24 * 60 * 60;
	await db.collection('sessions').insertOne({
		token,
		userId,
		expiresAt: new Date(Date.now() + maxAge * 1000)
	});
	cookies.set('session', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge
	});
}

/** Nur interne Weiterleitungen erlauben (gegen Open-Redirect). */
export function safeNext(next) {
	return next && next.startsWith('/') && !next.startsWith('//') ? next : '/';
}
