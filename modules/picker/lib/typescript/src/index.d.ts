import type { TimePicker, NormaItem, NormalPicker, City, LinkItem, Linkage } from './type';
/**
 * Generates a time picker and displays it.
 *
 * @param {boolean} isShowHMSTime - Determines whether to display the hour, minute, and second fields in the time picker. Defaults to false.
 * @return {Promise<string>} - A promise that resolves to a string representing the selected time.
 */
export declare const ShowTimePicker: ({ title, pattern }?: TimePicker) => Promise<string>;
/**
 * Generates a function comment for the given function body.
 *
 * @param {NormalPicker} [paramName={title: '正常的选择',array: []}] - An optional object containing the title and array parameters.
 * @param {string} [paramName.title='这是标题'] - An optional string parameter representing the title.
 * @param {any[]} [paramName.array=[]] - An optional array parameter.
 * @return {Promise<NormaItem>} A promise that resolves with a NormaItem.
 */
export declare const ShowNormalPicker: ({ title, array }?: NormalPicker) => Promise<NormaItem>;
/**
 * @param {NormalPicker} options - the options object for the NormalPicker
 * @param {string} options.title - the title of the linkage picker
 * @param {Array} options.array - the array of items for the linkage picker
 * @returns {Promise<NormaItem>} The promise that resolves to a NormaItem object.
 */
export declare const ShowLinkagePicker: ({ title, array }?: Linkage) => Promise<LinkItem>;
/**
 * Calls the UiKitPickerModule to show a city picker and returns a Promise that resolves to the selected city.
 *
 * @return {Promise<City>} A Promise that resolves to the selected city.
 */
export declare const ShowCityPicker: () => Promise<City>;
//# sourceMappingURL=index.d.ts.map