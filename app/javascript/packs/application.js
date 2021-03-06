// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


require("jquery");
require("bootstrap");
require("admin-lte");

// import jQuery from "jquery";
var jQuery = require("jquery");
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

require("packs/pagination");
require("packs/courseLike");
require("packs/disable");
require("packs/admin_course");
require("packs/collapse");
require("packs/scroll");
require("packs/edit_course");
require("packs/backToTop");
require("packs/add_message");
require("packs/chat_app");

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
