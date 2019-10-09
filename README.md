# smartguide

## Installation

You can install this plugin by adding the files to `wp-content/plugins/smartguide` or by uploading a zip file of the plugin under Plugins > Add New in your WordPess admin.

Activate the plugin in the Plugins section of your WordPress admin.

You can access your smartguide by adding `/guide` to the end of your site URL.

If that page gives you a 404 error when the plugin is activated, you can reset your permalinks by going to Settings > Permalinks. Just visiting this page should activate the `/guide` URL.

### Dependencies

This plugin requires [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/) to be installed and activated.

It is recommended to use this plugin with WordPress version 4.9 or later.

## Guide Content and Settings

You can manage the guide content and settings under the Guide section of your WordPress admin.

## Development

To begin working in the code, first run `npm install` to install the npm dependencies.

Gulp is used to watch for file changes and compile JavaScript and CSS. Run `gulp watch` to begin watching.
