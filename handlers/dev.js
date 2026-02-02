import { lunchMultipleHandler } from "./lunch-multiple.js";

// Handle dev route (for testing purposes)
export const devHandler = async function (req, res) {
    lunchMultipleHandler(req, res);
};
