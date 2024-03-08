export type IListItemStyleKey =
  | 'host'
  | 'host$interactive'
  | 'host$selected'
  | 'host$disabled'
  | 'listItem'
  | 'listItem$interactive'
  | 'listItem$disabled'
  | 'background'
  | 'background$selected'
  | 'background$disabled'
  | 'icon'
  | 'icon$leading'
  | 'icon$leading$disabled'
  | 'icon$trailing'
  | 'icon$trailing$disabled';

export type IListItemStyleVarKey =
  | 'leadingSpace'
  | 'topSpace'
  | 'bottomSpace'
  | 'trailingSpace'
  | 'containerColor'
  | 'containerShape'
  | 'containerHeight$oneLine'
  | 'containerHeight$twoLine'
  | 'containerHeight$threeLine'
  | 'containerColor$disabled'
  | 'containerOpacity$disabled'
  | 'selectedContainerColor'
  | 'textColor'
  | 'textColor$disabled'
  | 'textOpacity$disabled'
  | 'textColor$focus'
  | 'textColor$hover'
  | 'textColor$pressed'
  | 'selectedTextColor'
  | 'selectedTextColor$focus'
  | 'selectedTextColor$hover'
  | 'selectedTextColor$pressed'
  | 'nonTextColor'
  | 'nonTextColor$disabled'
  | 'nonTextOpacity$disabled'
  | 'nonTextColor$focus'
  | 'nonTextColor$hover'
  | 'nonTextColor$pressed'
  | 'selectedNonTextColor'
  | 'selectedNonTextColor$focus'
  | 'selectedNonTextColor$hover'
  | 'selectedNonTextColor$pressed'
  | 'stateLayerColor$hover'
  | 'stateLayerOpacity$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$pressed'
  | 'leadingIconColor'
  | 'leadingIconSize'
  | 'leadingIconColor$disabled'
  | 'leadingIconOpacity$disabled'
  | 'leadingIconColor$focus'
  | 'leadingIconColor$hover'
  | 'leadingIconColor$pressed'
  | 'trailingIconColor'
  | 'trailingIconSize'
  | 'trailingIconColor$disabled'
  | 'trailingIconOpacity$disabled'
  | 'trailingIconColor$focus'
  | 'trailingIconColor$hover'
  | 'trailingIconColor$pressed';

export type IListItemStyleStateVarKey =
  | 'nonTextColor'
  | 'nonTextOpacity'
  | 'textColor'
  | 'textOpacity';
