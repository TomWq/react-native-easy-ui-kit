import { NativeModules, Platform } from 'react-native';
import type {TimePicker,NormaItem,NormalPicker,CityResult,LinkResult,Linkage,CityProps} from './type'

const LINKING_ERROR =
  `The package 'react-native-ui-kit-picker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const UiKitPickerModule = NativeModules.UiKitPicker
  ? NativeModules.UiKitPicker
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Calls the native module to display a time picker.
 *
 * @param {TimePicker} options - An object containing optional parameters for the time picker.
 * @param {string} options.title - The title of the time picker.
 * @param {string} options.pattern - The pattern of the time picker.
 * @param {string} options.mixDate - The minimum date for the time picker.
 * @param {string} options.maxDate - The maximum date for the time picker.
 * @param {string} options.selectDate - The initially selected date for the time picker.
 * @return {Promise<string>} A promise that resolves with the selected time.
 */
export const ShowTimePicker = ({
     title,
     pattern,
     mixDate,
     maxDate,
     selectDate,
    }: TimePicker = {}): Promise<string> => {
  return UiKitPickerModule.showTimePicker(pattern,title,mixDate,maxDate,selectDate);
};

/**
 * Calls the `showNormalPicker` method of the `UiKitPickerModule` to display a normal picker UI.
 *
 * @param {NormalPicker} options - An object containing the picker options.
 * @param {string} options.title - The title of the picker.
 * @param {Array} options.array - The array of items to be displayed in the picker.
 * @param {Function} options.selectItem - The callback function to be called when an item is selected in the picker.
 * @return {Promise<NormaItem>} - A promise that resolves with the selected item from the picker.
 */
export const ShowNormalPicker = ({
    title,
    array,
    selectItem
  }:NormalPicker ={}): Promise<NormaItem> =>{
  return UiKitPickerModule.showNormalPicker(array,title,selectItem);
}

/**
 * Shows a linkage picker.
 *
 * @param {string} title - The title of the picker.
 * @param {Array} array - The array to be used for the linkage picker.
 * @return {Promise<LinkResult>} A promise that resolves to the selected link result.
 */
export const ShowLinkagePicker =({
    title,
    array,
  }: Linkage={}) :Promise<LinkResult>=>{
  return UiKitPickerModule.showLinkagePicker(title,array);
}

/**
 * A function that shows a city picker.
 *
 * @param {CityProps} options - The options for the city picker.
 * @param {string} options.title - The title of the city picker.
 * @param {string} options.selcetCity - The selected city.
 * @return {Promise<CityResult>} - A promise that resolves to the result of the city picker.
 */
export const ShowCityPicker = ({
  title,
  selcetCity
}:CityProps={}): Promise<CityResult> =>{
  return UiKitPickerModule.showCityPicker(title,selcetCity);
}
