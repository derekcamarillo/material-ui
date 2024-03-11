export const fieldBaseVariants = ['filled', 'outlined'] as const;
export type IFieldBaseVariant = (typeof fieldBaseVariants)[number];

export type IFieldBaseStyleKey =
  | 'host'
  | 'host$withSupportingText'
  | 'host$disabled'
  | 'field'
  | 'field$disabled'
  | 'field$textarea'
  | 'containerOverflow'
  | 'container'
  | 'container$resizable'
  | 'container$disabled$resizable'
  | 'section'
  | 'section$resizable'
  | 'section$start'
  | 'section$start$disabled'
  | 'section$start$withStart'
  | 'section$start$error'
  | 'section$middle'
  | 'section$end'
  | 'section$end$disabled'
  | 'section$end$withEnd'
  | 'section$end$error'
  | 'content'
  | 'content$disabled'
  | 'content$noLabel'
  | 'content$noLabel$disabled'
  | 'content$populated'
  | 'content$populated$disabled'
  | 'content$error'
  | 'counter'
  | 'contentSlot'
  | 'contentSlot$withoutStart'
  | 'contentSlot$withoutEnd'
  | 'contentSlot$withLabel'
  | 'contentSlot$withLabel$textarea'
  | 'contentSlot$textarea'
  | 'label'
  | 'label$disabled'
  | 'label$error'
  | 'labelWrapper'
  | 'label$resting'
  | 'label$floating'
  | 'label$invisible'
  | 'supportingText'
  | 'supportingText$disabled'
  | 'supportingText$error'
  | 'background'
  | 'background$disabled'
  | 'stateLayer'
  | 'stateLayer$disabled'
  | 'stateLayer$error'
  | 'activeIndicator'
  | 'activeIndicatorBackground'
  | 'activeIndicatorBackground$disabled'
  | 'activeIndicatorBackground$error'
  | 'activeIndicatorFocus'
  | 'activeIndicatorFocus$error'
  | 'labelWrapper$withStart'
  | 'labelWrapper$withoutStart'
  | 'labelWrapper$withEnd'
  | 'labelWrapper$withoutEnd'
  | 'icon'
  | 'icon$leading'
  | 'icon$trailing'
  | 'outline'
  | 'outline$disabled'
  | 'outline$error'
  | 'outlineNotch'
  | 'outlineNotch$withoutLabel'
  | 'outlineLabel'
  | 'outlineBorder'
  | 'outlineBorder$startEnd'
  | 'outlineBorder$start'
  | 'outlineBorder$end'
  | 'outlineBorder$inactive'
  | 'outlineBorder$inactive$startEnd'
  | 'outlineBorder$inactive$startEnd$disabled'
  | 'outlineBorder$inactive$start'
  | 'outlineBorder$inactive$end'
  | 'outlineBorder$panel'
  | 'outlineBorder$panel$populated'
  | 'outlineBorder$inactive$panel'
  | 'outlineBorder$inactive$panel$inactive'
  | 'outlineBorder$inactive$panel$inactive$disabled'
  | 'outlineBorder$inactive$panel$active'
  | 'outlineBorder$active'
  | 'outlineBorder$active$startEnd'
  | 'outlineBorder$active$start'
  | 'outlineBorder$active$end'
  | 'outlineBorder$active$panel'
  | 'outlineBorder$active$panel$inactive'
  | 'outlineBorder$active$panel$inactive$disabled'
  | 'outlineBorder$active$panel$active'
  | 'outlineSection'
  | 'outlineSection$startEnd'
  | 'outlineSection$startEnd$disabled'
  | 'outlineSection$start'
  | 'outlineSection$panel'
  | 'outlineSection$panel$inactive'
  | 'outlineSection$panel$inactive$disabled'
  | 'outlineSection$panel$active'
  | 'outlineSection$end';
