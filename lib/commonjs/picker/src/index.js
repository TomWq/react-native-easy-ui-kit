"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowTimePicker = exports.ShowNormalPicker = exports.ShowLinkagePicker = exports.ShowCityPicker = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-ui-kit-picker' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const UiKitPickerModule = _reactNative.NativeModules.UiKitPicker ? _reactNative.NativeModules.UiKitPicker : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});

/**
 * Generates a time picker and displays it.
 *
 * @param {boolean} isShowHMSTime - Determines whether to display the hour, minute, and second fields in the time picker. Defaults to false.
 * @return {Promise<string>} - A promise that resolves to a string representing the selected time.
 */
const ShowTimePicker = ({
  title = '时间选择',
  pattern = 'yyyy-MM-dd'
} = {}) => {
  return UiKitPickerModule.showTimePicker(pattern, title);
};

/**
 * Generates a function comment for the given function body.
 *
 * @param {NormalPicker} [paramName={title: '这是标题',array: []}] - An optional object containing the title and array parameters.
 * @param {string} [paramName.title='这是标题'] - An optional string parameter representing the title.
 * @param {any[]} [paramName.array=[]] - An optional array parameter.
 * @return {Promise<NormaItem>} A promise that resolves with a NormaItem.
 */
exports.ShowTimePicker = ShowTimePicker;
const ShowNormalPicker = ({
  title = '这是标题',
  array = []
} = {}) => {
  return UiKitPickerModule.showNormalPicker(array, title);
};

/**
 * @param {NormalPicker} options - the options object for the NormalPicker
 * @param {string} options.title - the title of the linkage picker
 * @param {Array} options.array - the array of items for the linkage picker
 * @returns {Promise<NormaItem>} The promise that resolves to a NormaItem object.
 */
exports.ShowNormalPicker = ShowNormalPicker;
const ShowLinkagePicker = ({
  title = '多级联动',
  array = []
} = {}) => {
  return UiKitPickerModule.showLinkagePicker(title, array);
};

/**
 * Calls the UiKitPickerModule to show a city picker and returns a Promise that resolves to the selected city.
 *
 * @return {Promise<City>} A Promise that resolves to the selected city.
 */
exports.ShowLinkagePicker = ShowLinkagePicker;
const ShowCityPicker = () => {
  return UiKitPickerModule.showCityPicker();
};
exports.ShowCityPicker = ShowCityPicker;
//# sourceMappingURL=index.js.map