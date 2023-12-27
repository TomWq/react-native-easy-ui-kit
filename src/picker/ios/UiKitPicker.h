/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-26 10:29:25
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-26 10:48:05
 * @FilePath     : /picker-library/ios/UiKitPicker.h
 * @Description  :
 *
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved.
 */

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNUiKitPickerSpec.h"

@interface UiKitPicker : NSObject <NativeUiKitPickerSpec>
#else
#import <React/RCTBridgeModule.h>
#import <BRPickerView.h>
@interface UiKitPicker : NSObject <RCTBridgeModule>
@property (nonatomic, copy) NSArray <NSNumber *> *linkage2SelectIndexs;
- (NSArray<BRResultModel *> *)getStagesDataSourceWithData:(NSData *)externalData;
#endif

@end
