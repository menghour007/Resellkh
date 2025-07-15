import CryptoJS from 'crypto-js';

const SECRET_KEY = "c2VhbmdseWNob3UxMmU0ZA==";

export function encryptId(id) {
  try {
    if (!id && id !== 0) throw new Error("Empty ID provided");
    
    const stringId = id.toString().trim();
    if (!stringId) throw new Error("Empty string ID");
    
    // Encrypt with explicit parameters
    const encrypted = CryptoJS.AES.encrypt(stringId, SECRET_KEY, {
      format: CryptoJS.format.OpenSSL
    }).toString();
    
    // Make URL-safe by replacing problematic characters
    return encrypted
      .replace(/\//g, '_')  // Replace / with _
      .replace(/\+/g, '-')  // Replace + with -
      .replace(/=/g, '');   // Remove padding =
  } catch (error) {
    console.error("Encryption failed:", error);
    throw error;
  }
}

export function decryptId(cipherText) {
  try {
    if (!cipherText) throw new Error("Empty cipher text");
    
    // Reverse URL-safe replacements
    let sanitized = cipherText
      .replace(/_/g, '/')
      .replace(/-/g, '+');
    
    // Add padding if needed (for Base64)
    const padLength = 4 - (sanitized.length % 4);
    if (padLength < 4) {
      sanitized += '='.repeat(padLength);
    }
    
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(sanitized, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decrypted) {
      throw new Error("Empty decryption result");
    }
    
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}