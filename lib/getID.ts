/**
 * Generates a random ID by concatenating a random string and the current timestamp.
 *
 * @return {string} The generated random ID.
 */

function getID(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export default getID;
