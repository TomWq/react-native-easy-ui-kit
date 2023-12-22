package com.uikitpicker;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;

import com.bigkoo.pickerview.builder.OptionsPickerBuilder;
import com.bigkoo.pickerview.builder.TimePickerBuilder;
import com.bigkoo.pickerview.listener.OnOptionsSelectListener;
import com.bigkoo.pickerview.listener.OnTimeSelectListener;
import com.bigkoo.pickerview.view.OptionsPickerView;
import com.bigkoo.pickerview.view.TimePickerView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.google.gson.Gson;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

import bean.CustomJsonBean;
import bean.JsonBean;

@ReactModule(name = UiKitPickerModule.NAME)
public class UiKitPickerModule extends ReactContextBaseJavaModule {
  public static final String NAME = "UiKitPicker";
  private static final String TAG = "UiKitPickerModule";
  private List<JsonBean> options1Items = new ArrayList<>();
  private final ArrayList<ArrayList<String>> options2Items = new ArrayList<>();
  private final ArrayList<ArrayList<ArrayList<String>>> options3Items = new ArrayList<>();


  public UiKitPickerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  //时间选择
  @ReactMethod
  public void showTimePicker(final String pattern,final String title,final Promise promise) {
    // 使用 getCurrentActivity() 获取当前 Activity
    final Activity activity = getCurrentActivity();


    if (activity == null) {
      promise.reject("ACTIVITY_NULL", "Current activity is null");
      return;
    }


    // 在主线程中执行 UI 操作
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {

        TimePickerView timePickerView = new TimePickerBuilder(activity, new OnTimeSelectListener() {

          @SuppressLint("SimpleDateFormat")
          @Override
          public void onTimeSelect(Date date, View v) {
            SimpleDateFormat format;
            format = new SimpleDateFormat(pattern);
            promise.resolve(format.format(date));
          }
        }).setTitleText(title).build();
        timePickerView.show();
      }
    });
  }

  //普通不联动选择器
  @ReactMethod
  public void showNormalPicker(final ReadableArray data, final String title, final Promise promise) {

    // 使用 getCurrentActivity() 获取当前 Activity
    final Activity activity = getCurrentActivity();
    final ArrayList<Map<String,String>> optionsItems = new ArrayList<>();
    final ArrayList<String> options = new ArrayList<>();

    if (activity == null) {
      promise.reject("ACTIVITY_NULL", "Current activity is null");
      return;
    }

    if (data.size() == 0) {
      promise.reject("DATA_NULL", "数据源不能为空");
      return;
    }

    for (int i = 0; i < data.size(); i++) {
      ReadableMap item = data.getMap(i);
      String label = item.getString("label");
      String value = item.getString("value");
      assert label != null;
      assert value != null;
      optionsItems.add(Map.of("label",label,"value",value));
      options.add(label);
    }


    // 在主线程中执行 UI 操作
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {

        OptionsPickerView optionsPickerView = new OptionsPickerBuilder(activity, new OnOptionsSelectListener() {
          @Override
          public void onOptionsSelect(int options1, int options2, int options3, View v) {
            String label = optionsItems.get(options1).get("label");
            String value = optionsItems.get(options1).get("value");
            WritableMap weakHashMap = Arguments.createMap();
            weakHashMap.putString("label",label);
            weakHashMap.putString("value",value);
            Log.i(TAG, "onOptionsSelect: " + weakHashMap.toString());
            promise.resolve(weakHashMap);
          }
        }).setTitleText(title).build();
        optionsPickerView.setNPicker(options, null, null);
        optionsPickerView.show();
      }
    });
  }

  //普通联动选择器
  @ReactMethod
  public void showLinkagePicker(final String title, final ReadableArray data, final Promise promise) {

    // 使用 getCurrentActivity() 获取当前 Activity
    final Activity activity = getCurrentActivity();
    ArrayList<CustomJsonBean> optionsItems1 = new ArrayList<>();
    ArrayList<ArrayList<String>> optionsItems2 = new ArrayList<>();
    ArrayList<CustomJsonBean> options1 = new ArrayList<>();
    ArrayList<ArrayList<Map<String, String>>> optionsList2 = new ArrayList<>();

    if (activity == null) {
      promise.reject("ACTIVITY_NULL", "Current activity is null");
      return;
    }

    if(data.size() == 0){
      promise.reject("ACTIVITY_NULL", "数据源不能为空");
      return;
    }

    activity.runOnUiThread(new Runnable() {

      @Override
      public void run() {

        // 清空原有数据
        optionsItems1.clear();
        optionsItems2.clear();

        ArrayList<CustomJsonBean> jsonBeanList = parseData2(data);//用Gson 转成实体

        optionsItems1.addAll(jsonBeanList);

        for (CustomJsonBean jsonBean : jsonBeanList) {
          ArrayList<String> cityList = new ArrayList<>();
          ArrayList<Map<String,String>> cityList2 = new ArrayList<>();
          for (CustomJsonBean.CityBean cityBean : jsonBean.getValue()) {
            cityList.add(cityBean.getLabel());
            cityList2.add(Map.of("label",cityBean.getLabel(),"value",cityBean.getValue()));
          }
          optionsItems2.add(cityList);
          optionsList2.add(cityList2);
        }

        OptionsPickerView optionsPickerView = new OptionsPickerBuilder(activity, new OnOptionsSelectListener() {

          @Override
          public void onOptionsSelect(int options1, int options2, int options3, View v) {
            String opt1Label = optionsItems1.size() > 0 ?
                    optionsItems1.get(options1).getPickerViewText() : "";
            String opt2Label = optionsItems2.size() > 0 ?
                    optionsItems2.get(options1).get(options2) : "";
            String opt2Value = optionsItems2.size() > 0 ?
                    optionsList2.get(options1).get(options2).get("value") : "";

            WritableMap weakHashMap = Arguments.createMap();
            WritableMap weakHashMap2 = Arguments.createMap();
            weakHashMap.putString("label",opt1Label);
            weakHashMap2.putString("label",opt2Label);
            weakHashMap2.putString("value",opt2Value);
            weakHashMap.putMap("value",weakHashMap2);

            Log.i(TAG, "onOptionsSelect: " + weakHashMap.toString());
            promise.resolve(weakHashMap);

          }
        }).setTitleText(title).build();
        optionsPickerView.setPicker(optionsItems1, optionsItems2);
        optionsPickerView.show();
      }
    });

  }

  //选择城市
  @ReactMethod
  public void showCityPicker(final Promise promise) {

    // 使用 getCurrentActivity() 获取当前 Activity
    final Activity activity = getCurrentActivity();


    if (activity == null) {
      promise.reject("ACTIVITY_NULL", "Current activity is null");
      return;
    }

    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        initJsonData();
        OptionsPickerView pvOptions = new OptionsPickerBuilder(activity, new OnOptionsSelectListener() {
          @Override
          public void onOptionsSelect(int options1, int options2, int options3, View v) {
            //返回的分别是三个级别的选中位置
            String opt1tx = options1Items.size() > 0 ?
                    options1Items.get(options1).getPickerViewText() : "";

            String opt2tx = options2Items.size() > 0
                    && options2Items.get(options1).size() > 0 ?
                    options2Items.get(options1).get(options2) : "";

            String opt3tx = options2Items.size() > 0
                    && options3Items.get(options1).size() > 0
                    && options3Items.get(options1).get(options2).size() > 0 ?
                    options3Items.get(options1).get(options2).get(options3) : "";

            WritableMap weakHashMap = Arguments.createMap();
            weakHashMap.putString("province",opt1tx);
            weakHashMap.putString("city",opt2tx);
            weakHashMap.putString("area",opt3tx);
            String tx = opt1tx + opt2tx + opt3tx;
            promise.resolve(weakHashMap);
          }
        })

                .setTitleText("城市选择")
                .build();

        pvOptions.setPicker(options1Items, options2Items, options3Items);//三级选择器
        pvOptions.show();

      }
    });
  }

  //解析数据
  private void initJsonData() {
    /**
     * 注意：assets 目录下的Json文件仅供参考，实际使用可自行替换文件
     * 关键逻辑在于循环体
     *
     * */

    String JsonData = new GetJsonDataUtil().getJson(getCurrentActivity(), "province.json");//获取assets目录下的json文件数据

    ArrayList<JsonBean> jsonBean = parseData(JsonData);//用Gson 转成实体

    Log.i(TAG, JsonData);

    /**
     * 添加省份数据
     *
     * 注意：如果是添加的JavaBean实体，则实体类需要实现 IPickerViewData 接口，
     * PickerView会通过getPickerViewText方法获取字符串显示出来。
     */
    options1Items = jsonBean;

    for (int i = 0; i < jsonBean.size(); i++) {//遍历省份
      ArrayList<String> cityList = new ArrayList<>();//该省的城市列表（第二级）
      ArrayList<ArrayList<String>> province_AreaList = new ArrayList<>();//该省的所有地区列表（第三极）

      for (int c = 0; c < jsonBean.get(i).getCityList().size(); c++) {//遍历该省份的所有城市
        String cityName = jsonBean.get(i).getCityList().get(c).getName();
        cityList.add(cityName);//添加城市
        ArrayList<String> city_AreaList = new ArrayList<>();//该城市的所有地区列表

        //如果无地区数据，建议添加空字符串，防止数据为null 导致三个选项长度不匹配造成崩溃
                /*if (jsonBean.get(i).getCityList().get(c).getArea() == null
                        || jsonBean.get(i).getCityList().get(c).getArea().size() == 0) {
                    city_AreaList.add("");
                } else {
                    city_AreaList.addAll(jsonBean.get(i).getCityList().get(c).getArea());
                }*/
        city_AreaList.addAll(jsonBean.get(i).getCityList().get(c).getArea());
        province_AreaList.add(city_AreaList);//添加该省所有地区数据
      }

      /**
       * 添加城市数据
       */
      options2Items.add(cityList);

      /**
       * 添加地区数据
       */
      options3Items.add(province_AreaList);
    }

  }

  //城市Gson解析
  public ArrayList<JsonBean> parseData(String result) {
    ArrayList<JsonBean> detail = new ArrayList<>();
    try {
      JSONArray data = new JSONArray(result);
      Gson gson = new Gson();
      for (int i = 0; i < data.length(); i++) {
        JsonBean entity = gson.fromJson(data.optJSONObject(i).toString(), JsonBean.class);
        detail.add(entity);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return detail;
  }

  //自定义联动解析
  private ArrayList<CustomJsonBean> parseData2(ReadableArray readableArray) {
    ArrayList<CustomJsonBean> jsonBeanList = new ArrayList<>();
    try {
      for (int i = 0; i < readableArray.size(); i++) {
        ReadableMap provinceMap = readableArray.getMap(i);
        CustomJsonBean jsonBean = new CustomJsonBean();
        jsonBean.setLabel(provinceMap.getString("label"));

        ReadableArray cityArray = provinceMap.getArray("value");
        List<CustomJsonBean.CityBean> cityList = new ArrayList<>();
        for (int j = 0; j < Objects.requireNonNull(cityArray).size(); j++) {
          ReadableMap cityMap = cityArray.getMap(j);
          CustomJsonBean.CityBean cityBean = new CustomJsonBean.CityBean();
          cityBean.setValue(cityMap.getString("value"));
          cityBean.setLabel(cityMap.getString("label"));
          cityList.add(cityBean);
        }
        jsonBean.setValue(cityList);

        jsonBeanList.add(jsonBean);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return jsonBeanList;
  }


}
