const servicenowConfig = {
  /**
   * This is a default prefix for all ServiceNow APIs
   * should not be changed
   */
  REST_API_PATH: '/api',
  /**
   * ServiceNow instance URL for REST calls
   * it is being used in DEVELOPMENT mode only
   * This should be the instance where React application will be deployed to
   */
  SERVICENOW_INSTANCE: '<add your servicenow instance URL here>',
  /**
   * User Name for API requests
   * it is being used for sending REST calls in DEVELOPMENT mode only
   * no need to provide credentials for PRODUCTION
   */
  REACT_APP_USER: '<add a user name here>',
  /**
   * User password, for DEVELOPMENT mode only
   */
  REACT_APP_PASSWORD: '<add a user password here>',
  /**
   * ServiceNow path to GET resource which serves javascript files
   * Current configuration does not produce CSS files
   * CSS code will be embedded into javascript files
   */
  JS_API_PATH: '',
  /**
   * ServiceNow path to GET resource which serves
   * Image files (png, jpg, gif)
   * SVG files will be embedded into javascript files
   */
  IMG_API_PATH: '',
  /**
   * ServiceNow path to GET resource which serves
   * other files, like fonts etc.
   */
  ASSETS_API_PATH: '',
  /**
   * fonts and images below this size will be put inside
   * JS chunks, instead of being saved as separate files
   */
  ASSET_SIZE_LIMIT: 1000,
}

module.exports = servicenowConfig