package bean;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.contrarywind.interfaces.IPickerViewData;

public class JsonBean implements IPickerViewData {

    private String name;
    private List<CityBean> city;

    // 默认的无参数构造函数
    public JsonBean() {
    }

    // 构造函数，用于根据省份名称初始化对象
    public JsonBean(String province) {
        this.name = province;
        this.city = createCityListForProvince(province);
    }

    // 静态的工厂方法，用于创建带有特定省份的 JsonBean 对象
    public static JsonBean createWithProvince(String province) {
        return new JsonBean(province);
    }

    private static List<CityBean> createCityListForProvince(String province) {
        // 这里可以根据省份名称初始化对应的城市列表
        // 你的初始化逻辑可能会涉及读取城市数据、网络请求等，根据实际情况实现
        List<CityBean> cityList = new ArrayList<>();
        // 初始化城市列表...
        return cityList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CityBean> getCityList() {
        return city;
    }

    public void setCityList(List<CityBean> city) {
        this.city = city;
    }

    @Override
    public String getPickerViewText() {
        return this.name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JsonBean jsonBean = (JsonBean) o;
        return Objects.equals(name, jsonBean.name) &&
                Objects.equals(city, jsonBean.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, city);
    }

    public static class CityBean {

        private String name;
        private List<String> area;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<String> getArea() {
            return area;
        }

        public void setArea(List<String> area) {
            this.area = area;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            CityBean cityBean = (CityBean) o;
            return Objects.equals(name, cityBean.name) &&
                    Objects.equals(area, cityBean.area);
        }

        @Override
        public int hashCode() {
            return Objects.hash(name, area);
        }
    }
}
