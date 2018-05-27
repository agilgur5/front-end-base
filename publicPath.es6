import * as SETTINGS from 'utils/settings.es6'
// dynamically set webpack's path to static assets in the entrypoint
// eslint-disable-next-line no-undef, camelcase
__webpack_public_path__ = SETTINGS.STATIC_URL + 'build/'
