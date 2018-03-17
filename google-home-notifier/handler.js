"use strict";

const googlehome = require("google-home-notifier");
const { GOOGLEHOME_IP } = process.env;

module.exports = (context, callback) => {
  const json = JSON.parse(context);

  googlehome.ip(GOOGLEHOME_IP, json.language);
  googlehome.device("Google-Home", json.language);
  googlehome.notify(json.message, res => {
    callback(undefined, { status: "ok" });
  });
};