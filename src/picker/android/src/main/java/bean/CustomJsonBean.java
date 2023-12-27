package bean;
import java.util.List;
import com.contrarywind.interfaces.IPickerViewData;

public class CustomJsonBean implements IPickerViewData {

    private String label; // 一级名称
    private List<CityBean> value; // 二级集合

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<CityBean> getValue() {
        return value;
    }

    public void setValue(List<CityBean> value) {
        this.value = value;
    }

    @Override
    public String getPickerViewText() {
        return this.label;
    }

    // Inner class representing a city
    public static class CityBean {
        private String value; // 二级的值
        private String label; // 二级的名称

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }
    }

}
