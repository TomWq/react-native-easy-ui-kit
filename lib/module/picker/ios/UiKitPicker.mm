#import "UiKitPicker.h"
#import <BRPickerView.h>

@implementation UiKitPicker
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showCityPicker:(NSString *_Nullable)title
                  defaultSelect:(NSDictionary * _Nullable)defaultSelect
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {

  __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量

  dispatch_async(dispatch_get_main_queue(), ^{
    /// 地址选择器
    BRAddressPickerView *addressPickerView = [[BRAddressPickerView alloc] init];
    addressPickerView.pickerMode = BRAddressPickerModeArea;
      if(title){
          addressPickerView.title = title;
      }else{
          addressPickerView.title = @"请选择地区";
      }
  
    // addressPickerView.selectValues = @[@"浙江省", @"杭州市", @"西湖区"];
      // 设置默认选中值
      if (defaultSelect) {
          NSString *province = defaultSelect[@"province"];
          NSString *city = defaultSelect[@"city"];
          NSString *area = defaultSelect[@"area"];
          addressPickerView.selectValues = @[province, city, area];
      } else {
          addressPickerView.selectIndexs = @[@0, @0, @0]; // 默认选中第一个
      }

    addressPickerView.isAutoSelect = NO;
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
                        title:(NSString *_Nullable)title
                        minDate:(NSString * _Nullable) minDateStr
                        maxDate:(NSString * _Nullable) maxDateStr
                        selectDate:(NSString * _Nullable) selectDateStr
                        resolve:(RCTPromiseResolveBlock)resolve
                        reject:(RCTPromiseRejectBlock)reject) {

  __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量

  dispatch_async(dispatch_get_main_queue(), ^{
    /// 日期选择器
    BRDatePickerView *datePickerView = [[BRDatePickerView alloc] init];
    datePickerView.pickerMode = BRDatePickerModeYMD;
      if(title){
          datePickerView.title = title; // 使用传递的标题
      }else{
          datePickerView.title = @"请选择日期"; // 使用传递的标题
      }
  
      // 处理最小日期字符串
      
         if (minDateStr) {
             NSDate *minDate = nil;
             
             NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
             formatter.dateFormat = @"yyyy-MM-dd";
             
             // 尝试解析日期字符串
             minDate = [formatter dateFromString:minDateStr];
             
             if (minDate) {
                 // 处理最小日期，将其转换为符合要求的格式
                 formatter.dateFormat = @"yyyy-MM-dd'T'HH:mm:ss.sssZ";
                 datePickerView.minDate = minDate;
              
             }
         }

      // 处理最大日期字符串
          if (maxDateStr) {
              NSDate *maxDate = nil;
              
              
              NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
              formatter.dateFormat = @"yyyy-MM-dd";
              
              // 尝试解析日期字符串
              maxDate = [formatter dateFromString:maxDateStr];
              
              if (maxDate) {
                  // 处理最大日期，将其转换为符合要求的格式
                  formatter.dateFormat = @"yyyy-MM-dd'T'HH:mm:ss.sssZ";
                  datePickerView.maxDate = maxDate;
              }
             
          }
      
      // 处理选择日期字符串
        if (selectDateStr) {
            NSDate *selectDate = nil;
            NSString *convertedSelectDateStr = nil;
            
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            formatter.dateFormat = @"yyyy-MM-dd";
            
            // 尝试解析日期字符串
            selectDate = [formatter dateFromString:selectDateStr];
            
            if (selectDate) {
                // 处理选择日期，将其转换为符合要求的格式
                formatter.dateFormat = @"yyyy-MM-dd'T'HH:mm:ss.sssZ";
                convertedSelectDateStr = [formatter stringFromDate:selectDate];
                datePickerView.selectDate = selectDate;
            }
            
           
        }

   
    datePickerView.isAutoSelect = NO;
    datePickerView.resultBlock = ^(NSDate *date, NSString *dateStr) {
        
        if (!hasResolved) {
            hasResolved = YES;

            // 使用传递的时间格式来格式化日期
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            formatter.dateFormat = pattern;
            NSString *formattedDate = [formatter stringFromDate:date];
            resolve(formattedDate); // 将结果传递给调用方
        }
    };

    // 显示日期选择器
    [datePickerView show];
  });
}

RCT_EXPORT_METHOD(showNormalPicker:(NSArray<NSDictionary *> *)data
                            title:(NSString * _Nullable)title
                            select:(NSDictionary * _Nullable)selectData
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
      if(title){
          stringPickerView.title = title;
      }else{
          stringPickerView.title = @"请选择";
      }
   
    stringPickerView.dataSourceArr = [modelArr copy];
      
      // 设置默认选中值
         if (selectData) {
             NSString *selectValue = selectData[@"value"];
             for (NSUInteger i = 0; i < modelArr.count; i++) {
                 if ([modelArr[i].key isEqualToString:selectValue]) {
                     stringPickerView.selectIndex = i;
                     break;
                 }
             }
         } else {
             stringPickerView.selectIndex = 0; // 默认选中第一个
         }
//    stringPickerView.selectIndex = 0;
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
                  (NSString *_Nullable)title
                  data:(NSArray<NSDictionary *> *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {

    __block BOOL hasResolved = NO; // 使用 __block 来确保在块内可以修改变量
    
    dispatch_async(dispatch_get_main_queue(), ^{
        /// 二级联动选择
        BRStringPickerView *stringPickerView = [[BRStringPickerView alloc]init];
        stringPickerView.pickerMode = BRStringPickerComponentLinkage;
        
        if (title) {
            stringPickerView.title = title;
        } else {
            stringPickerView.title = @"二级联动选择";
        }
        
        stringPickerView.dataSourceArr = [self getStagesDataSourceWithData:[self convertDataToJson:data]];
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
