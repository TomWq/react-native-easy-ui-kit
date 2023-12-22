#import "UiKitPicker.h"
#import <BRPickerView.h>

@implementation UiKitPicker
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showCityPicker:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量

  dispatch_async(dispatch_get_main_queue(), ^{
    /// 地址选择器
    BRAddressPickerView *addressPickerView = [[BRAddressPickerView alloc] init];
    addressPickerView.pickerMode = BRAddressPickerModeArea;
    addressPickerView.title = @"请选择地区";
    // addressPickerView.selectValues = @[@"浙江省", @"杭州市", @"西湖区"];
    addressPickerView.selectIndexs = @[@0, @0, @0];
    addressPickerView.isAutoSelect = YES;
    addressPickerView.resultBlock = ^(BRProvinceModel *province, BRCityModel *city, BRAreaModel *area) {
        if (!hasResolved) {
            hasResolved = YES;
            NSDictionary *resultDict = @{
                @"province": province.name,
                @"city": city.name,
                @"area": area.name
            };
            resolve(resultDict); // 将结果传递给调用方
        }
    };

    // 显示地址选择器
    [addressPickerView show];
  });
}

RCT_EXPORT_METHOD(showTimePicker:
                        (NSString *)pattern
                        title:(NSString *)title
                        resolve:(RCTPromiseResolveBlock)resolve
                         reject:(RCTPromiseRejectBlock)reject) {
  
  __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量

  dispatch_async(dispatch_get_main_queue(), ^{
    /// 日期选择器
    BRDatePickerView *datePickerView = [[BRDatePickerView alloc] init];
    datePickerView.pickerMode = BRDatePickerModeYMD;
    datePickerView.title = title; // 使用传递的标题
    datePickerView.isAutoSelect = YES;
    datePickerView.resultBlock = ^(NSDate *date, NSString *dateStr) {
        if (!hasResolved) {
            hasResolved = YES;

            // 使用传递的时间格式来格式化日期
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            formatter.dateFormat = pattern;
            NSString *formattedDate = [formatter stringFromDate:date];

            NSDictionary *resultDict = @{
                @"formattedDate": formattedDate
            };
            resolve(resultDict); // 将结果传递给调用方
        }
    };

    // 显示日期选择器
    [datePickerView show];
  });
}

RCT_EXPORT_METHOD(showNormalPicker:(NSArray<NSDictionary *> *)data
                            title:(NSString *)title
                           resolve:(RCTPromiseResolveBlock)resolve
                            reject:(RCTPromiseRejectBlock)reject) {
  
  __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量

  dispatch_async(dispatch_get_main_queue(), ^{
    // 将 React Native 传递的数据转换为 BRResultModel 数组
    NSMutableArray<BRResultModel *> *modelArr = [[NSMutableArray alloc] init];
    [data enumerateObjectsUsingBlock:^(NSDictionary *item, NSUInteger index, BOOL *stop) {
        BRResultModel *model = [[BRResultModel alloc] init];
        model.key = item[@"value"];
        model.value = item[@"label"];
        [modelArr addObject:model];
    }];

    // 创建 BRStringPickerView，并设置数据源
    BRStringPickerView *stringPickerView = [[BRStringPickerView alloc] init];
    stringPickerView.pickerMode = BRStringPickerComponentSingle;
    stringPickerView.title = title;
    stringPickerView.dataSourceArr = [modelArr copy];
    stringPickerView.selectIndex = 0;
    stringPickerView.resultModelBlock = ^(BRResultModel *resultModel) {
        if (!hasResolved) {
            hasResolved = YES;
            NSDictionary *resultDict = @{
                @"value": resultModel.key,
                @"label": resultModel.value
            };
            resolve(resultDict); // 将结果传递给调用方
        }
    };

    // 显示字符串选择器
    [stringPickerView show];
  });
}

- (NSArray <BRResultModel *>*)getStagesDataSourceWithData:(NSData *)externalData {
    NSMutableArray *listModelArr = [[NSMutableArray alloc]init];

    @try {
        NSArray *dataArr = [NSJSONSerialization JSONObjectWithData:externalData options:NSJSONReadingAllowFragments error:nil];
        
        for (NSDictionary *sectionData in dataArr) {
            NSString *sectionLabel = sectionData[@"label"];
            NSArray *rowData = sectionData[@"value"];
            
            // Create a result model for the section
            BRResultModel *sectionModel = [[BRResultModel alloc] init];
            sectionModel.parentKey = @"-1";
            sectionModel.parentValue = @"";
            sectionModel.key = sectionLabel; // Assuming label is unique
            sectionModel.value = sectionLabel;
            [listModelArr addObject:sectionModel];
            
            // Create result models for each row in the section
            for (NSDictionary *item in rowData) {
                BRResultModel *rowModel = [[BRResultModel alloc] init];
                rowModel.parentKey = sectionLabel;
                rowModel.parentValue = sectionLabel;
                rowModel.key = item[@"value"];
                rowModel.value = item[@"label"];
                [listModelArr addObject:rowModel];
            }
        }
    } @catch (NSException *exception) {
        NSLog(@"Exception: %@", exception);
        // Handle exception if necessary
    }
    return [listModelArr copy];
}


RCT_EXPORT_METHOD(showLinkagePicker:
                  (NSString *)title
                  data:(NSArray<NSDictionary *> *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  
  __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量
  dispatch_async(dispatch_get_main_queue(), ^{
              /// 二级联动选择
                BRStringPickerView *stringPickerView = [[BRStringPickerView alloc]init];
                stringPickerView.pickerMode = BRStringPickerComponentLinkage;
                stringPickerView.title = @"二级联动选择";
                stringPickerView.dataSourceArr = [self getStagesDataSourceWithData:[self convertDataToJson:data]];
//                stringPickerView.dataSourceArr = [self getStagesDataSourceWithData];
                stringPickerView.selectIndexs = self.linkage2SelectIndexs;
                stringPickerView.numberOfComponents = 2;
                UITextField *textField = [[UITextField alloc] init];
                stringPickerView.resultModelArrayBlock = ^(NSArray<BRResultModel *> *resultModelArr) {
                  
                  if (!hasResolved) {
                    hasResolved = YES;
                    
                      // 1.选择的索引
                      NSMutableArray *selectIndexs = [[NSMutableArray alloc]init];
                      // 2.选择的值
                      NSString *selectValue = @"";
                      for (BRResultModel *model in resultModelArr) {
                          [selectIndexs addObject:@(model.index)];
                          selectValue = [NSString stringWithFormat:@"%@ %@", selectValue, model.value];
                      }
                      if ([selectValue hasPrefix:@" "]) {
                          selectValue = [selectValue substringFromIndex:1];
                      }
                      self.linkage2SelectIndexs = selectIndexs;
                      textField.text = selectValue;
                      
                    // 构建选择结果的数据格式
                          NSMutableDictionary *selectedData = [NSMutableDictionary dictionary];

                          // 处理第一个分区的数据
                          BRResultModel *firstComponent = resultModelArr.firstObject;
                          selectedData[@"label"] = firstComponent.value;

                          // 如果有第二个分区的数据，继续处理
                          if (resultModelArr.count > 1) {
                              BRResultModel *secondComponent = resultModelArr[1];
                              selectedData[@"value"] = @{
                                  @"label": secondComponent.value,
                                  @"value": secondComponent.key
                              };
                          }

                          // 通过 resolve 方法将数据传递给 React Native
                          resolve(selectedData);
                    
                  }
                  
                };
                
//                // 设置选择器中间选中行的样式
//                BRPickerStyle *customStyle = [[BRPickerStyle alloc]init];
//                customStyle.selectRowTextFont = [UIFont boldSystemFontOfSize:20.0f];
//                customStyle.selectRowTextColor = [UIColor blueColor];
//                stringPickerView.pickerStyle = customStyle;
                
                [stringPickerView show];
    });

}

- (NSData *)convertDataToJson:(NSArray<NSDictionary *> *)data {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:data
                                                       options:NSJSONWritingPrettyPrinted
                                                         error:&error];
    if (error) {
        NSLog(@"Error converting data to JSON: %@", error.localizedDescription);
    }
    return jsonData;
}

@end
