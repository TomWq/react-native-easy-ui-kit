
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
